import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { getDatabase, ref, set } from 'firebase/database';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  initAuthListener() {
    this.auth.beforeAuthStateChanged((user) => {
      console.log(user?.email);
      console.log(user?.uid);
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
