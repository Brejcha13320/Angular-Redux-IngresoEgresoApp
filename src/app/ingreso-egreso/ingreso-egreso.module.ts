import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { OrdenIngresoEgresoPipe } from '../pipes/orden-ingreso-egreso.pipe';
import { DashboardModule } from '../dashboard/dashboard.module';
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from './ingreos-egreso.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    DetalleComponent,
    EstadisticaComponent,
    IngresoEgresoComponent,
    OrdenIngresoEgresoPipe,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('ingresosEgresos', ingresoEgresoReducer),
    ReactiveFormsModule,
    DashboardModule,
    SharedModule,
    NgChartsModule,
  ],
})
export class IngresoEgresoModule {}
