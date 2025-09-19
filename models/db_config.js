
db.createCollection("ventas", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["nombre", "descripcion","estado"],
        properties: {
          nombre: {
            bsonType: "string",
            description: "Nombre de la tarea",
            minlength: 1, 
            maxlength: 100
          },
          descripcion: {
            bsonType: "string",
            description: "Instrumento principal del curso",
            minlength: 1,
            maxlength: 300
          }
              }
            }
          }
        }
    )

