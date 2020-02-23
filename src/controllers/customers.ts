import { RequestHandler } from "express";
import { Address } from "../models/address";
import { Customer } from "../models/customer";

export const createCustomer: RequestHandler = (req, res, _next) => {
  const body = (req.body as {first_name: string, last_name: string, phone_number: string, email: string});
  const newCustomer: Customer = new Customer(body.first_name, body.last_name, body.phone_number, body.email);

  Customer.add(newCustomer);

  res.status(201).json({ customer: newCustomer });
};

export const getCustomers: RequestHandler = (_req, res, _next) => {
  res.json({ customers: Customer.all() });
};

export const getCustomer: RequestHandler<{ id: string }> = (req, res, _next) => {
  const customer: Customer = Customer.find(+req.params.id);

  res.json({ customer: customer });
};

export const addCustomerAddress: RequestHandler = (req, res, _next) => {
  const customer: Customer = Customer.find(+req.params.id);
  const body = (req.body as {type: string, city: string, country: string, line: string});
  customer.addAddress(new Address(body.type, body.city, body.country, body.line));

  res.status(201).json({ customer: customer });
};

export const deleteCustomerAddress: RequestHandler = (req, res, _next) => {
  const customer: Customer = Customer.find(+req.params.id);
  customer.deleteAddress(+req.params.address_id);

  res.json({ customer: customer });
};

export const findCustomersByCity: RequestHandler = (req, res, _next) => {
  res.json({ customers: Customer.findAllByCity(req.params.name) });
};

export const findCustomersByPhoneNumberPrefix: RequestHandler = (req, res, _next) => {
  res.json({ customers: Customer.findAllByPhonePrefix(req.params.prefix) });
};
