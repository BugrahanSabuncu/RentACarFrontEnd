import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/token';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url="https://localhost:44318/api/Auth";

  loggedIn=new BehaviorSubject<boolean>(false);
  //userInformations=new BehaviorSubject<LoginModel>(null);

  public get loginStatus(){
    return this.loggedIn.asObservable();
  }

  
  public get isLoggedIn(){
    return this.loggedIn.getValue();
  }

  public set isLoggedIn(status:boolean){
    this.loggedIn.next(status);
  }

  
  constructor(private httpClient:HttpClient,
    private localStrogeService:LocalStorageService,
    private jwtHelperService:JwtHelperService) { }

    private getToken(): string | null{
      return this.localStrogeService.getItem("token")
    }

    private isTokenExpired():boolean{
      let token=this.getToken();
      if(token!=null){
        return !this.jwtHelperService.isTokenExpired(token)
      }
      return false;
    }

    logout(){
      this.localStrogeService.remove("token");
      this.loggedIn.next(false)
    }

  register(registerModel:RegisterModel):Observable<SingleResponseModel<TokenModel>>{
    let path=this.url+"/register";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(path,registerModel);
  }

  login(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    let path=this.url+"/login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(path,loginModel);
  }
  
  getUser(): User | undefined{
    let token=this.getToken();
    if(token != null){
      let tokenDetails=Object.entries(this.jwtHelperService.decodeToken(token))
      let user:User=new User();
      tokenDetails.forEach(detail => {
        switch(detail[0]){
          case "email":{
            user.email=String(detail[1]);
            break;
          }
          case "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name":{
            user.name=String(detail[1]);
            break;
          }
          case "http://schemas.microsoft.com/ws/2008/06/identity/claims/role":{
            user.roles= detail[1] as Array<string>
            break;
          }
          case "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier":{
            user.id=Number(detail[1]);
            break;
          }
        }

      });
      if(!user.roles){
        user.roles=[]
      }
      return user;
    }
    return undefined;
  }
}
