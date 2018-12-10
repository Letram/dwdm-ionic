import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Book} from "../../models/Book";
import {AuthenticationProvider} from "../../providers/authentication/authentication";
import {ActionSheetController, AlertController} from "ionic-angular";

@Component({
  selector: 'booklist-item',
  templateUrl: 'booklist-item.html'
})
export class BooklistItemComponent {

  @Input() book: Book;
  @Input() favs: string[];
  @Input() liked: string[];
  @Input() user: any;

  @Output() onAddToFavourites: EventEmitter<string> = new EventEmitter();
  @Output() onRemoveFromFavourites: EventEmitter<string> = new EventEmitter();
  @Output() onLikeBook: EventEmitter<{}> = new EventEmitter();
  @Output() onUnlikeBook: EventEmitter<{}> = new EventEmitter();
  @Output() onUserUpdate: EventEmitter<{}> = new EventEmitter();

  constructor(private afAuth: AuthenticationProvider, private actionSheetCtrl: ActionSheetController, private alertCtrl: AlertController) {}

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

  openActionSheet(book: Book) {
    let actionSheetBtns=[];
    for(let i = 0; i < this.user.bookLists.length; i++){
      if(this.user.bookLists[i].bookIds.indexOf(book.id) !== -1)continue;
      actionSheetBtns.push({
        text:this.user.bookLists[i].title,
        handler: () => {
          this.user.bookLists[i].bookIds.push(book.id);
          this.onUserUpdate.emit({uid: this.user.uid, user:this.user});
          let alert = this.alertCtrl.create({
            title: 'New book in '+this.user.bookLists[i].title,
            subTitle: '\"' + book.title + '\" added to ' + this.user.bookLists[i].title + "!",
            buttons: ['Ok!']
          });
          alert.present();
        }
      });
    }
    if(actionSheetBtns.length === 0)
      this.alertCtrl.create(
        {title:"Oops! Something went wrong...",
          subTitle: "Wow, it seems that your book is in all of your lists. Maybe try to add another one or create a new list"
        }).present();
    else{
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Select a booklist',
        buttons: actionSheetBtns
      });

      actionSheet.present();
    }
  }
}
