import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: FirebaseDatabaseProvider, private toaster: ToastController) {
  }

  ionViewDidLoad() {
    this.user = this.navParams.get('user');
    this.booklist = this.navParams.get('booklist');

    this.db.getBooksById(this.booklist.bookIds).then(data => {
      let bookAux = [];
      data.forEach(unparsedBook =>{
        console.log(unparsedBook.id);
        let parsedBook = new Book(unparsedBook.data());
        parsedBook.id = unparsedBook.id;
        bookAux.push(parsedBook);
      });
      this.bookListBooks = bookAux;
    });
  }

  remove(book: Book){
    let index = this.user.bookLists.indexOf(this.booklist);
    this.bookListBooks.splice(this.bookListBooks.indexOf(book), 1);
    this.booklist.bookIds.splice(this.booklist.bookIds.indexOf(book.id), 1);
    this.user.bookLists[index] = this.booklist;
    this.db.setUserData(this.user.uid, this.user).then(_ => {
      let toast = this.toaster.create({
        message: 'Book removed from list.',
        position: 'bottom',
        duration: 1000,
      });
      toast.present()
    });
  }

}
