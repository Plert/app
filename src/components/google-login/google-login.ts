import { Component } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

import { GooglePlus } from '@ionic-native/google-plus';
import { Platform } from 'ionic-angular';
import { AuthCredential } from '@firebase/auth-types';
/**
 * Generated class for the GoogleLoginComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'google-login',
  templateUrl: 'google-login.html'
})
export class GoogleLoginComponent {

  user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, 
              private gplus: GooglePlus,
              private platform: Platform) {

    // this.user = this.afAuth.authState;

  }

  async nativeGoogleLogin(): Promise<void> {
      try {
    
        const gplusUser = await this.gplus.login({
          'webClientId': '666373632384-ot9qp8mkigclnslp158s46hl23h18bd3.apps.googleusercontent.com',
          'offline': true,
          'scopes': 'profile email'
        })
    
        return await this.afAuth.auth.signInWithCredential(
          firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
        )
    
      } catch(err) {
        console.log(err)
      }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);
  
    } catch(err) {
      console.log(err)
    }
  
  }

  googleLogin() {
    console.log("Checking Platform");
    // if (this.platform.is('cordova')) {
    //   console.log("Native");
    //   this.nativeGoogleLogin();
    // } else {
    //   console.log("Web")
    //   this.webGoogleLogin();
    // }
  }
  
  signOut() {
    this.afAuth.auth.signOut();
  }
}
