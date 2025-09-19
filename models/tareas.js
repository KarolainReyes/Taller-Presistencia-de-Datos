class Tarea {
    constructor(nombre, descripcion, estado) {
        if(nombre.length <= 0){
            throw new Error("No puede dejar el nombre vacio");}else{this.nombre=nombre}
        if(descripcion.length <= 0){
            throw new Error("No puede dejar la descripcion vacia");  
        }else{this.descripcion=descripcion}
        if(estado!="Completado" && estado!="Pendiente"){
            throw new Error("Estado invalido");
        }else{this.estado=estado}
    }
}
