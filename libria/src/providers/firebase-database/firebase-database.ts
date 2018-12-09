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
    return this.db.collection("UsersData").doc(uid).set(Object.assign({}, loggedUser));
  }

  async setUserDataAndLike(uid: string, currentUser: User, bookData) {
    let user = this.setUserData(uid, currentUser);
    let data = this.updateBook(bookData);

    return Promise.all([user,data]);
  }
  updateBook(bookData: any) {
    let index = bookData.id;
    delete bookData.id;
    return this.db.collection("Books").doc(index).update(bookData);
  }

  async getBooksById(likedBookIds: string[]) {
    let res:Array<any> = [];
    for (let i = 0; i <likedBookIds.length; i++) {
      res[i] = await this.db.collection('Books').doc(likedBookIds[i]).get().toPromise();
    }
    return Promise.all(res);
  }
}
