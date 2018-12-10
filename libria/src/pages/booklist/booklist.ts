import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FirebaseDatabaseProvider} from "../../providers/firebase-database/firebase-database";
import {Book} from "../../models/Book";
import {User} from "../../models/User";

@IonicPage()
@Component({
  selector: 'page-booklist',
  templateUrl: 'booklist.html',
})
export class BooklistPage {

  bookListBooks: Book[] = [];
  user: User;
  booklist: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: FirebaseDatabaseProvider) {
  }

  ionViewDidLoad() {
    this.user = this.navParams.get('user');
    this.booklist = this.navParams.get('booklist');

    this.db.getBooksById(this.booklist.bookIds).then(data => {
      let bookAux = [];
      data.forEach(unparsedBook =>{
        let parsedBook = new Book(unparsedBook.data());
        bookAux.push(parsedBook);
      });
      this.bookListBooks = bookAux;
    });
  }

}
