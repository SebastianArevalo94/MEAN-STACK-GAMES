export class Auth {
    //constructor
    constructor(_id = "", names= "" , lastNames= "", address= "" , email = "", password = "", role = 0, file= ""){
        //inicializa los valores del atributo
        this._id = _id;
        this.names = names;
        this.lastNames = lastNames;
        this.address = address;
        this.email = email;
        this.password = password;
        this.role = role;
        this.file = file;
        
    }

    //atributos -  definicion
    _id:string
    names: string
    lastNames: string
    address: string
    email:string
    password:string
    role:number
    file: string
}