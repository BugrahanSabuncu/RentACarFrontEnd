import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { TokenModel } from 'src/app/models/token';
import { AuthService } from 'src/app/services/auth-service.service';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  registerForm: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
 
  register(){
    if(this.registerForm.valid){
      let registerModel = Object.assign({}, this.registerForm.value)
      
      this.authService.register(registerModel).subscribe(responce => {
        localStorage.setItem("token",responce.data.token )
        this.toastrService.success(responce.message)
      },errorResponce => {
        console.log(errorResponce)
        this.toastrService.error(errorResponce.error)
      })
          
    }
    else{
      this.toastrService.error("eksik bilgi girdiniz.")
    }
  }
}
