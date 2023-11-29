import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { child, get, onValue } from '@angular/fire/database';
import { Usuario } from '../models/usuario.model';
import * as authActions from '../auth/auth.actions';
import * as ingresoEgresoActions from '../../app/ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user: Usuario | null = null;

  get user() {
    return this._user;
  }

  constructor(private auth: Auth, private store: Store<AppState>) {}

  initAuthListener() {
    this.auth.beforeAuthStateChanged((user) => {
      if (user) {
        const dbRef = ref(getDatabase());
        const userFirebase = child(dbRef, `${user.uid}/usuario`);
        onValue(
          userFirebase,
          (snapshot) => {
            if (snapshot.exists()) {
              const tempUser = snapshot.val();
              this._user = tempUser;
              this.store.dispatch(authActions.setUser({ user: tempUser }));
            } else {
              console.log('No hay datos disponibles');
            }
          },
          {
            onlyOnce: false, // Establezca en false para escuchar actualizaciones en tiempo real
          }
        );
      } else {
        this._user = null;
        this.store.dispatch(authActions.unSetUser());
        this.store.dispatch(ingresoEgresoActions.unSetItems());
      }
    });
  }

  async crearUsuario(nombre: string, email: string, password: string) {
    const { user } = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    const db = getDatabase();
    await set(ref(db, `${user.uid}/usuario`), {
      uid: user.uid,
      nombre,
      email,
    });

    return user;
  }

  loginUsuario(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return Boolean(this.auth.currentUser);
  }
}
