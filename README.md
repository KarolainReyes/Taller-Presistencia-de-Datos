# 📝 Sistema de Gestión de Tareas CLI – Edición Don Edgar

> _“¡Muy bonito tu sistemita con `fs`, muchach@… pero eso ya no es suficiente! Quiero la nube, quiero MongoDB, ¿o es que piensas guardar tareas en un pendrive el resto de tu vida?”_  
> — **Don Edgar**, líder absoluto de la productividad  

---

## 🚀 Descripción

Este proyecto comenzó como un simple gestor de tareas en consola, pero tras las (intensas) revisiones de Don Edgar, evolucionó en dos grandes fases:  

1. **Refactorización con Lodash + Persistencia en Archivos (`fs`)**  
   - Eliminación de duplicados en tareas.  
   - Ordenamiento y control con utilidades de **Lodash**.  
   - Persistencia local en archivos JSON para que nada se pierda al cerrar la consola.  

2. **Migración Total a MongoDB**  
   - Todas las operaciones de almacenamiento fueron movidas a una **base de datos en la nube (MongoDB Atlas o local)**.  
   - Se mantiene la misma interfaz CLI, pero con un backend mucho más robusto.  
   - Adiós al pendrive, hola escalabilidad.  

---

## 🛠️ Funcionalidades

- ➕ **Agregar tareas** con título y estado.  
- 📋 **Listar todas las tareas**, siempre ordenadas y sin duplicados.  
- ✅ **Marcar tareas como completadas**.  
- 🗑️ **Eliminar tareas** individuales o limpiar toda la lista.  
- 💾 **Persistencia en MongoDB**, garantizando que los datos se mantengan aunque apagues la máquina de Don Edgar.  

---

## 🧰 Tecnologías

- [Node.js](https://nodejs.org/)  
- [Lodash](https://lodash.com/) – para ordenar, filtrar y mantener datos limpios.  
- [MongoDB](https://www.mongodb.com/) – almacenamiento en la nube/local.  
- [Inquirer](https://www.npmjs.com/package/inquirer) – interfaz de consola interactiva.  
- [Chalk](https://www.npmjs.com/package/chalk) – colores y estilos en la terminal (porque a Don Edgar le gusta lo elegante).  

---

## ⚡ Ejecución

1. Clona este repositorio  
   ```bash
   git clone https://github.com/KarolainReyes/Taller-Presistencia-de-Datos.git
   cd Taller-persistencia-de-datos
   ```

2. Instala dependencias  
   ```bash
   npm install
   ```

3. Configura las variables de entorno (con tu URI de MongoDB) en un archivo `.env`:  
   ```
   MONGODB_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/tareas
   ```

4. Ejecuta el sistema  
   ```bash
   npm start
   ```

---

# ☕ Estructura del Proyecto – Informe para Don Edgar

Don Edgar, aquí tiene el mapa de su **Sistema de Gestión de Tareas CLI**.  
Cada carpeta y archivo fue colocado estratégicamente para mantener el orden que usted exige.  
Nada de caos, nada de duplicados, todo bajo control.  

```
TALLER-PRESISTENCIA-DE-DATOS-1/
│
├── controllers/
│   └── tareasController.js
│
├── helpers/
│   └── menu.js
│
├── models/
│   ├── db_config.js
│   └── tareas.js
│
├── utils/
│   └── archivo.js
│
├── .gitignore
├── main.js
├── package.json
├── package-lock.json
└── README.md
```

---

## 🗂️ Guía de Terreno

- **controllers/** – Aquí vive el cerebro del sistema. `tareasController.js` decide cómo se crean, listan, completan o eliminan las tareas. Nada pasa sin que él lo apruebe.  

- **helpers/** – El toque amigable. `menu.js` es el camarero que recibe las órdenes en consola, gracias a Inquirer. Muestra opciones limpias y claras, tal como a usted le gusta.  

- **models/** – El corazón de los datos.  
  - `db_config.js` es el puente hacia MongoDB, la nube que usted exigió.  
  - `tareas.js` define cómo se ve y se comporta cada tarea dentro de la base de datos.  

- **utils/** – Vestigios de la vieja era. `archivo.js` fue clave para la persistencia en archivos antes de la migración. Queda como respaldo, porque en esta empresa nada se pierde.  

- **main.js** – El maestro de ceremonias. Es el archivo que inicia el sistema, conecta los módulos y ejecuta cada comando.  

---

## ☑️ Filosofía de Orden

Este esquema garantiza que cada pieza haga solo lo que debe:  
- **Separación de responsabilidades** para evitar el caos.  
- **Escalabilidad** para que, si mañana quiere más funciones, podamos crecer sin dramas.  
- **Migración limpia**: primero sobrevivimos con archivos, ahora dominamos la nube.  

---

Con esta estructura, Don Edgar, puede estar tranquilo:  
Su sistema CLI no solo está en orden, también está listo para conquistar la nube. ☁️

---

## 👩‍💻 Desarrollado por

 * [Karol Reyes](https://github.com/KarolainReyes)

 * [Andres Leal](https://github.com/Andre07g)

---

## 📝 License

This project is for educational use. It can be used as a reference for modeling NoSQL databases in MongoDB.
