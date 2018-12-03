import { Pipe, PipeTransform } from '@angular/core';
import {Category} from "../../models/Category";

/**
 * Generated class for the NamePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'namePipe',
})
export class NamePipe implements PipeTransform {
  transform(items: Category[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter( it => {
      return it.name.toLowerCase().includes(searchText);
    });
  }
}
