import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';

import * as firebase from 'firebase';//Interfaces de firebase
import { map } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { User } from './user.model';

import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
import { SetUserAction, UnsetUserAction } from './auth.action';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'//ya no necesito importarlo en mi app.module porque esta etiqueta me lo deja global para toda la app pero si deseo, puedo borrar esto e importarlo
})
export class AuthService {

  //si no tengo ningun usuario autenticado, el va a querer unsubscribe pero eso me generar un error, por eso inicializo y ya no me genera ese error porque auqnue no haya uysuario autenticado, la Subscription si tiene un valor y si puede proceder a unsubscribe
  private userSubscripcion: Subscription = new Subscription(); //para hacer lo mismo que en login y register. unsubscripcion
  private usuario: User;

  constructor(private afAuth: AngularFireAuth,
              private router: Router,//para navegar a otras rutas
              private afDB: AngularFirestore, //para escribir en la base de datos
              private store: Store<AppState>) {
  }
  
  // este metodo se va a encargar de escuchar el estado del usuario
  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {//fbUser: firebase.User aplico las interfaces de firebase.

      if ( fbUser ){
        this.userSubscripcion = this.afDB.doc(`${ fbUser.uid }/usuario`).valueChanges() //esto devuelve un observable y me subscribo a ella. en firebase puedo realizar cambios en la base de datos e inmediataente me anuncia de esos cambios en mi aplicacion
          .subscribe( (usuarioObj: any) => {//en este punto, no puedo disparar mi accion porque el usuarioObj que me devuelve firebase no es igual al modelo que tengo de usuario por lo cual de aqui vamos a modificar el constructor del modelo para poder trabajar con ese usuarioOb y lo va a establecer de forma dinamica de acuerdo a las propiedades que tenga.

            const newUser = new User( usuarioObj ) ;
            //newUser ahora si es igual al modelo por la cual si puedo disparar mi accion
            this.store.dispatch( new SetUserAction ( newUser ));//y lo almacena en el store
            
            this.usuario = newUser;//para guardar en una propiedad los datos del usuario y poder usarlo en otros componentes 
          });
      } else {//si no esta autenticado. cerro sesion o se desautenticó.

        this.usuario = null;
        //cancelar la subscripcion si es que existe
        this.userSubscripcion.unsubscribe();//con esto lo que prevengo es de no crear un monton de observables de cosas que al momento no nos interesan.
      }
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
    //lo estoy haciuendo en una linea pero bien pude crear una constante tipo accion y luego mandar el dispatch
    this.store.dispatch(new ActivarLoadingAction());//cuando creo el usuario, disparo la accion de activar loading.


    //estos metodos de angularfireauth devuelven promesas.
    //this.afAuth.auth.createUserWithEmailAndPassword para crear un usuario en firebase
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(resp => {

      //guardar el usuario creado en la base de datos FIREBASE
      const user: User = {//creo un objeto tipo usuario. o sea , de mi modelo.
        uid: resp.user.uid,
        nombre,
        email: resp.user.email
      }
      // hago referencia a un documento de la base de datos.
      //this.afDB grabo en la base de datos con un string construido
      // con ${ user.uid } quiero que cree en firebase un documento que tenga como primera llave el uid del usuario. luego le mando lo que va en el segundo nivel del documento
      this.afDB.doc(`${user.uid}/usuario`)
        //con set, le mando la inforamcion que va en el segundo nivel, en este caso le mando el usuario. sus datos. si ya hay algo, se reemplaza
        //esto regresa una promesa
        .set(user)
        .then(() => {
          //si todo lo hase correctamente, navego hasta el dashboard
          this.router.navigate(['/']);

          //cuando el usuario ya se autenticó y se creo el registro en la base de datos, desactivo el loading
          this.store.dispatch(new DesactivarLoadingAction());

        });
    }
    ).catch(err => {
      //en caso de error, tambien desactivo el loading
      this.store.dispatch(new DesactivarLoadingAction());
      Swal('Error en el login', err.message, 'error');
    });
  }

  login(email: string, password: string) {

    this.store.dispatch(new ActivarLoadingAction());//cuando inicia sesion el usuario, disparo la accion de activar loading.

    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(resp => {

      //cuando ya inicia sesion desactivo
      this.store.dispatch(new DesactivarLoadingAction());
      this.router.navigate(['/']);
    }).catch(err => {

      //si hay error, desactivo
      this.store.dispatch(new DesactivarLoadingAction());

      Swal('Error en el login', err.message, 'error');
    });
  }

  logout() {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();

    this.store.dispatch( new UnsetUserAction() );//para vaciar mi estado y no dejar informacion una vez cerrada la sesion
  }

  //en auth-guard.service se llama a esta funcion para verificar que el usuario este logeado y asi proteger las rutas
  isAuth() {
    // hasta aqui regresaria un observable pero el canActive espera en verdadero o false. lo pasamos por pipe para transformarlo. El operador map me va a permitir tener la respuesta fbUser y procesarla.
    return this.afAuth.authState //hasta aqui devuelve en observable como lo vemos en this.afAuth.authState.subscribe((fbUser: firebase.User) (linea 20 si es que no se modifica mas)
      .pipe( //aqui lo transformamos para obtener el verdadero o falso de esta respuesta fbUser
        map(fbUser => {

          if (fbUser == null) {//si fbUser esta vacio redirecciono al login
            this.router.navigate(['/login']);
          }
          return fbUser != null;//si fbUser es diferente de null retorna true, sino, retorna false.
        }));
  }

  getUsuario(){
    return {
      ...this.usuario
    };//para romper las referencias de javascript extrayendo las propiedades
  }

}
