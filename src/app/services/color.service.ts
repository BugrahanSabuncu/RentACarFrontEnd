import { Injectable } from '@angular/core';
import { Color } from '../models/color';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponceModel } from '../models/listResponceModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl="https://localhost:44318/api/colors/getall";
  

  constructor(private httpclient:HttpClient) { }

  getColor():Observable<ListResponceModel<Color>>{
    return this.httpclient.get<ListResponceModel<Color>>(this.apiUrl);
  }
}
