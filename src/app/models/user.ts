export class Usuario {
    id: number;
    nombre: string;
    apellidos: string;
    email: string;
    contraseña: string;
    categoria: string;
    imagen: string;

    constructor(
        id: number = 0, 
        nombre: string, 
        apellidos: string, 
        email: string, 
        contraseña: string, 
        categoria: string = 'usuario', 
        imagen: string = 'imagenDefault.png',
    ){
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.contraseña = contraseña;
        this.categoria = categoria;
        this.imagen = imagen;
    }
}