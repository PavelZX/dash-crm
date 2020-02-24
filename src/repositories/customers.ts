import { RequestHandler } from "express";
import { Address } from "../models/address";
import { Customer } from "../models/customer";

const CUSTOMERS: Customer[] = [];

export const find = (id: number): Customer => {
  if (id <= 0 || id > CUSTOMERS.length) {
    throw new Error("Customer can't be found");
  }
  return CUSTOMERS[CUSTOMERS.findIndex(customer => customer.id === id)];
}

export const add = (customer: Customer): Customer => {
  customer.id = CUSTOMERS.length + 1;
  CUSTOMERS.push(customer);
  return customer;
}

export const addAddress = (customerId: number, address: Address): Address => {
  const customer = find(customerId);
  if (customer.addresses && customer.addresses.length > 0) {
    address.id = customer.addresses[customer.addresses.length -1 ].id + 1;
  } else {
    address.id = 1;
    customer.addresses = [];
  }
  customer.addresses.push(address);
  return address;
} 

export const findAll = (): Customer[] => {
  return CUSTOMERS;
}

export const findAllByCity = (city: string): Customer[] => {
  return CUSTOMERS.filter(function(customer, _index, _array) {
    return customer.isLivingIn(city);
  });
}

export const findAllByPhonePrefix = (prefix: string): Customer[] => {
  return CUSTOMERS.filter(function(customer, _index, _array) {
    return customer.hasPhoneNumberPrefix(prefix);
  });
}

export const deleteAll = (): void => {
  CUSTOMERS.splice(0);
}
