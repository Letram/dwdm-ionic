import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from "../../models/Book";

@Component({
  selector: 'booklist',
  templateUrl: 'booklist.html'
})
export class BooklistComponent {

  @Output() onBookAddedToFavourites: EventEmitter<string> = new EventEmitter();
  @Output() onBookRemovedFromFavourites: EventEmitter<string> = new EventEmitter();
  @Output() onLikeBook: EventEmitter<{}> = new EventEmitter();
  @Output() onUnlikeBook: EventEmitter<{}> = new EventEmitter();
  @Output() onUserUpdate: EventEmitter<{}> = new EventEmitter();

  @Input() books: Book[];
  @Input() favs: string[];
  @Input() liked: string[];
  @Input() user: any;

  constructor() {}

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

  unlike(bookData) {
    this.onUnlikeBook.emit(bookData);
  }

  userUpdate(userData){
    this.onUserUpdate.emit(userData);
  }
}
