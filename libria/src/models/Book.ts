export class Book{
  id: string = "";
  title: string = "";
  categories: string[] = [];
  isFavourite: boolean = false;
  isRead: boolean = false;
  likes: number = 0;
  pages: number = 0;

  constructor(values: Object = {}){
    (<any>Object).assign(this, values);
  }
}
