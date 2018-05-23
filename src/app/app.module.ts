import { MapsComponent } from './components/maps/maps.component';
import { AuthGuard } from './services/auth-guard.service';
import { ROUTES } from './app.routes';
import { AuthService , AuthConfig } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';

import { RegisterComponent } from './components/register/register.component';
import { TruckComponent } from './components/register/truck/truck.component';
import { TruckListComponent } from './components/register/truck-list/truck-list.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';

import { AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FirebaseUIModule } from 'firebaseui-angular';
import { FormsModule,FormControl, ReactiveFormsModule } from '@angular/forms';


import { AgmCoreModule } from '@agm/core';
import { DirectionsMapDirective } from './map/google-map.directive';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ProfileComponent,
    HomeComponent,
    TruckComponent,
    TruckListComponent,
    DirectionsMapDirective,
    MapsComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    FirebaseUIModule.forRoot(AuthConfig),
    AgmCoreModule.forRoot({ // @agm/core
      apiKey: 'AIzaSyDsLcRnpyPrKMyEDk66ZvEHmy3YaUA2n_4',
      libraries:["places", ]
    })

  ],
  providers: [AuthService, AuthGuard],

  bootstrap: [AppComponent]
})
export class AppModule { }
  