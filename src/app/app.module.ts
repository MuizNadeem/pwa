import { BrowserModule } from '@angular/platform-browser';


import {RouterModule, Routes} from '@angular/router';

import { NgModule } from '@angular/core';

import { MaterialModule } from './material.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ServiceWorkerModule } from '@angular/service-worker';


import { environment } from '../environments/environment';

import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';


const appRoutes : Routes = [
  { path:'' , component: HomeComponent },
  { path:'register' , component: RegisterComponent },
  { path:'login' , component: LoginComponent },
  { path:'profile' , component: ProfileComponent },
  { path:'dashboard' , component: DashboardComponent }

]


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ProfileComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
