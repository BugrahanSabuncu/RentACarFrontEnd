import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    let loginForm = Object.assign({}, this.loginForm.value);
    if (this.loginForm.valid) {
      this.authService.login(loginForm).subscribe(
        (responce) => {
          this.toastrService.success("Giriş Başarılı")
          localStorage.setItem("token",responce.data.token)
          //console.log(responce);
        },
        (errorResponce) => {
          this.toastrService.error(errorResponce.error)
          //console.log(errorResponce);
        }
      );
    }
  }
}
