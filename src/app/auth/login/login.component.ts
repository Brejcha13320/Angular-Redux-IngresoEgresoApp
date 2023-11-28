import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import * as ui from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnDestroy {
  loginForm!: FormGroup;
  cargando: boolean = false;
  uiSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.uiSubscription = this.store
      .select('ui')
      .subscribe((ui) => (this.cargando = ui.isLoading));
  }
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  loginUsuario() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.store.dispatch(ui.isLoading());

      // Swal.fire({
      //   title: 'Espere por favor',
      //   showConfirmButton: false,
      //   willOpen: () => {
      //     Swal.showLoading();
      //   },
      // });

      this.authService
        .loginUsuario(email, password)
        .then((credenciales) => {
          console.log({ credenciales });
          // Swal.close();
          this.store.dispatch(ui.stopLoading());
          this.router.navigate(['/']);
        })
        .catch((error) => {
          this.store.dispatch(ui.stopLoading());
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
          });
        });
    }
  }
}
