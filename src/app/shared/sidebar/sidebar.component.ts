import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor( public _authService: AuthService) { }

  ngOnInit() {
    console.log('sidebar.component.ts Cargado');
  }

  logout(){
    this._authService.logout();
  }

}
