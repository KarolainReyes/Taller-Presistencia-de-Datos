import inquirer from 'inquirer';
import { tareas } from '../models/tareas.js';
import fs from 'fs/promises';
import _ from 'lodash';

const RUTA_ARCHIVO = "./tareas.json"

export async function agregarTarea() {
  const { descripcion } = await inquirer.prompt([
    { type: 'input', name: 'descripcion', message: 'Descripción de la tarea:' }
  ]);

  const nueva = {
    id: Date.now(),
    descripcion: descripcion.trim(),
    completada: false
  };

  try {
    let datos = [];

    try {
      const contenido = await fs.readFile(RUTA_ARCHIVO, "utf-8");
      datos = JSON.parse(contenido)
    } catch (error) {
      datos = [];
    }

    datos.push(nueva);
    tareas.push(nueva);

    await fs.writeFile(RUTA_ARCHIVO, JSON.stringify(datos, null, 4));
    console.log("Tarea agregadaa");
  } catch (error) {
    console.log("Error al agregar la tarea: ", error);
  }
}

export async function listarTareas() {
  try {
    const contenido = await fs.readFile(RUTA_ARCHIVO, "utf-8");
    const datos = JSON.parse(contenido);

    if (!Array.isArray(datos) || datos.length === 0) {
      console.log('📭 No hay tareas registradas.');
      return;
    }
    console.log('\n📋 Lista de tareas:');
    datos.forEach((tarea, i) => {
      const estado = tarea.completada ? '✅' : '❌';
      console.log(`${i + 1}. [${estado}] ${tarea.descripcion}`);
    });
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("No hay archivo de tareas todavia.");
    } else {
      console.log("Error al leer las tareas: ", error);
    }
  }
}


export async function listarTareasAlfabetica() {
  try {
    const contenido = await fs.readFile(RUTA_ARCHIVO, "utf-8");
    const datos = JSON.parse(contenido);

    if (!Array.isArray(datos) || datos.length === 0) {
      console.log('📭 No hay tareas registradas.');
      return;
    }
    const tareasOrdenadasPorAlfabeto = _.sortBy(datos, 'descripcion');
    console.log('\n📋 Lista de tareas:');
    tareasOrdenadasPorAlfabeto.forEach((t, i) => {
      const estado = t.completada ? '✅' : '❌';
      console.log(`${i + 1}. [${estado}] ${t.descripcion}`);
    });
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("No hay archivo de tareas todavia.");
    } else {
      console.log("Error al leer las tareas: ", error);
    }
  }
}


export async function editarTarea() {
  try {
    const contenido = await fs.readFile(RUTA_ARCHIVO, "utf-8");
    let tareas = JSON.parse(contenido);

    if (!Array.isArray(tareas) || tareas.length === 0) {
      console.log('⚠️ No hay tareas para editar.');
      return;  
    }

    const { indice } = await inquirer.prompt([
      {
        type: 'list',
        name: 'indice',
        message: 'Selecciona una tarea para editar:',
        choices: tareas.map((t, i) => ({
          name: t.descripcion,
          value: i
        }))
      }
    ]);

    const { opcion } = await inquirer.prompt([
      {
        type: 'list',
        name: 'opcion',
        message: 'Seleccione una opción:',
        choices: [
          { name: 'Editar descripción', value: 'descripcion' },
          { name: 'Cambiar estado (Completada/Pendiente)', value: 'estado' }
        ]
      }
    ]);

    const tareaSeleccionada = tareas[indice];

    if (opcion === 'descripcion') {
      const { nuevaDescripcion } = await inquirer.prompt([
        {
          type: 'input',
          name: 'nuevaDescripcion',
          message: 'Nueva descripción de la tarea:',
          default: tareaSeleccionada.descripcion
        }
      ]);
      tareas[indice].descripcion = nuevaDescripcion.trim();
    }

    if (opcion === 'estado') {
      const { nuevoEstado } = await inquirer.prompt([
        {
          type: 'list',
          name: 'nuevoEstado',
          message: 'Nuevo estado de la tarea:',
          choices: [
            { name: 'Completada', value: true },
            { name: 'Pendiente', value: false }
          ],
          default: tareaSeleccionada.completada
        }
      ]);
      tareas[indice].completada = nuevoEstado;
    }

    await fs.writeFile(RUTA_ARCHIVO, JSON.stringify(tareas, null, 4));
    console.log('✏️ Tarea actualizada.');

  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("No hay archivo de tareas todavía.");
    } else {
      console.log("⚠️ Error al editar la tarea:", error);
    }
  }
}


export async function eliminarTarea() {
  try {
    const contenido = await fs.readFile(RUTA_ARCHIVO, "utf-8");
    let tareas = JSON.parse(contenido);

    if (!Array.isArray(tareas)) {
      console.log('⚠️ El archivo no contiene un arreglo de tareas.');
      return;
    }

    if (tareas.length === 0) {
      console.log('⚠️ No hay tareas para eliminar.');
      return;
    }

    const { indice } = await inquirer.prompt([
      {
        type: 'list',
        name: 'indice',
        message: 'Selecciona una tarea para eliminar:',
        choices: tareas.map((t, i) => ({
          name: t.descripcion,
          value: i
        }))
      }
    ]);

    tareas.splice(indice, 1);
    await fs.writeFile(RUTA_ARCHIVO, JSON.stringify(tareas, null, 4));

    console.log('🗑️ Tarea eliminada y cambios guardados.');

  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("No existe archivo de tareas para eliminar.");
    } else {
      console.error('Error al eliminar la tarea:', error);
    }
  }
}
