import { Component } from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import {BookDetailsPage} from "../book-details/book-details";
import {Book} from "../../models/Book";
import {FirebaseDatabaseProvider} from "../../providers/firebase-database/firebase-database";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  books: Book[] = [];
  searchTitle: string = "";

  constructor(public navCtrl: NavController, public db: FirebaseDatabaseProvider, private loader: LoadingController) {

  }

  ionViewDidLoad(){
    let loader = this.loader.create({
      content: 'Retrieving data...',
      spinner: 'dots'
    });
    loader.present().then(()=>{
      this.db.getBooks().subscribe(result => {
        result.forEach(unparsedBook =>{
          let parsedBook = new Book(unparsedBook.payload.doc.data());
          parsedBook.id = unparsedBook.payload.doc.id;
          this.books.push(parsedBook);
        });
        console.log(this.books);
        loader.dismiss();
      });
    });
  }

  openDetails() {
    this.navCtrl.push(BookDetailsPage);
  }
}
