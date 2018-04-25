import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Apne Truck';
constructor(public authService: AuthService, private router: Router){
}

}




