import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponceModel } from '../models/listResponceModel';
import { Brand } from '../models/brand';
import { Car } from '../models/car';


@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl="https://localhost:44318/api";

  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponceModel<Brand>>{
    let newPath=this.apiUrl+"/Brands/getall";
    return this.httpClient.get<ListResponceModel<Brand>>(newPath);  
  }  
}
