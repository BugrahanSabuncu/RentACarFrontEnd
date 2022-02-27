import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarImage } from '../models/carImage';
import { Observable } from 'rxjs';
import { ListResponceModel } from '../models/listResponceModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
  
  apiUrl="https://localhost:44318/api/CarImages";

  constructor(private httpClient:HttpClient) { }

  getImages(carId:number):Observable<ListResponceModel<CarImage>>{
    let newPath=this.apiUrl+"/getbycarid?carId="+carId;
    return this.httpClient.get<ListResponceModel<CarImage>>(newPath) 
  }
  getAllImages():Observable<ListResponceModel<CarImage>>{
    let newPath=this.apiUrl+"/getall";
    return this.httpClient.get<ListResponceModel<CarImage>>(newPath) 
  }
  

  

}
