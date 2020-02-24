import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder } from '@angular/forms';
import { Customer } from '../customer';
import { Router } from "@angular/router"

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  customers = [];
  loaded = false;
  searchForm;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private router: Router) {
    this.searchForm = this.formBuilder.group({
      search: ''
    });
   }

  ngOnInit(): void {
    this.searchAll();
  }

  onSubmit = function (search: {search: string}) {
    if (search.search.length === 0){
      this.searchAll();
    }
    const query = search.search.split(":");
    if (query.length === 1) { 
      this.searchByCity(query);
    } else if(query.length >= 2) {
      if (query[0] === 'phone') {
        this.searchByPhonePrefix(query[1]);
      } else {
        this.searchByCity(query[1]);
      }
    }
  }

  searchAll(): void {
    this.loaded = false;
    this.apiService.getCustomers().subscribe((data: Object) => {
      this.customers = data as Customer[];
      this.loaded = true;
    }) 
  }

  searchByCity(city: string): void {
    this.loaded = false;
    this.apiService.getCustomersByCity(city).subscribe((data: Object) => {
      this.customers = data as Customer[];
      this.loaded = true;
    })
  }

  searchByPhonePrefix(prefix: string): void {
    this.loaded = false;
    this.apiService.getCustomersByPhonePrefix(prefix).subscribe((data: Object) => {
      this.customers = data as Customer[];
      this.loaded = true;
    })
  }


}
