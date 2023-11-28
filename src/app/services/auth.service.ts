import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import * as authActions from '../auth/auth.actions';
import { child, get } from '@angular/fire/database';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private store: Store<AppState>) {}

  initAuthListener() {
    this.auth.beforeAuthStateChanged((user) => {
      if (user) {
        console.log('uid', user.uid);
        const dbRef = ref(getDatabase());
        get(child(dbRef, `${user.uid}/usuario`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              console.log(snapshot.val());
              const tempUser: Usuario = snapshot.val() as Usuario;
              this.store.dispatch(authActions.setUser({ user: tempUser }));
            } else {
              console.log('No data available');
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        this.store.dispatch(authActions.unSetUser());
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
