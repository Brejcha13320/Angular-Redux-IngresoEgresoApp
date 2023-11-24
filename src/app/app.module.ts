import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Modulos
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import { EstadisticaComponent } from './ingreso-egreso/estadistica/estadistica.component';
import { DetalleComponent } from './ingreso-egreso/detalle/detalle.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
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
    provideFirebaseApp(() => initializeApp({"projectId":"ingreso-egreso-app-75074","appId":"1:105100240458:web:17e3ac6a72d7a8417268b3","databaseURL":"https://ingreso-egreso-app-75074-default-rtdb.firebaseio.com","storageBucket":"ingreso-egreso-app-75074.appspot.com","apiKey":"AIzaSyBn8_bYTkgdv7CQDxTqLGvVDnsVo8aYPRs","authDomain":"ingreso-egreso-app-75074.firebaseapp.com","messagingSenderId":"105100240458","measurementId":"G-J2504SZB0S"})),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
