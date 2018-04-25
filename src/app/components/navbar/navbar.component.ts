import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {DomSanitizer} from '@angular/platform-browser';

// import { AngularFireAuth } from 'angularfire2/auth';
// import * as firebase from 'firebase/app';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {

  constructor(
    //public afAuth: AngularFireAuth
  ) {
  }
  // login() {
  //   this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  // }
  // logout() {
  //   this.afAuth.auth.signOut();
  // }
  
  
  ngOnInit(){

  }

}
