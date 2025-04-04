import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  public fillColor: string;
  public nombre: string;
  public email: string;
  public mensaje: string;
  
  constructor() {
    this.fillColor = '#0000FF';
    this.nombre = '';
    this.email = '';
    this.mensaje = '';
  }

  onHover() {
    this.fillColor = '#ccff00'; // Cambia el color al pasar el ratón
  }

  onLeave() {
    this.fillColor = '#0000FF'; // Restaura el color original al salir
  }

  enviarMensaje(nombre: string, email: string, mensaje: string) {
    console.log('Nombre: ' +nombre+ '\nEmail: ' +email+ '\nMensaje: ' + mensaje);
  }
}
