import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import * as firebase from 'firebase';//Interfaces de firebase
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { User } from './user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';

@Injectable({
  providedIn: 'root'//ya no necesito importarlo en mi app.module porque esta etiqueta me lo deja global para toda la app pero si deseo, puedo borrar esto e importarlo
})
export class AuthService {

  constructor( private afAuth: AngularFireAuth,
               private router: Router,//para navegar a otras rutas
               private afDB: AngularFirestore, //para escribir en la base de datos
               private store: Store<AppState> ) {
  }
// este metodo se va a encargar de escuchar el estado del usuario
  initAuthListener(){
    this.afAuth.authState.subscribe((fbUser: firebase.User) =>{//fbUser: firebase.User aplico las interfaces de firebase.
      console.log(fbUser);
    });
  }

  crearUsuario( nombre: string, email: string, password: string ){

    this.store.dispatch( new ActivarLoadingAction() );


    //estos metodos de angularfireauth devuelven promesas.
    //this.afAuth.auth.createUserWithEmailAndPassword para crear un usuario en firebase
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then( resp => {

      //guardar el usuario creado en la base de datos FIREBASE
      const user: User = {//creo un objeto tipo usuario
        uid: resp.user.uid,
        nombre,
        email: resp.user.email
      }
      // hago referencia a un documento de la base de datos.
      //this.afDB grabo en la base de datos con un string construido
      // con ${ user.uid } quiero que cree en firebase un documento que tenga como primera llave el uid del usuario. luego le mando lo que va en el segundo nivel del documento
      this.afDB.doc(`${ user.uid }/usuario`)
      //con set, le mando la inforamcion que va en el segundo nivel, en este caso le mando el usuario. sus datos. si ya hay algio, se reemplaza
      //esto regresa una promesa
        .set( user )
          .then ( () => {
            //si todo lo hase correctamente, navego hasta el dashboard
            this.router.navigate(['/']);
            this.store.dispatch( new DesactivarLoadingAction() );

          });
      }
    ).catch(err => {
      this.store.dispatch( new DesactivarLoadingAction() );
      Swal('Error en el login', err.message, 'error');
    });
  }

  login( email:string, password: string){

    this.afAuth.auth.signInWithEmailAndPassword(email, password).then( resp => {
      this.router.navigate(['/']);
    }).catch ( err => {
      Swal('Error en el login', err.message, 'error');
    });
  }

  logout(){
    this.router.navigate(['login']);
    this.afAuth.auth.signOut();
  }

  isAuth(){
    // hasta aqui regresaria un observable pero el canActive espera en verdadero o false. lo pasamos por pipe para transformarlo. El operador map me va a permitir tener la respuesta fbUser y procesarla.
    return this.afAuth.authState //hasta aqui devuelve en observable como lo vemos en this.afAuth.authState.subscribe((fbUser: firebase.User) (linea 20 si es que no se modifica mas)
                .pipe( //aqui lo transformamos para obtener el verdadero o falso de esta respuesta fbUser
                  map( fbUser => {

                    if( fbUser == null){//si fbUser esta vacio redirecciono al login
                      this.router.navigate(['/login']);
                    }  
                    return fbUser != null;//si fbUser es diferente de null retorna true, sino, retorna false.
                  }));
  }

}
