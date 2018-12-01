import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ProfilePage} from "../profile/profile";
import {BookDetailsPage} from "../book-details/book-details";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController) {

  }


  openProfile() {
    this.navCtrl.push(ProfilePage);
  }

  openDetails() {
    this.navCtrl.push(BookDetailsPage);
  }
}
