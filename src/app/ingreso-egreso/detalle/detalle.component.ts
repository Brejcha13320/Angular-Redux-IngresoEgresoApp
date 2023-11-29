import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateWitchIngresoEgreso } from '../ingreos-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [],
})
export class DetalleComponent implements OnDestroy {
  ingresosEgresos: IngresoEgreso[] = [];
  subsIngresosEgresos: Subscription;
  constructor(
    private store: Store<AppStateWitchIngresoEgreso>,
    private ingresoEgresoService: IngresoEgresoService
  ) {
    this.subsIngresosEgresos = this.store
      .select('ingresosEgresos')
      .subscribe(({ items }) => {
        this.ingresosEgresos = items;
      });
  }

  ngOnDestroy(): void {
    this.subsIngresosEgresos.unsubscribe();
  }

  borrar(uid: string | undefined) {
    if (uid) {
      this.ingresoEgresoService
        .borrarIngresoEgreso(uid)
        .then(() => {
          Swal.fire('Borrado', 'Item Borrado', 'success');
        })
        .catch((error) => {
          Swal.fire('Error', error.message, 'error');
        });
    }
  }
}
