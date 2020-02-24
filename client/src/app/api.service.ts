import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Customer } from './customer';
import { Address } from './address';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  public getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${apiUrl}/customer`)
      .pipe(
        tap(customers => console.log('fetched customers')),
        catchError(this.handleError('getCustomers', []))
      );
  }

  public getCustomersByCity(city: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${apiUrl}/city/${city}`)
      .pipe(
        tap(customers => console.log('fetched customers')),
        catchError(this.handleError('getCustomers', []))
      );
  }

  public getCustomersByPhonePrefix(prefix: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${apiUrl}/phone/${prefix}`)
      .pipe(
        tap(customers => console.log('fetched customers')),
        catchError(this.handleError('getCustomers', []))
      );
  }

  public getCustomerById(id: number): Observable<Customer> {
    const url = `${apiUrl}/customer/${id}`;
    const customer = this.http.get<Customer>(url);
    return customer;
  }

  public addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${apiUrl}/customer/`, customer, httpOptions).pipe(
      tap((s: Customer) => console.log(`added customer w/ id=${s.id}`)),
      catchError(this.handleError<Customer>('addCustomer'))
    );
  }

  public addCustomerAddress(customerId: number, address: Address): Observable<Address> {
    return this.http.post<Address>(`${apiUrl}/customer/${customerId}/address`, address, httpOptions);
  }

  public deleteCustomerAddress(customerId: number, addressId: number): Observable<Address> {
    return this.http.delete<Address>(`${apiUrl}/customer/${customerId}/address/${addressId}`, httpOptions);
  }
}