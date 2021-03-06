import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) { }
    canActivate() {
       
      if ( this.authService.isLoggedIn() ) {
        // console.log("canactivate true")
          return true;
      }
     else{ 
      //  this.router.navigate(['/home']);
    //  console.log("canactivate false")
      return false;
    }
  }
}