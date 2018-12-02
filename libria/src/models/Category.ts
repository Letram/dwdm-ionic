export class Category{
  title: string = "";
  bookNum: number = 0;

  constructor(values: Object = {}){
    (<any>Object).assign(this, values);
  }
}
