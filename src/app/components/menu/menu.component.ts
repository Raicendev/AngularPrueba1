import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Usuario } from '../../models/user';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  public cookieA: string;
  public cookieS: string;
  public campoBusqueda: string;
  public datos: Usuario[] = [];
  public usuario: any;
  public esAdmin: boolean = false;
  public estaLogueado: boolean;

constructor(private router: Router, private usersService: UsersService, private authService: AuthService) {
  this.cookieA = this.getCookie('cookieAdmin') || '';
  this.cookieS = this.getCookie('cookieSesion') || '';
  this.campoBusqueda = '';
  this.getUsers();
  this.estaLogueado = authService.estaLogueado();
  if(this.estaLogueado) {
    this.usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.esAdmin = this.usuario && this.usuario.categoria === 'admin';
  }
}

logout() {
  this.authService.logout();
}

getCookie(name: string): string {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : '';
}

busqueda(campo: string) {
  var listUsers: Usuario[] = [];
  this.campoBusqueda='';
  this.getUsers();

  this.datos.forEach(element => {
    if (campo == element.email) {
      this.router.navigate(['/details/' + element.id]);
    }

    if (campo == element.nombre) {
      listUsers.push(element);
    }
  })

  if (listUsers.length > 0) {
    this.router.navigate(['/details'], { queryParams: { users: JSON.stringify(listUsers) } })
  }else {
    this.router.navigate(['/error']);
  }
  
}

getUsers() {
  this.usersService.getUsers().subscribe((respuesta: any) => {
    console.log(respuesta);
    this.datos = respuesta;
  });
}

}
