import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import {SQLite} from "@ionic-native/sqlite";
import {LocalDatabaseProvider} from "../providers/local-database/local-database";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              public sqlite: SQLite,
              public localDb: LocalDatabaseProvider) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.createDatabase();
    });
  }

  private createDatabase(){
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then(res => {
      console.log('Data: ', res);
      this.localDb.setDatabase(res);
    }).catch(e => console.log('Error en el appcomponent: ', e));
  }
}

