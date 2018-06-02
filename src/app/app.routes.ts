import { Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';
import{ AuthGuard} from './services/auth-guard.service';

    
export const ROUTES: Routes = [
        { path:'' , component: LoginComponent },
        { path:'home' , canActivate: [AuthGuard], component: HomeComponent },
        { path:'register' , canActivate: [AuthGuard] , component: RegisterComponent },
        { path:'login' , component: LoginComponent },
        { path:'profile' , canActivate: [AuthGuard], component: ProfileComponent },
        { path:'dashboard', canActivate: [AuthGuard] , component: DashboardComponent },
        
      
      ] ;
  
  
  
  
  