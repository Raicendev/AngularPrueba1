import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Usuario } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public cookieA: string;
  public cookieS: string;
  public userMail: string = '';
  public password: string = '';
  public datos: Usuario[] = [];
  public credentials: any = {};

  constructor(private router: Router, private userService: UsersService, private authService: AuthService) {
    this.cookieA = this.getCookie('cookieAdmin') || '';
    this.cookieS = this.getCookie('cookieSesion') || '';
    this.getUsers();
    if (this.cookieS) {
      this.router.navigate(['home']);
    }
  }
  

  validacion() {
    let valid: boolean = false;
    let campoUser = document.getElementById('username') as HTMLInputElement;
    let campoPass = document.getElementById('password') as HTMLInputElement;
    //Validar campo de Usuario
    if (!this.userMail.trim()) {
      campoUser.classList.add('is-invalid');
      valid = false;
    } else {
      campoUser.classList.remove('is-invalid');
      valid = true;
    }

    //Validar campo de password
    if (!this.password.trim() || this.password.length < 7) {
      campoPass.classList.add('is-invalid');
      valid = false;
    } else {
      campoPass.classList.remove('is-invalid');
      valid = true;
    }

    if (valid) {
      this.login(this.userMail, this.password);
      /*this.datos.forEach(usuario => {
        if (usuario.email == this.userMail && usuario.contraseña == this.password){
          document.cookie = "cookieSesion= iniciada; expires = Fri, 13 Jun 2025 00:00:00 UTC";
          if (usuario.categoria == 'admin') {
            document.cookie = "cookieAdmin= iniciado; expires = Fri, 13 Jun 2025 00:00:00 UTC";
          }
          this.router.navigate(['home']);
        }
        alert('Usuario ó Contraseña incorrectos.');
      });*/
    } 
  }
  getUsers() {
    this.userService.getUsers().subscribe((respuesta: any) => {
      this.datos = respuesta;
    });
  }

  getCookie(name: string): string {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : '';
  }

  login(mail: string, pass: string) {
    this.credentials = {
      email: mail,
      contraseña: pass
    };
    this.authService.login(this.credentials).subscribe(
      response => {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('usuario', JSON.stringify(response.usuario));
        this.router.navigate(['/home']);
      },
      error => {
        alert('Credenciales incorrectas');
      }
    );
  }
}



/*
credentials = {
    email: '',
    contrasena: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.credentials).subscribe(
      response => {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('usuario', JSON.stringify(response.usuario));
        this.router.navigate(['/home']);
      },
      error => {
        alert('Credenciales incorrectas');
      }
    );
  }
*/