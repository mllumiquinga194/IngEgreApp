export class IngresoEgreso {

    descripcion: string;
    monto: number;
    tipo: string;
    uid?: string;//este uid lo crea firebase por eso es opcional

    constructor( obj ) {

        //aqui lo que hacemos es preguntar si existe el obj, si existe entonces toma el nombre sino coloca null
        this.descripcion = obj && obj.descripcion || null;
        this.monto = obj && obj.monto || null;
        this.tipo = obj && obj.tipo || null;
        // this.uid = obj && obj.uid || null;
    }
}
