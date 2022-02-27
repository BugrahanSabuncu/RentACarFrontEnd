
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rent } from 'src/app/models/rent';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css'],
})
export class RentComponent implements OnInit {
  carId: number;
  rentForm: FormGroup;
  rent:SingleResponseModel<Rent>
  nowDate:Date = new Date()
  newDate = new Date();


  constructor(
    private activatedRoot: ActivatedRoute,
    private formBuilder: FormBuilder,
    private rentalService:RentalService,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoot.params.subscribe((params) => {
      if (params['carId'] != null) {
        this.carId =parseInt(params['carId']);
        this.createRentForm();
        this.getReturnDate(params['carId'])        
      }
    });    
  }

  createRentForm() {
    this.rentForm = this.formBuilder.group({
      userId: 2,
      carId: this.carId,
      rentalDate: ['', Validators.required],
      returnDate: ['', Validators.required],      
    });
          
  }
  getReturnDate(carId:number){
    this.rentalService.getLastRental(this.carId).subscribe(responce => {
      this.rent=responce
    })
  }
  addCart(){
    let rentItem:Rent=Object.assign({}, this.rentForm.value)       
    if(this.rent.success == false){
      this.rentalService.addToCart(rentItem)
    }else if(this.rent.data.returnDate < rentItem.returnDate){
      this.rentalService.addToCart(rentItem)
      console.log("Backend : "+this.rent.data.returnDate)
      console.log("Frontend : "+rentItem.returnDate)
    }
    else{
      this.toastrService.error("Seçtiğiniz tarihlerde bu araç uygun değil.")
      console.log("Backend : "+this.rent.data.returnDate)
      console.log("Frontend : "+rentItem.returnDate)
    }  

  }
}