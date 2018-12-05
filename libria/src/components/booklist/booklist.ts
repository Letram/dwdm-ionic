import {Component, EventEmitter, Input, Output} from '@angular/core';
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

  @Output() onBookAddedToFavourites: EventEmitter<string> = new EventEmitter();
  @Output() onBookRemovedFromFavourites: EventEmitter<string> = new EventEmitter();
  @Output() onLikeBook: EventEmitter<{}> = new EventEmitter();

  text: string = "Hello world";
  @Input() books: Book[];
  @Input() favs: string[];
  constructor() {
    console.log('Hello BooklistComponent Component');
  }

  ionViewDidLoad(){

  }

  onBookToFavourites(id: string) {
    this.onBookAddedToFavourites.emit(id);
  }

  onRemoveFromFavourites(id: string) {
    this.onBookRemovedFromFavourites.emit(id);
  }
  like(bookData){
    this.onLikeBook.emit(bookData);
  }
}
