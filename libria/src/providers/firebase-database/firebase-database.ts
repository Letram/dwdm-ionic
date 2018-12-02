import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable()
export class FirebaseDatabaseProvider {

  constructor(public http: HttpClient, private db: AngularFirestore) {}

  getBooks(){
    return this.db.collection("Books").snapshotChanges();
  }
  getCategories(){
    return this.db.collection("Categories").snapshotChanges();
  }

}
