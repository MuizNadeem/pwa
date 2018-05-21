import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { User } from '@firebase/auth-types';
import {
  AuthMethods,
  AuthProvider,
  AuthProviderWithCustomConfig,
  CredentialHelper,
  FirebaseUIAuthConfig,
  FirebaseUIModule
} from 'firebaseui-angular';
@Injectable()
export class AuthService {


  
  data: Object = null;
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          this.data = user;
          //this.router.navigate(['/home'])
          console.log(this.userDetails);
        }
        else {
          this.userDetails = null;
        }
      }
    );
  }

  isLoggedIn() {
    if (this.userDetails == null) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    this.userDetails = null;
    this._firebaseAuth.auth.signOut()
      .then((res) => this.router.navigate(['/login']));
  }

  

}

const PhoneCustomConfig: AuthProviderWithCustomConfig = {
  provider: AuthProvider.Phone,
  customConfig: {
    
    defaultCountry: 'IN',
    recaptchaParameters: {
      type: 'image', // 'audio'
      size: 'invisible', // 'invisible' or 'compact'
      badge: 'bottomleft' //' bottomright' or 'inline' applies to invisible.
    }
  }
};

export const AuthConfig: FirebaseUIAuthConfig = {
  providers: [
    PhoneCustomConfig,
    //AuthProvider.Google,
    // facebookCustomConfig,
    // AuthProvider.Twitter,
    // AuthProvider.Github,
    // AuthProvider.Password,
    //AuthProvider.Phone,
  ],
  method: AuthMethods.Popup,
  tos: '<your-tos-link>',
  credentialHelper: CredentialHelper.AccountChooser
}
