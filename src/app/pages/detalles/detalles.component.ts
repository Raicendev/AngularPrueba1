import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../models/user';
import { UsersService } from '../../services/users.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalles',
  imports: [ReactiveFormsModule],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.css'
})
export class DetallesComponent {
  listaUsuarios: Usuario[] = [];
  usuarioSeleccionado: Usuario | null = null;
  formularioEdicion: FormGroup;
  mostrarFormularioEdicion: boolean = false;
  selectedFile: File | null = null;
  imagenActual: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService,
    private fb: FormBuilder
  ) {
    this.formularioEdicion = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      categoria: [''],
      // No incluimos el ID ya que no se edita
    });

    this.route.queryParams.subscribe(params => {
      this.handleQueryParams(params['users']);
    });
    this.handleNavigationState();
  }

  private handleQueryParams(usersParam: string): void {
    if (usersParam) {
        try {
            this.listaUsuarios = JSON.parse(usersParam);
            console.log('Lista de usuarios recibida:', this.listaUsuarios);
        } catch (error) {
            console.error('Error al parsear la lista de usuarios:', error);
        }
    } else {
        console.warn('No se recibieron datos de usuarios.');
    }
  }

  private handleNavigationState(): void {
    const usersState = this.router.getCurrentNavigation()?.extras?.state?.['users'] as Usuario[];
    if (usersState) {
        this.listaUsuarios = usersState;
        console.log('Lista de usuarios recibida (state):', this.listaUsuarios);
    }
  }

  editarUsuario(usuario: Usuario): void {
    this.usuarioSeleccionado = usuario;
    this.mostrarFormularioEdicion = true;
    this.cargarDatosEnFormulario();
  }

  cargarDatosEnFormulario(): void {
    if (this.usuarioSeleccionado) {
      this.formularioEdicion.patchValue({
        nombre: this.usuarioSeleccionado.nombre,
        apellidos: this.usuarioSeleccionado.apellidos,
        categoria: this.usuarioSeleccionado.categoria,
        contraseña: '' // Limpiar la contraseña por seguridad
      });
      this.imagenActual = this.usuarioSeleccionado.imagen;
      this.selectedFile = null; // Resetear el archivo seleccionado
    }
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files && event.target.files.length > 0 ? event.target.files[0] : null;
  }

  guardarUsuarioEditado(): void {
    if (this.formularioEdicion.valid && this.usuarioSeleccionado) {
        const formData = new FormData();
        Object.keys(this.formularioEdicion.controls).forEach(key => {
            formData.append(key, this.formularioEdicion.get(key)?.value);
        });
        if (this.selectedFile) {
            formData.append('imagen', this.selectedFile, this.selectedFile.name);
        }
        this.userService.updateUser(this.usuarioSeleccionado.id, formData).subscribe({
            next: (response) => {
                this.updateLocalList(response);
                this.resetForm();
                alert('Usuario actualizado correctamente!');
            },
            error: (error) => {
                console.error('Error al actualizar el usuario:', error);
                alert('Error al actualizar el usuario.');
            }
        });
    } else {
        this.formularioEdicion.markAllAsTouched();
    }
}

private updateLocalList(updatedUser: Usuario): void {
    const index = this.listaUsuarios.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
        this.listaUsuarios[index] = updatedUser;
    }
}

private resetForm(): void {
    this.mostrarFormularioEdicion = false;
    this.usuarioSeleccionado = null;
    this.imagenActual = null;
    this.selectedFile = null;
}

  eliminarUsuario(usuarioId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.userService.deleteUser(usuarioId).subscribe({
        next: () => {
          console.log(`Usuario con ID ${usuarioId} eliminado correctamente.`);
          this.router.navigate(['/list']);
        },
        error: (error) => {
          console.error(`Error al eliminar el usuario con ID ${usuarioId}:`, error);
        }
      });
    }
  }

  volver(){
    this.router.navigate(['/list']);
  }
}
