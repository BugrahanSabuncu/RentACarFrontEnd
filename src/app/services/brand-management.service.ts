import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandManagementService {
  apiUrl='https://localhost:44318/api';

  constructor(private httpClient:HttpClient) { }
  

  brandAdd(brand:Brand):Observable<ResponseModel>{
    let newPath=this.apiUrl+"/Brands/add"
    return this.httpClient.post<ResponseModel>(newPath,brand)
  }
}
