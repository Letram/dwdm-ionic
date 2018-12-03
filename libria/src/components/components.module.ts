import { NgModule } from '@angular/core';
import { BrowserModule} from "@angular/platform-browser";
import { BooklistComponent } from './booklist/booklist';
import { BooklistItemComponent } from './booklist-item/booklist-item';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [BooklistComponent,
    BooklistItemComponent],
	imports: [
	  BrowserModule,
    IonicModule],
	exports: [BooklistComponent,
    BooklistItemComponent]
})
export class ComponentsModule {}
