import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";

@Injectable()
export class AuthenticationProvider {
  userData = {
    email: "",
    id: ""
  };
  constructor(public http: HttpClient, private afAuth: AngularFireAuth) {
    console.log('Hello AuthenticationProvider Provider');
  }

  login(email,password){
    return this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(email, password);
  }
  signup(email,password){
    return this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(email,password);
  }
  getUserData(){
    return this.userData;
  }
  setUserData(userData){
    this.userData = userData;
  }
}
