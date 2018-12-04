export class User{
  uid: string = "";
  username: string = "";
  email: string = "";
  favouriteBookIds: string[] = [];
  likedBookIds: string[] = [];

  constructor(values: Object = {}){
    (<any>Object).assign(this, values);
  }
}
