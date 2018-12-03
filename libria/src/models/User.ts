export class User{
  uid: string = "";
  username: string = "";
  email: string = "";
  favouriteBookIds: number[] = [];
  likedBookIds: number[] = [];

  constructor(values: Object = {}){
    (<any>Object).assign(this, values);
  }
}
