import { Injectable } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { getDatabase, ref, push, child } from 'firebase/database';
import { AuthService } from './auth.service';
import { onValue, remove } from '@angular/fire/database';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root',
})
export class IngresoEgresoService {
  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  async crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const uid = this.authService.user?.uid;
    const db = getDatabase();
    return await push(ref(db, `${uid}/ingresos-egresos/items`), ingresoEgreso);
  }

  initIngresoEgresoListener(uid: string) {
    const dbRef = ref(getDatabase());
    const ingresosEgresosRef = child(dbRef, `${uid}/ingresos-egresos/items`);

    onValue(
      ingresosEgresosRef,
      (snapshot) => {
        if (snapshot.exists()) {
          let ingresosEgresos: IngresoEgreso[] = [];
          const dataFirebase = snapshot.val();

          for (let uid in dataFirebase) {
            let nuevoObjeto = {
              uid: uid,
              ...dataFirebase[uid],
            };
            ingresosEgresos.push(nuevoObjeto);
          }

          this.store.dispatch(
            ingresoEgresoActions.setItems({ items: ingresosEgresos })
          );
        } else {
          console.log('No hay datos disponibles');
        }
      },
      {
        onlyOnce: false, // Establezca en false para escuchar actualizaciones en tiempo real
      }
    );
  }

  borrarIngresoEgreso(uidItem: string) {
    const uid = this.authService.user?.uid;
    const db = getDatabase();
    return remove(ref(db, `${uid}/ingresos-egresos/items/${uidItem}`));
  }
}
