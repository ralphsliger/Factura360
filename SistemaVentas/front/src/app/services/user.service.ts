import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { GLOBAL } from './GLOBAL';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url;
  public user;
  public token;
  public identity; // identificador usuario que esta logeado 

  constructor(
    private _http: HttpClient,
    ) {
    this.url = GLOBAL.url;
    this.user = new User('','','','','');
   }

   login(user, getToken = null):Observable<any> {
     let json = user;
     if(getToken != null){
      user.getToken = true;    
     }

     let headers = new HttpHeaders().set('Content-Type','application/json');
     return this._http.post(this.url + '/login', json,{headers: headers});
   }

   getToken(){

   }

   getIdentity(){

   }
}
