import { MyTrucksComponent } from './components/owner/my-trucks/my-trucks.component';
import { ClosedOrdersComponent } from './components/owner/orders/closed-orders/closed-orders.component';
import { OpenOrdersComponent } from './components/owner/orders/open-orders/open-orders.component';
import { OrdersComponent } from './components/owner/orders/orders.component';
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
        { path:'' , component: HomeComponent },
        { path:'home' , component: HomeComponent },
        { path:'login' , component: LoginComponent },
        { path:'register' , canActivate: [AuthGuard] , component: RegisterComponent },
        { path:'profile' , canActivate: [AuthGuard], component: ProfileComponent },
        
        { path:'dashboard', canActivate: [AuthGuard] , component: DashboardComponent },
        { path:'orders',  component: OrdersComponent },
        { path:'orders/open',  component: OpenOrdersComponent },
        { path:'orders/closed',  component: ClosedOrdersComponent },
        { path:'myTrucks',  component: MyTrucksComponent }    
      ] ;
  
  
  
  
  