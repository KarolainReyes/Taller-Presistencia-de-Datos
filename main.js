import { mostrarMenu, mostrarMenuListar, sleep} from './helpers/menu.js';
import { agregarTarea, listarTareasAlfabetico, editarTarea, eliminarTarea, listarTareasGeneral, listarTareasCompletadas, listarTareasPendientes} from './controllers/tareasController.js';
import chalk from "chalk";

async function main() {
  console.log(chalk.magentaBright("======================================"));
  console.log(chalk.magentaBright("  BIENVENIDO AL SISTEMA DON EDGAR"));
 console.log(chalk.magentaBright("======================================"));
  let salir = false;

  while (!salir) {
    const opcion = await mostrarMenu();
    await sleep(1000);
    console.clear();
    switch (opcion) {
      case '1':
        await agregarTarea();
        await sleep(1000);
    console.clear();
        break;
      case '2':
        let salirLista = false
        while (salirLista == false) {
          const opcionLista = await mostrarMenuListar();
          await sleep(1000);
    console.clear();
          switch (opcionLista) {
            case '1':
              await listarTareasGeneral();
              salirLista = true;
              break;
            case '2':
              await listarTareasAlfabetico();
              salirLista = true;
              break;
            case '3':
              await listarTareasCompletadas();
              salirLista = true;
              break;
            case '4':
              await listarTareasPendientes();
              salirLista= true;
            case '5':
              salirLista=true;
              break;
            default:
              break;
          }
        };
        await sleep(1000);
    console.clear();
        break;
      case '3':
       await editarTarea()
       await sleep(1000);
    console.clear();
        break;
      case '4':
await eliminarTarea()
await sleep(1000);
    console.clear();
        break;
      case '5':
        salir = true;
        console.log(' ¡Hasta pronto!');
        await sleep(1000);
    console.clear();
        break;
    }
  }
}

main();