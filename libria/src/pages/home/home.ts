import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ProfilePage} from "../profile/profile";
import {BookDetailsPage} from "../book-details/book-details";
import {Book} from "../../models/Book";
import {FirebaseDatabaseProvider} from "../../providers/firebase-database/firebase-database";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  books: Book[] = [];
  constructor(public navCtrl: NavController, public db: FirebaseDatabaseProvider) {

  }

  ionViewDidLoad(){
    this.db.getBooks().subscribe(result => console.log(result));
  }

  openProfile() {
    this.navCtrl.push(ProfilePage);
  }

  openDetails() {
    this.navCtrl.push(BookDetailsPage);
  }
}
