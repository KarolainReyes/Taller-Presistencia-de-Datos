import inquirer from 'inquirer';
import _ from 'lodash';
import { MongoClient } from "mongodb"
import { preguntar, opciones } from "../helpers/menu.js"

const uri = "mongodb+srv://edgar:1852467@cluster0.nw7rq1m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const cliente = new MongoClient(uri);


export async function conectarCliente() {
  try {
    await cliente.connect();
  } catch (err) {
    console.error(" Error al conectar:", err.message);
  }
}

export async function desconectarCliente() {
  await cliente.close();
}

export async function DBVentas() {
  const db = await cliente.db("DonEdgar");
  const coleccion = await db.collection("tareas");

}

export async function agregarTarea() {
  try {
    await conectarCliente();
    const db = await cliente.db("DonEdgar");
    const coleccion = await db.collection("tareas");
    const nombre_de_tarea = await preguntar("Ingresa nombre de la tarea");
    if (nombre_de_tarea.length === 0) { throw new Error("El nombre no puede estar vacio"); };
    const descripcion_tarea = await preguntar("Ingresa la descripcion de la tarea");
    if (descripcion_tarea.length === 0) { throw new Error("La descripcion no puede estar vacia"); };
    const estado_tarea = await opciones("Pendiente", "Completado");
    await coleccion.insertOne({ "nombre": nombre_de_tarea, "descripcion": descripcion_tarea, "estado": estado_tarea });
    console.log("Tarea añadida correctamente");
  }
  catch (error) { console.error("Error", error) }
  finally {

    await desconectarCliente();
  }
}

export async function listarTareasGeneral() {
  try {
    await conectarCliente();
    const db = cliente.db("DonEdgar");
    const coleccion = db.collection("tareas");
    const tareas = await coleccion.find({}).toArray();

    if (_.isEmpty(tareas)) {
      console.log("No hay tareas.");
      return;
    }
    console.log("TAREAS");
    console.log("----------------------------");
    tareas.forEach(t => console.log(` ${t.nombre} - ${t.descripcion}`));

  } finally {
    await preguntar("Ingrese cualquier tecla para continuar")
    await desconectarCliente();
  }
}

export async function listarTareasPendientes() {
  try {
    await conectarCliente();
    const db = cliente.db("DonEdgar");
    const coleccion = db.collection("tareas");
    const tareas = await coleccion.find({}).toArray();

    const pendientes = _.filter(tareas, { estado: "Pendiente" });

    if (_.isEmpty(pendientes)) {
      console.log(" No hay tareas pendientes.");
      return;
    }
    console.log("TAREAS PENDIENTES");
    console.log("----------------------------");
    pendientes.forEach(t => console.log(` ${t.nombre} - ${t.descripcion}`));

  } finally {await preguntar("Ingrese cualquier tecla para continuar");
    await desconectarCliente();
  }
}

export async function listarTareasCompletadas() {
  try {
    await conectarCliente();
    const db = cliente.db("DonEdgar");
    const coleccion = db.collection("tareas");
    const tareas = await coleccion.find({}).toArray();

    const completadas = _.filter(tareas, { estado: "Completado" });

    if (_.isEmpty(completadas)) {
      console.log(" No hay tareas completadas.");
      return;
    }
console.log("TAREAS COMPLETADAS");
    console.log("----------------------------");
    completadas.forEach(t => console.log(` ${t.nombre} - ${t.descripcion}`));

  } finally {
    await preguntar("Ingrese cualquier tecla para continuar")
    await desconectarCliente();
  }
}

export async function listarTareasAlfabetico() {
  try {
    await conectarCliente();
    const db = cliente.db("DonEdgar");
    const coleccion = db.collection("tareas");

    const tareas = await coleccion.find({}).toArray();

    if (_.isEmpty(tareas)) {
      console.log(" No hay tareas.");
      return;
    }

    const ordenadas = _.sortBy(tareas, t => t.nombre.toLowerCase());
    console.log("TAREAS");
    console.log("----------------------------");
    ordenadas.forEach(t => {
      console.log(` ${t.nombre} - ${t.descripcion} (${t.estado})`);
    });

  } catch (err) {
    console.error(" Error:", err.message);
  } finally {
    await preguntar("Ingrese cualquier tecla para continuar")
    await desconectarCliente();
  }
}

export async function editarTarea() {
  try {
    await cliente.connect();
    const db = cliente.db("DonEdgar");
    const coleccion = db.collection("tareas");

    const tareasPendientes = await coleccion.find({}).toArray();

    if (tareasPendientes.length === 0) {
      console.log("📭 No hay tareas.");
      return null;
    }
    const { tareaSeleccionada } = await inquirer.prompt([
      {
        type: "list",
        name: "tareaSeleccionada",
        message: "Selecciona una tarea pendiente:",
        choices: tareasPendientes.map((t) => ({
          name: `${t.nombre} - ${t.descripcion}`,
          value: t
        }))
      }
    ]);
    const nombre_de_tarea = await preguntar("Ingresa nuevo nombre");
    if (nombre_de_tarea.length === 0) { throw new Error("El nombre no puede estar vacio"); };
    const descripcion_tarea = await preguntar("Ingresa nueva descripcion de la tarea");
    if (descripcion_tarea.length === 0) { throw new Error("La descripcion no puede estar vacia"); };
    const estado_tarea = await opciones("Pendiente", "Completado");
    await coleccion.updateOne({ _id: tareaSeleccionada._id },
      {
        $set: {
          nombre: nombre_de_tarea,
          descripcion: descripcion_tarea,
          estado: estado_tarea
        }
      });
      console.log("Tarea editada correctamente")
  } catch (err) {
    console.error(" Error:", err.message);
  } finally {
    await cliente.close();
  }
}


export async function eliminarTarea() {
  try {
    await cliente.connect();
    const db = cliente.db("DonEdgar");
    const coleccion = db.collection("tareas");

    const tareasPendientes = await coleccion.find({}).toArray();

    if (tareasPendientes.length === 0) {
      console.log("📭 No hay tareas.");
      return null;
    }
    const { tareaSeleccionada } = await inquirer.prompt([
      {
        type: "list",
        name: "tareaSeleccionada",
        message: "Selecciona una tarea pendiente:",
        choices: tareasPendientes.map((t) => ({
          name: `${t.nombre} - ${t.descripcion}`,
          value: t
        }))
      }
    ]);
    await coleccion.deleteOne({ _id: tareaSeleccionada._id });
    console.log("Tarea eliminada correctamente")
  } catch (err) {
    console.error(" Error:", err.message);
  } finally {
    await cliente.close();
  }
}
