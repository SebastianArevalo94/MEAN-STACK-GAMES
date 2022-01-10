//Clase producto
export class Juego{
    //Atributos de la clase
    _id?: number;
    nombre: string;
    clasificacion: string;
    genero: string;
    plataforma: string;
    precio: number;
    file?: string;
    
    //Constructor o inicializador de objetos
    constructor(nombre: string, clasificacion: string, genero: string, plataforma: string, precio: number, file: string){
        this.nombre = nombre;
        this.clasificacion = clasificacion;
        this.genero = genero;
        this.plataforma = plataforma;
        this.precio = precio;
        this.file = file;
    }
}