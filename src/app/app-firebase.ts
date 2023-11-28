import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const FIREBASE = [
  provideFirebaseApp(() =>
    initializeApp({
      projectId: 'ingreso-egreso-app-75074',
      appId: '1:105100240458:web:17e3ac6a72d7a8417268b3',
      databaseURL:
        'https://ingreso-egreso-app-75074-default-rtdb.firebaseio.com',
      storageBucket: 'ingreso-egreso-app-75074.appspot.com',
      apiKey: 'AIzaSyBn8_bYTkgdv7CQDxTqLGvVDnsVo8aYPRs',
      authDomain: 'ingreso-egreso-app-75074.firebaseapp.com',
      messagingSenderId: '105100240458',
      measurementId: 'G-J2504SZB0S',
    })
  ),
  provideAuth(() => getAuth()),
  provideFirestore(() => getFirestore()),
  provideDatabase(() => getDatabase()),
];
