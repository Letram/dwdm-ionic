import {Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as $ from 'jquery';
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationProvider} from "../../providers/authentication/authentication";
import {TabsPage} from "../tabs/tabs";
import {User} from "../../models/User";
import {FirebaseDatabaseProvider} from "../../providers/firebase-database/firebase-database";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user:any = {
    username: "",
    password: ""
  };
  loginForm: FormGroup;
  signupForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private formBuilder: FormBuilder,
              private authProvider: AuthenticationProvider,
              private db: FirebaseDatabaseProvider) {
    this.loginForm = this.generateLoginForm();
    this.signupForm = this.generateSignupForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    console.log(this.loginForm);
    this.authProvider.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
      .then((data) => {
        let loggedUser = new User();
        loggedUser.email = data.user.email;
        loggedUser.uid = data.user.uid;
        this.db.getUserDataFromDB(loggedUser.uid).subscribe((result) => {
          loggedUser.favouriteBookIds = result.data().favouriteBookIds;
          loggedUser.likedBookIds = result.data().likedBookIds;
          loggedUser.username = result.data().username;
          loggedUser.bookLists = result.data().bookLists;
          this.authProvider.setUserData(loggedUser);
          this.navCtrl.setRoot(TabsPage);
          this.navCtrl.popToRoot();
        });
      },() =>{
        alert("Incorrect password or email.")
      });
  }

  toggleDisplay() {
    $('.login, .register').toggle();

  }

  private generateLoginForm() {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  private generateSignupForm() {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', [Validators.required]]
    });
  }

  signup() {
    this.authProvider.signup(this.signupForm.controls.email.value, this.signupForm.controls.password.value)
      .then((data) => {
        let loggedUser = new User({
          email: this.signupForm.controls.email.value,
          username: this.signupForm.controls.username.value,
          uid: data.user.uid,
          likedBookIds: [],
          favouriteBookIds:[]
        });
        this.db.setUserData(loggedUser.uid, loggedUser).then(_ => {
          this.authProvider.setUserData(loggedUser);
          this.navCtrl.setRoot(TabsPage);
          this.navCtrl.popToRoot();
        });
      }, () =>{
        alert("Existing email.");
      });
  }
}
