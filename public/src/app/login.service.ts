import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) { }

  register(obj){
    console.log("here is our registration info", obj);
    return this._http.post('/register', obj);
  }

  login(obj){
    console.log("here is our login info", obj)
    return this._http.post('/logged', obj)
  }

  logout(){
    return this._http.get('/logout')
  }
  admin(){
    console.log("YEEEEEEEEERRRRRRRRR")
    return this._http.get('/logged')
  }

}
