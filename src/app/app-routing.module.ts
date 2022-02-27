import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarComponent } from './components/car/car.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentComponent } from './components/rent/rent.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';


const routes: Routes = [
  {path:"" ,pathMatch:"full" ,component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/getbycolorid/:colorId",component:CarComponent},
  {path:"cars/getbybrandid/:brandId",component:CarComponent},
  {path:"cars/getfilters/:brandId&colorId",component:CarComponent},
  {path:"carDetails/getbycarid/:carId",component:CarDetailsComponent},
  {path:"rent/:carId",component:RentComponent},
  {path:"login",component:UserLoginComponent},
  {path:"register",component:UserRegisterComponent},
  {path:"payment",component:PaymentComponent},
  {path:"admin",component:AdminComponent},
  {path:"admin/brand",component:BrandAddComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
