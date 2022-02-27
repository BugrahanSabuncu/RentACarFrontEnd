import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarFilterService } from 'src/app/services/car-filter.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  colors:Color[];
  brands:Brand[];
  carImages: CarImage[];
  carImage: CarImage;
  
  filterText="";
  
  dataLoaded = false;
  dataImageLoaded = false;
  currentCar: Car | undefined;
  selectedBrand:number;
  selectedColor:number;


  url = 'https://localhost:44318/uploads/Images/';

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private carImageService:CarImageService,
    private brandService:BrandService,
    private colorService:ColorService,
    private carFilterService:CarFilterService,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.getImages();
    this.getBrands();
    this.getColors();   
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getByColor(params['colorId']);
      } else {
        this.getCars();        
      }
    });   
    
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;     
    });
  }
  getBrands(){
    this.brandService.getBrands().subscribe(responce => {
      this.brands=responce.data
    })
  }
  
  getByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((responce) => {
      this.cars = responce.data;
      this.dataLoaded = true;
    });
  }

  getColors(){
    this.colorService.getColor().subscribe(responce => {
      this.colors=responce.data
    })
  }
  getByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((responce) => {
      this.cars = responce.data;
      this.dataLoaded = true;
    });
  }

  setCurrentCar(car: Car) {
    this.currentCar = car;
  }
  

  getImages(){
    this.carImageService.getAllImages().subscribe(responce =>{      
      this.carImages=responce.data
    })   
    
   }
   getImagePath(carId:number):string{           
    this.carImages.forEach(c => {
      if(c.carId==carId){
        this.carImage=c
      }
    })
    return this.url + this.carImage.imagePath
   }

   getCarsByFilter(brandId:number,colorId:number){
     this.carFilterService.getFilters(brandId,colorId).subscribe(responce => {
       this.cars=responce.data
     })
   }


}
