import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  crearUsuario() {
    if (this.registroForm.valid) {
      const { nombre, correo, password } = this.registroForm.value;

      Swal.fire({
        title: 'Espere por favor',
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });

      this.authService
        .crearUsuario(nombre, correo, password)
        .then((credenciales) => {
          console.log({ credenciales });
          Swal.close();
          this.router.navigate(['/']);
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
          });
        });
    }
  }
}
