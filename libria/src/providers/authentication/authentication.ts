import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {User} from "../../models/User";

@Injectable()
export class AuthenticationProvider {
  loggedUser: User = new User();
  constructor(public http: HttpClient, private afAuth: AngularFireAuth) {
  }

  login(email,password){
    return this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(email, password);
  }
  signup(email,password){
    return this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(email,password);
  }
  getUserData(){
    return this.loggedUser;
  }
  setUserData(userData){
    this.loggedUser = userData;
    console.log(userData);
  }

  signout() {
    return this.afAuth.auth.signOut().then(_ => {
      this.loggedUser = new User();
    })
  }
}
