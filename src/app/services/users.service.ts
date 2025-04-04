import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'http://localhost:8000/api/usuarios';


  constructor(private http: HttpClient) { }

  // Obtener todos los usuarios (READ)
  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  // Obtener un usuario por ID (READ)
  getUser(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo usuario (CREATE)
  createUser(formData: FormData): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, formData);
  }

  // Actualizar un usuario existente (UPDATE)
  updateUser(id: number, formData: FormData): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}?_method=PUT`, formData);
  }

  // Eliminar un usuario (DELETE)
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
