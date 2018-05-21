import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';


// import { AngularFireAuth } from 'angularfire2/auth';
// import * as firebase from 'firebase/app';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {

  }
  logout() {
    const answer: boolean = confirm("Press OK to confirm logging out!");
    if (answer) {
      this.authService.logout();
      this.router.navigate(['login']);
    }

  }

}
