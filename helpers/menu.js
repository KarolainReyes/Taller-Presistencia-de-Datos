import inquirer from 'inquirer';

export async function mostrarMenu() {
  const { opcion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: 'Selecciona una opción:',
      choices: [
        { name: '1. Agregar tarea', value: '1' },
        { name: '2. Listar tareas', value: '2' },
        { name: '3. Editar tarea', value: '3' },
        { name: '4. Eliminar tarea', value: '4' },
        { name: '5. Salir', value: '5' }
      ]
    }
  ]);
  return opcion;
}


export async function mostrarMenuListar() {
  const { opcion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: 'Selecciona una opción:',
      choices: [
        { name: '1. Orden general', value: '1' },
        { name: '2. Orden alfabetico', value: '2' },
        { name: '3. Tareas completadas', value: '3' },
        { name: '4. Tareas pendientes', value: '4' },
        { name: '5. Salir', value: '5' }]
    }
  ]);
  return opcion;
}

export async function preguntar(pregunta) {
  const respuesta = await inquirer.prompt([
    {
      type: "input",       
      name: "nombre",      
      message: pregunta, 
    }
  ]);

  return respuesta.nombre
}

export async function opciones(...opcionesLista) {
  const { opcion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: 'Selecciona una opción:',
      choices: opcionesLista
    }
  ]);
  return opcion;
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
