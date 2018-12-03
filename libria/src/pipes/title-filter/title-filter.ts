import { Pipe, PipeTransform } from '@angular/core';
import {Book} from "../../models/Book";

/**
 * Generated class for the TitleFilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'titleFilter',
})
export class TitleFilterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: Book[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter( it => {
      return it.title.toLowerCase().includes(searchText);
    });
  }

}
