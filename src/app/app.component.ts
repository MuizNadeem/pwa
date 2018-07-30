import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import {SwUpdate} from '@angular/service-worker';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Apne Truck';
constructor(public authService: AuthService, private router: Router, updates:SwUpdate){

updates.available.subscribe(event => {

  //this.update = true;
  updates.activateUpdate().then(() => document.location.reload());

})


}

}




