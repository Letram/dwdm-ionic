import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {User} from "../../models/User";
import {Book} from "../../models/Book";
import {FirebaseDatabaseProvider} from "../../providers/firebase-database/firebase-database";
import {BooklistPage} from "../booklist/booklist";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: User = new User();
  favs: Book[] = [];
  liked: Book[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private db: FirebaseDatabaseProvider, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.user = this.navParams.get('user');
    this.db.getBooksById(this.user.likedBookIds).then(likedBooks => {

      let bookAux = [];
      likedBooks.forEach(unparsedBook =>{
        let parsedBook = new Book(unparsedBook.data());
        bookAux.push(parsedBook);

      });
      this.liked = bookAux;

    });
    this.db.getBooksById(this.user.favouriteBookIds).then(favBooks=> {
      let bookAux = [];
      favBooks.forEach(unparsedBook =>{
        let parsedBook = new Book(unparsedBook.data());
        bookAux.push(parsedBook);
      });
      this.favs = bookAux;
    });
  }

  openBooklistAlert() {
    let alert = this.alertCtrl.create({
      title: 'Add Booklist',
      inputs: [
        {
          name: 'title',
          placeholder: 'Title...'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: _ => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log(data);
            let bookListAux = {
              title: data.title,
              bookIds: []
            };
            this.user.bookLists.push(bookListAux);
            this.db.setUserData(this.user.uid, this.user);
          }
        }
      ]
    });
    alert.present();
  }
}
