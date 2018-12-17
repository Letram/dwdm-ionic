import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {ChartsPage} from "../charts/charts";
import {ProfilePage} from "../profile/profile";
import {LoginPage} from "../login/login";
import{Events} from "ionic-angular";

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  homePage = HomePage;
  chartsPage = ChartsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, private events: Events) {
    this.events.subscribe("user:logout", () => {
      this.navCtrl.setRoot(LoginPage);
      this.navCtrl.popToRoot();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }
}


