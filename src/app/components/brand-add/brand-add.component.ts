import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandManagementService } from 'src/app/services/brand-management.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css'],
})
export class BrandAddComponent implements OnInit {
  brandAddForm: FormGroup;
  constructor(
    private brandManagementService: BrandManagementService,
    private formBuilder: FormBuilder,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.fillForm();
  }
  fillForm() {
    this.brandAddForm = this.formBuilder.group({
      brandName: ['', Validators.required],
    });
  }
  add() {
    if (this.brandAddForm.valid) {
      let brandModel = Object.assign({}, this.brandAddForm.value);
      this.brandManagementService.brandAdd(brandModel).subscribe(
        (responce) => {
          console.log(responce);
          this.toastrService.success(responce.message)
        },
        (errorResponce) => {
          console.log(errorResponce);
          this.toastrService.error(errorResponce.message)
        }
      );
    }
  }
}
