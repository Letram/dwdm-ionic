import {Component, Input} from '@angular/core';
import {Book} from "../../models/Book";

/**
 * Generated class for the BooklistComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'booklist',
  templateUrl: 'booklist.html'
})
export class BooklistComponent {

  text: string = "Hello world";
  @Input() books: Book[];
  constructor() {
    console.log('Hello BooklistComponent Component');
  }

  ionViewDidLoad(){

  }
}
