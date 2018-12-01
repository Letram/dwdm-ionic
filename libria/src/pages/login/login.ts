import {Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import * as $ from 'jquery';
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationProvider} from "../../providers/authentication/authentication";

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
        console.log(data.user);
        this.navCtrl.setRoot(HomePage);
        this.navCtrl.popToRoot();
      },() =>{
        console.log("Usuario no encontrado");
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
      passwordRep: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  signup() {
    this.authProvider.signup(this.signupForm.controls.email.value, this.signupForm.controls.password.value)
      .then((data) => {
        console.log(data.user);
        this.navCtrl.setRoot(HomePage);
        this.navCtrl.popToRoot();
      }, () =>{
        console.log("Usuario no encontrado");
      });
  }
}
