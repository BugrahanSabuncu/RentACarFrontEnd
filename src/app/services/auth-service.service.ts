import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/token';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url="https://localhost:44318/api/Auth";

  constructor(private httpClient:HttpClient) { }

  register(registerModel:RegisterModel):Observable<SingleResponseModel<TokenModel>>{
    let path=this.url+"/register";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(path,registerModel);
  }
  login(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    let path=this.url+"/login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(path,loginModel);
  }
  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    }
    else{
      return false;
    }
  }
}
