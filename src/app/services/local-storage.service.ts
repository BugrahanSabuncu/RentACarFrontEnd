import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  getItem(key:string){
    return localStorage.getItem(key)
  }
  add(key:string,value:string){
    localStorage.setItem(key,value)
  }
  remove(key:string){
    localStorage.removeItem(key)
  }
}
