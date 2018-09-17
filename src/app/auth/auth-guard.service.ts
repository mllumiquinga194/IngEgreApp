import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

//debo importar el CanLoad para que me funcione con el LAzyLoad.
export class AuthGuardService implements CanActivate, CanLoad {//todo lo que tenga que ver con rutas debe ser importado desde @angular/router.

  constructor( public _authService: AuthService) { }

  //espera que yo retorne un boolean, una promesa o un observable.
  //esta funcion se ejecuta en el app.routing.module.ts y me ayuda a proteger mis rutas
  canActivate(){

    return this._authService.isAuth();//esta funcion está en el servicio AuthService y la uso para validar si el usuario esta logeado.
    //return false;//si hago return false significa que el usuario no deberia ver esta ruta, por consecuencia deberia redireccionarlo al login
  }

  canLoad(){

    //esto regresa un observable. y al usar canLoad necesito cancelar esa subscripcion porque se queda escuchando para posibles cambios. Yo necesito que cada vez que se intente entrar a la ruta se ejecute una nueva instancia de este observable.
    return this._authService.isAuth()
      .pipe(//de rxjs
        take(1)//esto me indica cuantas notificaciones va a recibir este observable antes de cancelar esa subscripcion. en este caso solo queremos uno
      );
  }
}
