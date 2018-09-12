import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor( public _authService: AuthService) { }

  //espera que yo retorne un boolean, una promesa o un observable.
  //esta funcion se ejecuta en el app.routing.module.ts y me ayuda a proteger mis rutas
  canActivate(){

    return this._authService.isAuth();//esta funcion esta en el servicio AuthService y la uso para validar si el usuario esta logeado.
    //return false;//si hago return false significa que el usuario no deberia ver esta ruta, por consecuencia deberia redireccionarlo al login
  }
}
