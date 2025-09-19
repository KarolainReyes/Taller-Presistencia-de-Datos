import { mostrarMenu, mostrarMenuListar } from './helpers/menu.js';
import { listarTareas, agregarTarea, listarTareasAlfabetica, editarTarea, eliminarTarea} from './controllers/tareasController.js';


async function main() {
  let salir = false;

  while (!salir) {
    const opcion = await mostrarMenu();

    switch (opcion) {
      case '1':
        await agregarTarea();
        break;
      case '2':
        let salirLista = false
        while (salirLista == false) {
          const opcionLista = await mostrarMenuListar();
          switch (opcionLista) {
            case '1':
              await listarTareas();
              salirLista = true;
              break;
            case '2':
              await listarTareasAlfabetica();
              salirLista = true;
              break;
            case '3':
              salirLista = true;
              break;
            default:
              break;
          }
        }
        break;
      case '3':
       await editarTarea()
        break;
      case '4':
await eliminarTarea()
        break;
      case '5':
        salir = true;
        console.log('👋 ¡Hasta pronto!');
        break;
    }
  }
}

main();