import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";

@Injectable()
export class LocalDatabaseProvider {

  db: SQLiteObject = null;
  constructor(public http: HttpClient, private sqlite: SQLite) {
  }

  setDatabase(db: SQLiteObject){
    if(this.db === null)
      this.db = db;
    console.log('DB: ', this.db);
  }

  public execute(sql: string, params: any[]){
    return this.db.executeSql(sql, params)
      .then(res => {
        return Promise.resolve(res);
      })
      .catch(e => console.log('Error en el provider: ', e));
  }

  getDatabase(){
    return this.db;
  }
}
