import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {User} from "../../models/User";

@Injectable()
export class FirebaseDatabaseProvider {

  constructor(public http: HttpClient, private db: AngularFirestore) {}

  getBooks(){
    return this.db.collection("Books", bookref => bookref.orderBy("title")).snapshotChanges();
  }
  getCategories(){
    return this.db.collection("Categories", categoryref => categoryref.orderBy('name')).snapshotChanges();
  }

  getUserDataFromDB(uid: string) {
    return this.db.collection("UsersData").doc(uid).get();
  }

  setUserData(uid: string, loggedUser: User) {
    return this.db.collection("UsersData").doc(uid).set({...loggedUser});
  }
}
