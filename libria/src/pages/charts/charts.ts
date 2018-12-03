import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Category} from "../../models/Category";
import {FirebaseDatabaseProvider} from "../../providers/firebase-database/firebase-database";

@IonicPage()
@Component({
  selector: 'page-charts',
  templateUrl: 'charts.html',
})
export class ChartsPage {
  categories: Category[] = [];
  bookCount: number = 1;
  searchName: string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, private db: FirebaseDatabaseProvider, private loader: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChartsPage');

    let loader = this.loader.create({
      content: 'Retrieving data...',
      spinner: 'dots'
    });
    loader.present().then(()=>{
      this.db.getCategories().subscribe(result =>{
        result.forEach(unparsedCategory=>{
          let parsedCategory = new Category(unparsedCategory.payload.doc.data());
          parsedCategory.id = unparsedCategory.payload.doc.id;
          this.categories.push(parsedCategory);
        });
      });
      this.db.getBooks().subscribe(result => {
        this.bookCount = result.length;
        loader.dismiss();
      });
    });
  }

}
