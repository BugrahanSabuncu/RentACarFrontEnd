import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponceModel } from '../models/listResponceModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarFilterService {
  apiUrl="https://localhost:44318/api/Cars";
  newPath="";

  constructor(private httpClient:HttpClient) { }

  getFilters(brandId:number,colorId:number):Observable<ListResponceModel<Car>>{
    if(brandId!=undefined && colorId!=undefined){
      this.newPath=this.apiUrl+"/getfilters?brandId="+brandId+"&colorId="+colorId
    }else if(colorId!=undefined){
      this.newPath=this.apiUrl+"/getfilters?colorId="+colorId
    }
    else if(brandId!=undefined){
      this.newPath=this.apiUrl+"/getfilters?brandId="+brandId
    }
    return this.httpClient.get<ListResponceModel<Car>>(this.newPath)
  }
  }

