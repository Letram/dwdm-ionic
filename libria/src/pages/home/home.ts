import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ProfilePage} from "../profile/profile";
import {BookDetailsPage} from "../book-details/book-details";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  numbers = [1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0];
  constructor(public navCtrl: NavController) {

  }


  openProfile() {
    this.navCtrl.push(ProfilePage);
  }

  openDetails() {
    this.navCtrl.push(BookDetailsPage);
  }
}
