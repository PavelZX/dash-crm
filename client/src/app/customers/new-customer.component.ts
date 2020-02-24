import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss']
})
export class NewCustomerComponent implements OnInit {

  addForm;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private router: Router) { 
    this.addForm = this.formBuilder.group({
      first_name: '',
      last_name: '',
      email: '',
      phone_number: ''
    });
  }

  ngOnInit(): void {
  }

  onSubmit = function (customerData) {
    this.apiService.addCustomer(customerData).subscribe((data: Object)=>{
      this.router.navigate(['/customers'])
    }) 
  }

}
