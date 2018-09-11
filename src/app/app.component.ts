import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor( public _authService: AuthService ){

  }

  ngOnInit(){
// este metodo se va a encargar de escuchar el estado del usuario
    this._authService.initAuthListener();
  }
}
