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

  @Input() book: Book;
  @Input() favs: string[];
  @Input() liked: string[];

  @Output() onAddToFavourites: EventEmitter<string> = new EventEmitter();
  @Output() onRemoveFromFavourites: EventEmitter<string> = new EventEmitter();
  @Output() onLikeBook: EventEmitter<{}> = new EventEmitter();
  @Output() onUnlikeBook: EventEmitter<{}> = new EventEmitter();
  constructor() {}

  ionViewDidLoad(){
  }

  addToFavourites(id: string) {
    this.onAddToFavourites.emit(id);
  }

  removeFromFavourites(id: string) {
    this.onRemoveFromFavourites.emit(id);
  }

  like(id: string, likes: number) {
    this.onLikeBook.emit({id:id,numOfLikes:likes});
  }
  unlike(id: string, likes: number) {
    this.onUnlikeBook.emit({id:id,numOfLikes:likes});
  }
}
