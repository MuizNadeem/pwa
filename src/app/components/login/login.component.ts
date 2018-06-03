import { PersistanceService } from './../../services/persistance.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {AngularFireAuth} from 'angularfire2/auth';
import {FirebaseUISignInSuccess} from 'firebaseui-angular';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private persister: PersistanceService, private router: Router, private afAuth: AngularFireAuth, private authService: AuthService) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn())
    this.router.navigate(['/dashboard']);
  }

  successCallback(data: FirebaseUISignInSuccess) {
    this.persister.set("loggedIn","true");
    this.router.navigate(['/dashboard']);
  }

}
