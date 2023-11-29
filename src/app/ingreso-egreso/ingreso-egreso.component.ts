import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as ui from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [],
})
export class IngresoEgresoComponent implements OnDestroy {
  ingresoEgresoForm: FormGroup;
  tipo: string = 'ingreso';
  uiSubscription: Subscription;
  cargando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) {
    this.ingresoEgresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
    });
    this.uiSubscription = this.store
      .select('ui')
      .subscribe((ui) => (this.cargando = ui.isLoading));
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  guardar() {
    if (this.ingresoEgresoForm.valid) {
      this.store.dispatch(ui.isLoading());
      this.ingresoEgresoService
        .crearIngresoEgreso({
          ...this.ingresoEgresoForm.value,
          tipo: this.tipo,
        })
        .then(() => {
          this.store.dispatch(ui.stopLoading());
          Swal.fire({
            icon: 'success',
            title: 'Registro Creado',
            text: this.ingresoEgresoForm.value.descripcion,
          });
          this.ingresoEgresoForm.reset();
        })
        .catch((err) => {
          this.store.dispatch(ui.stopLoading());
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.message,
          });
        });
    }
  }
}
