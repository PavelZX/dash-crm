import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { NewCustomerComponent } from './customers/new-customer.component';
import { CustomerComponent } from './customers/customer.component';


const routes: Routes = [
  {
    path: 'customers',
    component: CustomersComponent,
    data: { title: 'List of Customers' }
  },
  {
    path: 'customers/:id',
    component: CustomerComponent,
    data: { title: 'Customer details' }
  },
  {
    path: 'new',
    component: NewCustomerComponent,
    data: { title: 'New Customer' }
  },
  { path: '',
    redirectTo: '/customers',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
