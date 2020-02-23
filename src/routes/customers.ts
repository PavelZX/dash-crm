import { Router } from "express";

import { createCustomer, getCustomers, getCustomer, addCustomerAddress, deleteCustomerAddress, findCustomersByCity, findCustomersByPhoneNumberPrefix } from "../controllers/customers";

const router = Router();

// GET Get all customers
router.get("/customer", getCustomers);

// GET Get customer with the id defined
router.get("/customer/:id", getCustomer);

// POST Create a customer
router.post("/customer", createCustomer);

// POST Create an address for this customer
router.post("/customer/:id/address", addCustomerAddress);

// DELETE Delete the address of the customer
router.delete("/customer/:id/address/:address_id", deleteCustomerAddress);

// GET Get all customers from this city
router.get("/city/:name", findCustomersByCity);

// GET Get all customers starting with the following prefix phone number
router.get("/phone/:prefix", findCustomersByPhoneNumberPrefix);

export default router;
