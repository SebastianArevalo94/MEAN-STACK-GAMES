export class User{
    _id?: number;
    names: string;
    lastNames: string;
    address: string;
    email: string;
    password: string;
    role: number;
    file?: string

    constructor(names: string, lastNames: string, address: string, email: string, password: string, role: number, file: string){
        this.names = names;
        this.lastNames = lastNames;
        this.address = address;
        this.email = email;
        this.password = password;
        this.role = role;
        this.file = file
    }
}