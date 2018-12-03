export class Book{
  id: string = "";
  title: string = "";
  categories: string[] = [];
  isFavourite: boolean = false;
  isRead: boolean = false;
  numOfLikes: number = 0;
  numOfPages: number = 0;

  constructor(values: Object = {}){
    (<any>Object).assign(this, values);
  }
}
