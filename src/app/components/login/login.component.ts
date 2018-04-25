import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormsModule }   from '@angular/forms';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(public authService: AuthService, private router: Router) { }


  ngOnInit() {
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle()
    .then((res) => {
        this.router.navigate([''])
      })
    .catch((err) => console.log(err));
  }
 
  signInWithFacebook() {
    this.authService.signInWithFacebook()
    .then((res) => { 
        this.router.navigate([''])
      })
    .catch((err) => console.log(err));
  }
  
  login(){
    this.authService.signInWithGoogle().then((data) => {
      this.router.navigate(['']);
    } )
    
}

}
