export class User{
  uid: string = "";
  username: string = "";
  email: string = "";
  favouriteBookIds: string[] = [];
  likedBookIds: string[] = [];
  bookLists: Array<any> = [];
  constructor(values: Object = {}){
    (<any>Object).assign(this, values);
  }
}
