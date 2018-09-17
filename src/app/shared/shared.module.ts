import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
// import { AppRoutingModule } from '../app.routing.module';
import { RouterModule} from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    RouterModule // tuve que importarlo para que me funcione el routerlink
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  exports: [//ya que uso este modulo en el dashboard, entonces para que no me de error, los exporto.
    //estoy usando elementos de estos modulos fuera de ellos entonces los exporto para que puedan ser usados fuera.
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
