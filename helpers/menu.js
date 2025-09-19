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
        { name: '3. Salir', value: '3' }]
    }
  ]);
  return opcion;
}