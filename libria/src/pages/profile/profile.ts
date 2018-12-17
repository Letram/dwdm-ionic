import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {User} from "../../models/User";
import {Book} from "../../models/Book";
import {FirebaseDatabaseProvider} from "../../providers/firebase-database/firebase-database";
import {BooklistPage} from "../booklist/booklist";
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: User = new User();
  favs: Book[] = [];
  liked: Book[] = [];
  readonly: boolean = true;
  bookmarks: any[] = [];
  newBookmark = {
    uid: '',
    title: '',
    page: ''
  };
  addBookmarkForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, private db: FirebaseDatabaseProvider, private alertCtrl: AlertController, private sqlite: SQLite, public formBuilder: FormBuilder) {
    this.addBookmarkForm = formBuilder.group({
      title: ['', Validators.required],
      page: ['', Validators.required],
      uid: ['', Validators.required]
    })
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

  removeFromBooklist(booklist: any) {
    console.log(this.user.bookLists.indexOf(booklist));
    this.user.bookLists.splice(this.user.bookLists.indexOf(booklist), 1);
    this.db.setUserData(this.user.uid, this.user).then(_ => console.log("Actualizado."));
  }

  openBooklist(user: User, booklist: any) {
    this.navCtrl.push(BooklistPage, {user, booklist});
  }

  private getBookmarks(uid: string) {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) =>{
      db.executeSql('CREATE TABLE IF NOT EXISTS ' +
        'Bookmarks(id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
        'uid TEXT, BookTitle TEXT, Page integer ')
        .then(res => console.log('Executed SQL creation'))
        .catch(e => {
          console.log(e);
          console.log("cvhungo");
        });
      db.executeSql('SELECT * FROM BookMarks WHERE uid=? ORDER BY id DESC', [uid])
        .then(res => {
          this.bookmarks = [];
          for (var i = 0; i < res.rows.length; i++) {
            this.bookmarks.push({
              id: res.rows.item(i).id,
              uid: res.rows.item(i).uid,
              title: res.rows.item(i).BookTitle,
              page: res.rows.item(i).Page
            });
          }
        });
    });
  }

  addBookmark() {
    this.newBookmark.uid = this.addBookmarkForm.controls.uid.value;
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO Bookmarks (uid, BookTitle, Page), VALUES (?,?,?)',
        [this.newBookmark.uid, this.newBookmark.title, this.newBookmark.page]).then(() => {
          this.getBookmarks(this.newBookmark.uid);
      });
    });
  }
  removeBookmark(id: string){
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM Bookmarks WHERE id=?',
        [id]).then(() => {
        this.getBookmarks(this.user.uid);
      });
    });
  }
}
