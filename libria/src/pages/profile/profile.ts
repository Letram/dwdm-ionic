import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {User} from "../../models/User";
import {Book} from "../../models/Book";
import {FirebaseDatabaseProvider} from "../../providers/firebase-database/firebase-database";
import {BooklistPage} from "../booklist/booklist";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LocalDatabaseProvider} from "../../providers/local-database/local-database";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: User = new User();
  favs: Book[] = [];
  liked: Book[] = [];
  bookmarks: any[] = [];
  newBookmark = {
    uid: '',
    title: '',
    page: ''
  };
  addBookmarkForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, private db: FirebaseDatabaseProvider, private alertCtrl: AlertController, private localdb: LocalDatabaseProvider, public formBuilder: FormBuilder) {
    this.addBookmarkForm = formBuilder.group({
      title: ['', Validators.required],
      page: ['', Validators.required],
      uid: ['', Validators.required]
    });
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
    this.getBookmarks(this.user.uid);
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
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
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

  removeFromBooklist(booklist: any) {
    this.user.bookLists.splice(this.user.bookLists.indexOf(booklist), 1);
    this.db.setUserData(this.user.uid, this.user).then(_ => console.log("Actualizado."));
  }

  openBooklist(user: User, booklist: any) {
    this.navCtrl.push(BooklistPage, {user, booklist});
  }

  getBookmarks(uid: string) {
    this.localdb.execute('CREATE TABLE IF NOT EXISTS Bookmarks(id INTEGER PRIMARY KEY AUTOINCREMENT, uid TEXT, BookTitle TEXT, Page integer)', [])
      .then(() => {
        this.localdb.execute('SELECT * FROM Bookmarks WHERE uid=?', [uid])
          .then(unparsedBookMarks => {
            this.bookmarks = [];
            for (var i = 0; i < unparsedBookMarks.rows.length; i++) {
              this.bookmarks.push({
                id: unparsedBookMarks.rows.item(i).id,
                uid: unparsedBookMarks.rows.item(i).uid,
                title: unparsedBookMarks.rows.item(i).BookTitle,
                page: unparsedBookMarks.rows.item(i).Page
              });
            }
          })
          .catch(e => console.log('Error en el Select: ', e));
      })
      .catch(e => console.log('Error en el Create: ', e));
  }

  addBookmark() {
    this.newBookmark.uid = this.addBookmarkForm.controls.uid.value;
    this.localdb.execute('INSERT INTO Bookmarks (uid, BookTitle, Page) VALUES (?,?,?)', [this.newBookmark.uid, this.newBookmark.title, this.newBookmark.page])
      .then(() => this.getBookmarks(this.newBookmark.uid))
      .catch(e => console.log('Error en el Insert: ', e));
  }
}
