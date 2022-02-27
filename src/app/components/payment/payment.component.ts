import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/creditCard';
import { Rent } from 'src/app/models/rent';
import { ResponseModel } from 'src/app/models/responseModel';

import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  rentPrice:number;
  rent:Rent=null;
  private carId: number;
  paymentResult:ResponseModel;


  creditCard: CreditCard = {
    CardNumber: "",
    ExpireYear: "",
    ExpireMonth: "",
    Cvc: "",
    CardHolderFullName: ""
  };

  cardHolder: string = "";
  cardNumber: string = "";
  expireDate: string = "";
  cvc: string = "";

  constructor(private toastrService:ToastrService,private rentalService:RentalService) { }

  ngOnInit(): void {
    
  }
  fillCreditCard(){
    this.creditCard.CardNumber=this.cardNumber,
    this.creditCard.CardHolderFullName=this.cardHolder,
    this.creditCard.ExpireYear=this.expireDate.split("/")[0],
    this.creditCard.ExpireMonth=this.expireDate.split("/")[0]
    this.creditCard.Cvc=this.cvc
  }
  cardValidation(){
    if(this.creditCard.CardNumber.length != 16 &&
      this.creditCard.CardHolderFullName.length<5 &&
      this.creditCard.Cvc.length != 3 &&
      this.creditCard.ExpireMonth == "" &&
      this.creditCard.ExpireYear == ""){
        return false;
      }else{
        return true
      }
  }
 checkPay(creditCard:CreditCard){
  this.rentalService.checkPaymentInfo(this.creditCard).subscribe( (response) => { 
    this.paymentResult=response    
    console.log(response)
    if(this.paymentResult.success){
      this.rent=this.rentalService.getAllCart()[0];
      console.log(this.rent);
      this.addRental(this.rent);
      this.toastrService.success("Ödeme başarılı");  
      //this.toastrService.success("Ödeme başarılı");    
    }else{
      this.toastrService.error("Kart bilgileri hatalı");
      console.log(this.creditCard)
    }  
    console.log(this.rentalService.getAllCart());
    })
    
  };
  addRental(rent:Rent){
    this.rentalService.addRental(rent).subscribe((responce) => {
      console.log(responce)
      
    })
  }
pay(){
  this.fillCreditCard()
   this.checkPay(this.creditCard)
   //console.log(this.paymentResult)  
  
}



}
