import { Component, OnInit } from '@angular/core';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/car';
//import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  carImages: CarImage[] = [];
  car:Car;
  dataLoaded = false;

  url = 'https://localhost:44318/uploads/Images/';

  constructor(
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService,
    private carService:CarService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId'] != null) {
        this.getImages(params['carId']);
        this.getDetails(params['carId']);
      }
    });
  }

  getImages(carId: number) {
    this.carImageService.getImages(carId).subscribe((responce) => {
      this.carImages = responce.data;
      this.dataLoaded = true;
    });
  }
  getDetails(carId:number){
    this.carService.getCars().subscribe(responce => {
      responce.data.forEach(c => {
        if(c.carId==carId){
          this.car=c
        }
      })
    })
  }



}
