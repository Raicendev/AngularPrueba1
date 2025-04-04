import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-register',
    imports: [FormsModule, ReactiveFormsModule, CommonModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
    registerForm: FormGroup;
    selectedFile: File | null = null;
    imagenDefault = 'imagenDefault.png';
    submitted = false;

    constructor(
        private router: Router,
        private userService: UsersService,
        private fb: FormBuilder
    ) {
        this.registerForm = this.fb.group({
            nombre: ['', Validators.required],
            apellidos: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            contraseña: ['', [Validators.required, Validators.minLength(8)]],
            confirmarContraseña: ['', Validators.required],
            imagen: [null]
        }, { validator: this.checkPasswords });
    }


    checkPasswords(group: FormGroup) {
        const pass = group.controls['contraseña'].value;
        const confirmPass = group.controls['confirmarContraseña'].value;

        return pass === confirmPass ? null : { notSame: true };
    }

    onFileChange(event: any): void {
        if (event.target.files && event.target.files.length > 0) {
            this.selectedFile = event.target.files[0];
        } else {
            this.selectedFile = null;
        }
    }

    onSubmit(): void {
        this.submitted = true;
        if (this.registerForm.valid) {
            const formData = new FormData();
            formData.append('nombre', this.registerForm.get('nombre')?.value);
            formData.append('apellidos', this.registerForm.get('apellidos')?.value);
            formData.append('email', this.registerForm.get('email')?.value);
            formData.append('contrasena', this.registerForm.get('contraseña')?.value);
            formData.append('categoria', 'usuario');
            if (this.selectedFile) {
                formData.append('imagen', this.selectedFile, this.selectedFile.name);
            } else {
                formData.append('imagen', this.imagenDefault);
            }

            this.userService.createUser(formData)
                .subscribe({
                    next: (response) => {
                        console.log('Registro exitoso', response);
                        this.router.navigate(['/login']);
                    },
                    error: (error) => {
                        console.error('Error en el registro', error);
                    }
                });
        } else {
            Object.values(this.registerForm.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsTouched();
                }
            });
        }
    }
}