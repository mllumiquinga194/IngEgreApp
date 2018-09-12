import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { _sanitizeHtml } from '@angular/core/src/sanitization/html_sanitizer';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction, UnSetItemsAction } from './ingreso-egreso.action';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  ingresoEgresoListenerSubscription: Subscription = new Subscription();
  ingresoEgresoItemsSubscription: Subscription = new Subscription();

  constructor(private afDB: AngularFirestore,//para grabar en la base de datos firebase
              public _authService: AuthService,
              private store: Store<AppState>) { }

  //
  initIngresoEgresoListener() {

    this.ingresoEgresoListenerSubscription = this.store.select('auth')//desde mi store solamente recibo el auth
      .pipe( filter( auth => auth.user != null ) ) //al pasarlo por el pipe (la cual me transforma la respuesta 'auth'), puedo filtrar esa informacion para solamente dejar pasar cuando auth.user sea diferente de null. el filter me permite establecer una condicion y si se cumple. la informacion pasa, de lo contrario lo ignora y jamas pasa. debo generar una peticion que genere true o false
        .subscribe( auth => {//me subscribo 
          //llamo la funcion 
          this.ingresoEgresoItems( auth.user.uid );
    });

  }

  //solamente para ejecutarla dentro de la clase
  private ingresoEgresoItems( uid: string ){

    // this.afDB.doc() me devuelve un JSON, un objeto en formato JSON.
    //this.afDB.collection() puedo recuperar un arreglo de elementos que eso es lo que nos interesa
    this.ingresoEgresoItemsSubscription = this.afDB.collection(`${ uid }/ingresos-egresos/items`)//establezco el patch a donde yo me voy a subscribir para escuchar los cambios que reciba
                .snapshotChanges()//para obtener el id de mis elementos dentro de items ya no uso .valueChanges() sino que uso .snapshotChanges() que me proporciona mas informacion
                .pipe(
                  //estem map es el de RXJS
                  map( docData => {
                    //este map es el de javascript que me permite transformar cada uno de los elementos que se encuentran dentro del arreglo de javascript
                    return docData.map( doc => {//doc hace referencia a cada uno de los documentos que estan en el arreglo
                      return {//el operador map me va a transformar todos los elementos que recibo y me va a extraer unicamente el uid. para traerme la propia data utilizo la funcion data que esta en el arreglo. data()
                        uid: doc.payload.doc.id,
                        ...doc.payload.doc.data() //con esta funcion me traigo la data real que necesito. al usar el operador spread, como esto viene en pares de valores va a asignar la descripcion con su valor, monto con su valor, tipo con su valor.
                      };
                    });
                  })
                )
                //.valueChanges()//valueChanges() retorna el observable a donde yo me puedo subscribir. observable que se va a encargar de trabajar con los socket de firebase
                .subscribe( ( coleccion: any ) => {//coleccion son todos los elementos que hasta ahora tengo en items
                  // console.log(coleccion);
                  this.store.dispatch( new SetItemsAction( coleccion ));//guardo en mi store
                });
  }

  cancelarSubscription(){
    
    this.ingresoEgresoListenerSubscription.unsubscribe();
    this.ingresoEgresoItemsSubscription.unsubscribe();
    this.store.dispatch( new UnSetItemsAction() );
  }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {//desde nuestro modelo

    const user = this._authService.getUsuario();//obtengo la inforamcion del usuario desde el _authService.getUsuario()

    //es todo lo que nevesito para hacer una grabacion a firebase
    return this.afDB.doc(`${user.uid}/ingresos-egresos`).collection('items').add({//firebase no trabaja con modelos, el trabaja con objetos simples, pares de valores. por eso lo mandamos asi ...ingresoEgreso para extraer unicamente las propiedades
      ...ingresoEgreso
    });//todo esto devuelve una promesa pero yo cierro aqui y pongo un return para tener ese then y catch en el components
    // .then()
    // .catch( err => console.log(err)
    // );
  }

  borrarIngresoEgreso( uid: string){

    const user = this._authService.getUsuario();

    //para borar de la base de datos
    return this.afDB.doc(`${ user.uid }/ingresos-egresos/items/${ uid }`).delete();
  }

}
