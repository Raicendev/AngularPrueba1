import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public imageUrls: string[] = [
    'imagen1.png',
    'imagen2.png',
    'imagen3.png',
    'imagen4.png',
    'imagen5.png',
    'imagen6.png',
    'imagen7.png',
    'imagen8.png',
  ];
}
