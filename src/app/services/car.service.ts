import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponceModel } from '../models/listResponceModel';


@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44318/api';
  constructor(private httpClient: HttpClient) {}

  getCars():Observable<ListResponceModel<Car>> {
    let newPath=this.apiUrl+"/Cars/getcars";
    return this.httpClient.get<ListResponceModel<Car>>(newPath);
  }
  getCarsByBrand(brandId:number):Observable<ListResponceModel<Car>>{
    let newPath=this.apiUrl+"/Cars/getbybrandid?brandId="+brandId
    return this.httpClient.get<ListResponceModel<Car>>(newPath);
  }
  getCarsByColor(colorId:number):Observable<ListResponceModel<Car>>{
    let newPath=this.apiUrl+"/Cars/getbycolorid?colorId="+colorId    
    return this.httpClient.get<ListResponceModel<Car>>(newPath);
  }
 
}
