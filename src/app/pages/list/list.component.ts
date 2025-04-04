import { Component } from '@angular/core';
import { Usuario } from '../../models/user';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  public users: Usuario[] = [];

  constructor(private router: Router, private userService: UsersService) {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((respuesta: any) => {
      this.users = respuesta;
    });
  }

  verUser(id: number) {
    this.router.navigate(['details', id]);
}
}
