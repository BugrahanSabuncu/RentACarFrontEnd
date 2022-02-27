import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ListResponceModel } from '../models/listResponceModel';
import { CartItems } from '../models/CartItems';
import { ToastrService } from 'ngx-toastr';
import { Rent } from '../models/rent';
import { SingleResponseModel } from '../models/singleResponseModel';
import { CreditCard } from '../models/creditCard';
//import { url } from 'inspector';
import { ResponseModel } from '../models/responseModel';
import { Rental } from '../models/rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl="https://localhost:44318/api";


  constructor(private httpClient:HttpClient,private toastrService:ToastrService) { }

  getRental():Observable<ListResponceModel<Rental>>{
    let newPath=this.apiUrl+"/Rentals/getdetails"
    return this.httpClient.get<ListResponceModel<Rental>>(newPath);
  }
  addRental(rent:Rent):Observable<SingleResponseModel<Rent>>{
    let newPath=this.apiUrl+"/Rentals/add";
    return this.httpClient.post<SingleResponseModel<Rent>>(newPath,rent)
    
  }
  getLastRental(carId:number):Observable<SingleResponseModel<Rent>>{
    let newPath=this.apiUrl+"/Rentals/getLastDateRental?carId="+carId;
    return this.httpClient.get<SingleResponseModel<Rent>>(newPath);
  }
  addToCart(rentItem:Rent){
    let rentCar=CartItems.find(r => r.carId == rentItem.carId)    
    if(rentCar){
      this.toastrService.error("Ürün zaten eklendi");
      console.log(rentCar.carId)
    }
    else{      
      let rent=new Rent()      
      rent.carId=rentItem.carId
      rent.userId=rentItem.userId
      rent.rentalDate=rentItem.rentalDate
      rent.returnDate=rentItem.returnDate
      CartItems.push(rent);
      this.toastrService.info("Araç sepete eklendi.")
    }

  }
  clearCart(){
    while (CartItems.length > 0) {
      CartItems.pop();      
    }
  }
  getAllCart(){
    return CartItems
  }
  checkPaymentInfo(creditCard:CreditCard):Observable<ResponseModel>{
    let newPath = this.apiUrl + "/Payment/payValidation";
    return this.httpClient.post<ResponseModel>(newPath,creditCard);    
}
}