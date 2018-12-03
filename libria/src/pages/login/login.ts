import {Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as $ from 'jquery';
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationProvider} from "../../providers/authentication/authentication";
import {TabsPage} from "../tabs/tabs";

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
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private authProvider: AuthenticationProvider) {
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
        this.authProvider.setUserData({email: data.user.email, id: data.user.uid});
        this.navCtrl.setRoot(TabsPage);
        this.navCtrl.popToRoot();
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
        this.authProvider.setUserData({email: data.user.email, id: data.user.uid});
        this.navCtrl.setRoot(TabsPage);
        this.navCtrl.popToRoot();
      }, () =>{
        alert("Existing email.");
      });
  }
}
