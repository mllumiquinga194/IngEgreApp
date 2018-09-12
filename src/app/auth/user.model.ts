export class User{

    public nombre: string;
    public email: string;
    public uid: string;

    constructor(obj: DataObj ){
        
        //aqui lo que hacemos es preguntar si existe el obj, si existe entonces toma el nombre sino coloca null
        this.nombre = obj && obj.nombre || null;
        this.uid = obj && obj.uid || null;
        this.email = obj && obj.email || null;
    }
}

interface DataObj{

    uid: string;
    email: string;
    nombre: string;
}