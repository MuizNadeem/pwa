import { PersistanceService } from './persistance.service';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { first, tap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
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

  user: Observable<User>;

  //data: Object = null;
  private firebaseUser: Observable<firebase.User>;
  public userDetails: firebase.User = null;
  constructor(private persister: PersistanceService, private _firebaseAuth: AngularFireAuth, private router: Router, private afs: AngularFirestore) {
    
    //break fix 
    afs.firestore.settings({ timestampsInSnapshots: true });
    afs.firestore.enablePersistence();

    this.user = this._firebaseAuth.authState
    .switchMap(user => {
      if (user) {
        
        // logged in, get custom user from Firestore
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
      } else {
        // logged out, null
        return Observable.of(null)
      }
    })


    this.firebaseUser = _firebaseAuth.authState;
    this.firebaseUser.subscribe(
      (user) => {
        if (user) {
         
          this.userDetails = user;
         
          this.findOrCreate(`users/${user.uid}`, user)
        }
        else {
          this.userDetails = null;
         
        }
      }
    );
  }

  async findOrCreate(path: string, user: any) {

    const doc = await this.docExists(path);
    const data: User = {
      uid: user.uid,
      phone: user.phoneNumber,
      firstName: "",
      lastName: "",
      role: "",
      email : ""
    }

    if (doc) {
      return 'doc exists'
    } else {
      await this.afs.doc(path).set(data)
      return 'created new doc'
    }
  }

  docExists(path: string) {
    return this.afs.doc(path).valueChanges().pipe(first()).toPromise()
  }

  updateUser(user: User, data: any) {
    return this.afs.doc(`users/${user.uid}`).update(data)
  }


   isLoggedIn() { 
    let loggedIn = this.persister.get("loggedIn");
    if (this.userDetails == null && loggedIn == null ) {    
      return false;
    } else {
      return true;
    }
  }

  logout() {
    this.userDetails = null;
    this.persister.set("loggedIn",null);
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
    // AuthProvider.Google,
    // facebookCustomConfig,
    // AuthProvider.Twitter,
    // AuthProvider.Github,
    //AuthProvider.Password,
    //AuthProvider.Phone,
  ],
  method: AuthMethods.Popup
  ,
  tos: '<your-tos-link>',
  credentialHelper: CredentialHelper.None,
 // signInSuccessUrl: "http://localhost:4200"
}
