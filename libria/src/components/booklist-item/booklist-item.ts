import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Book} from "../../models/Book";
import {AuthenticationProvider} from "../../providers/authentication/authentication";

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
  @Input() favs: string[];
  @Output() onAddToFavourites: EventEmitter<string> = new EventEmitter();
  @Output() onRemoveFromFavourites: EventEmitter<string> = new EventEmitter();
  constructor() {
    console.log('Hello BooklistItemComponent Component');
    this.text = 'Hello World';
  }

  ionViewDidLoad(){
  }

  addToFavourites(id: string) {
    this.onAddToFavourites.emit(id);
  }

  removeFromFavourites(id: string) {
    this.onRemoveFromFavourites.emit(id);
  }
}
