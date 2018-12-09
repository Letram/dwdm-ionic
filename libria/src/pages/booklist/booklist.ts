import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FirebaseDatabaseProvider} from "../../providers/firebase-database/firebase-database";
import {Book} from "../../models/Book";

/**
 * Generated class for the BooklistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booklist',
  templateUrl: 'booklist.html',
})
export class BooklistPage {

  bookListBooks: Book[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private db: FirebaseDatabaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BooklistPage');
    this.db.getBooksById(this.navParams.get('books')).then(data => {
      let bookAux = [];
      data.forEach(unparsedBook =>{
        let parsedBook = new Book(unparsedBook.data());
        bookAux.push(parsedBook);
      });
      this.bookListBooks = bookAux;
    });
  }

}
