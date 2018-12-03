import {Component, Input} from "@angular/core";
import {Book} from "../../models/Book";

/**
 * Generated class for the BooklistItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'booklist-item',
  templateUrl: 'booklist-item.html'
})
export class BooklistItemComponent {

  text: string;
  @Input() book: Book;
  constructor() {
    console.log('Hello BooklistItemComponent Component');
    this.text = 'Hello World';
  }

  ionViewDidLoad(){

  }
}
