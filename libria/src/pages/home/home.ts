import { Component } from '@angular/core';
import {FabContainer, LoadingController, NavController, ToastController} from 'ionic-angular';
import {Book} from "../../models/Book";
import {FirebaseDatabaseProvider} from "../../providers/firebase-database/firebase-database";
import {AuthenticationProvider} from "../../providers/authentication/authentication";
import {ProfilePage} from "../profile/profile";
import {User} from "../../models/User";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  books: Book[] = [];
  searchTitle: string = "";
  currentUser: User;
  constructor(public navCtrl: NavController,
              public db: FirebaseDatabaseProvider,
              private loader: LoadingController,
              private afAuth: AuthenticationProvider,
              private toaster: ToastController) {

  }

  ionViewDidLoad(){
    let loader = this.loader.create({
      content: 'Retrieving data...',
      spinner: 'dots'
    });
    loader.present().then(()=>{
      this.db.getBooks().subscribe(result => {
        let bookAux = [];
        result.forEach(unparsedBook =>{
          let parsedBook = new Book(unparsedBook.payload.doc.data());
          parsedBook.id = unparsedBook.payload.doc.id;
          bookAux.push(parsedBook);
        });
        this.books = bookAux;
        loader.dismiss();
      });
    });
    this.currentUser = this.afAuth.getUserData();
  }

  addBookIdToFavourites(id: string) {
    this.currentUser = this.afAuth.getUserData();
    this.currentUser.favouriteBookIds.push(id);
    this.db.setUserData(this.currentUser.uid, this.currentUser).then(_ => {
      let toast = this.toaster.create({
        message: 'Book added to favourites',
        position: 'bottom',
        duration: 1000,
        cssClass: 'favToast'
      });
      toast.present()
    });
  }

  removeBookIdFromFavourites(id: string) {
    let currentUser = this.afAuth.getUserData();
    let index = currentUser.favouriteBookIds.indexOf(id);
    currentUser.favouriteBookIds.splice(index,1);
    this.db.setUserData(currentUser.uid, currentUser).then(_ => {
      let toast = this.toaster.create({
        message: 'Book removed from favourites',
        position: 'bottom',
        duration: 1000,
        cssClass: 'unfavToast'
      });
      toast.present()
    });
  }

  like(bookData) {
    let currentUser = this.afAuth.getUserData();
    if(currentUser.likedBookIds.indexOf(bookData.id) !== -1) return;
    currentUser.likedBookIds.push(bookData.id);
    this.db.setUserDataAndLike(currentUser.uid, currentUser, bookData).then(_ => {
      let toast = this.toaster.create({
        message: 'Liked book.',
        position: 'bottom',
        duration: 1000,
      });
      toast.present()
    });
  }

  unlike(bookData) {
    let currentUser = this.afAuth.getUserData();
    let index = currentUser.likedBookIds.indexOf(bookData.id);
    if(index === -1)return;
    currentUser.likedBookIds.splice(index,1);
    this.db.setUserDataAndLike(currentUser.uid, currentUser, bookData).then(_ => {
      let toast = this.toaster.create({
        message: 'Unliked book.',
        position: 'bottom',
        duration: 1000,
      });
      toast.present()
    });
  }

  openProfile(fab: FabContainer) {
    this.navCtrl.push(ProfilePage, {user: this.currentUser, books: this.books});
    fab.close();
  }

  updateUser(userData: any) {
    this.db.setUserData(userData.uid, userData.user);
  }

  signOut(fab: FabContainer) {
    fab.close();
    this.afAuth.signout();
    this.navCtrl.setRoot(LoginPage);
    this.navCtrl.popToRoot();
  }
}
