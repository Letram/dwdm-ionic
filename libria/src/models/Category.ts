export class Category{
  id: string = "";
  name: string = "";
  bookNum: number = 0;

  constructor(values: Object = {}){
    (<any>Object).assign(this, values);
  }
}
