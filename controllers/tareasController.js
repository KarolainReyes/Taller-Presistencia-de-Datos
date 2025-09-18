import inquirer from 'inquirer';
import { tareas } from '../models/tareas.js';
import fs from 'fs/promises';

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
  console.log ("Error al agregar la tarea: ", error);
}
}

export async function listarTareas() {
  try {
      const contenido = await fs.readFile(RUTA_ARCHIVO, "utf-8");
      const datos = JSON.parse(contenido)
    
  if (tareas.length === 0) {
    console.log('📭 No hay tareas registradas.');
    return;
  } 
    console.log('\n📋 Lista de tareas:');
    tareas.forEach((tarea, i) => {
    const estado = tarea.completada ? '✅' : '❌';
    console.log(`${i + 1}. [${estado}] ${tarea.descripcion}`);
  });
} catch (error) {
  if (error.code === "ENOENT"){
    console.log ("No hay archivo de tareas todavia.");
  } else {
    console.log ("Error al leer las tareas: ", error);
    }
  } 
}

export async function editarTarea() {
  if (tareas.length === 0) return console.log('⚠️ No hay tareas para editar.');

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

  const { nuevaDescripcion } = await inquirer.prompt([
    { type: 'input', name: 'nuevaDescripcion', message: 'Nueva descripción:' }
  ]);

  tareas[indice].descripcion = nuevaDescripcion.trim();
  console.log('✏️ Tarea actualizada.');
}

export async function eliminarTarea() {
  if (tareas.length === 0) return console.log('⚠️ No hay tareas para eliminar.');

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
  console.log('🗑️ Tarea eliminada.');
}
