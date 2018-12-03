import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpClientModule} from '@angular/common/http'

//pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {ProfilePage} from "../pages/profile/profile";
import {BookDetailsPage} from "../pages/book-details/book-details";
import {BooklistPage} from "../pages/booklist/booklist";
import {TabsPage} from "../pages/tabs/tabs";
import {ChartsPage} from "../pages/charts/charts";
//modules
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { FirebaseDatabaseProvider } from '../providers/firebase-database/firebase-database';

//custom components
import {ComponentsModule} from "../components/components.module";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ProfilePage,
    BooklistPage,
    BookDetailsPage,
    TabsPage,
    ChartsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ProfilePage,
    BookDetailsPage,
    BooklistPage,
    TabsPage,
    ChartsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpClientModule,
    AuthenticationProvider,
    FirebaseDatabaseProvider
  ]
})
export class AppModule {}
