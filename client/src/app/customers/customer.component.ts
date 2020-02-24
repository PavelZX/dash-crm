import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder } from '@angular/forms';
import { Customer } from '../customer';
import { Router, ActivatedRoute } from "@angular/router"

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customer;
  loaded = false;
  addAddressForm;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.addAddressForm = this.formBuilder.group({
      type: '',
      city: '',
      country: '',
      line: ''
    });
   }

  ngOnInit(): void {
    this.find(+this.route.snapshot.paramMap.get('id'));
  }

  onSubmit = function (addressData) {
    this.apiService.addCustomerAddress(this.customer.id, addressData).subscribe((data: Object) => {
      this.customer.addresses.push(data);
    }) 
  };

  onDeleteClick = function (addressId) {
    this.apiService.deleteCustomerAddress(this.customer.id, addressId).subscribe((data: Object) => {
      this.find(this.customer.id);
    }) 
  };

  find(id: number): void {
    this.loaded = false;
    this.apiService.getCustomerById(id).subscribe((data: Object) => {
      this.customer = data as Customer;
      this.loaded = true;
    }) 
  }

}
