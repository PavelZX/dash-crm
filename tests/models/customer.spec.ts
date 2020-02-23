import { Customer } from "../../src/models/customer";
import { Address } from "../../src/models/address";

const newCustomer = (): Customer => {
  return new Customer('first_name', 'last_name', 'phone_number', 'email');
}

describe('addAddress', function() {
  it('add the address to the customer', function() {
    const customer = newCustomer();
    customer.addAddress(new Address('type', 'city', 'country', 'line'));
    expect(customer.addresses.length).toBe(1);   
  });

  it('doesn\'t have any address by default', function() {
    const customer = newCustomer();
    expect(customer.addresses.length).toBe(0);   
  });
});

describe('removeAddress', function() {
  it('remove the address to the customer', function() {
    const customer = newCustomer();
    customer.addAddress(new Address('type', 'city', 'country', 'line'));
    customer.deleteAddress(1);
    expect(customer.addresses.length).toBe(0);   
  });

  it('raise an error when the customer doesn\'t have any address', function() {
    const customer = newCustomer();
    expect(() => {
      customer.deleteAddress(1);;
    }).toThrow();
  });

  it('raise an error when the address ID doesn\'t exist', function() {
    const customer = newCustomer();
    customer.addAddress(new Address('type', 'city', 'country', 'line'));
    expect(() => {
      customer.deleteAddress(2);;
    }).toThrow();
  });
});

describe('isLivingIn', function() {
  it('return true if the customer has an address in this city', function() {
    const customer = newCustomer();
    const cityName = 'city';
    customer.addAddress(new Address('type', cityName, 'country', 'line'));
    expect(customer.isLivingIn(cityName)).toBe(true);   
  });

  it('return false if the customer doesn\'t have any address', function() {
    const customer = newCustomer();
    expect(customer.isLivingIn('city')).toBe(false);   
  });

  it('return false if the customer doesn\'t have any address in this city', function() {
    const customer = newCustomer();
    customer.addAddress(new Address('type', 'city', 'country', 'line'));
    expect(customer.isLivingIn('test')).toBe(false);   
  });

  it('doesn\'t raise an error if an address has the city missing', function() {
    const customer = newCustomer();
    customer.addAddress(new Address('type', null, 'country', 'line'));
    customer.addAddress(new Address('type', 'city', 'country', 'line'));
    expect(customer.isLivingIn('city')).toBe(true);
  });
});

describe('hasPhoneNumberPrefix', function() {
  it('return true if the customer has this prefix', function() {
    const customer = newCustomer();
    const prefix = '+33612';
    customer.phoneNumber = prefix + "phone_number";
    expect(customer.hasPhoneNumberPrefix(prefix)).toBe(true);   
  });

  it('return false if the customer doesn\'t have any phone number', function() {
    const customer = newCustomer();
    const prefix = '+33612';
    customer.phoneNumber = null;
    expect(customer.hasPhoneNumberPrefix(prefix)).toBe(false);   
  });
});

describe('add', function() {
  beforeEach(() => {
    Customer.deleteAll();
  });

  it('add a customer', function() {
    Customer.add(newCustomer());
    expect(Customer.all().length).toBe(1);   
  });

  it('returns the created customer', function() {
    expect(Customer.add(newCustomer())).toBeInstanceOf(Customer);   
  });
});

describe('find', function() {
  beforeEach(() => {
    Customer.add(newCustomer());
  });

  afterEach(() => {
    Customer.deleteAll();
  });

  it('return a customer', function() {
    expect(Customer.find(1)).toBeInstanceOf(Customer);   
  });

  it('return a customer with this id', function() {
    expect(Customer.find(1).id).toBe(1);   
  });

  it('raises an error when the id doesn\'t exist', function() {
    expect(() => {
      Customer.find(10)
    }).toThrow(Error);
  });
});

describe('find', function() {
  beforeEach(() => {
    Customer.deleteAll();
  });

  it('is empty by default', function() {
    expect(Customer.all().length).toBe(0);
  });

  it('return the right amount of customers addedd', function() {
    Customer.add(newCustomer());
    Customer.add(newCustomer());
    expect(Customer.all().length).toBe(2);     
  });
});

describe('find', function() {
  beforeEach(() => {
    Customer.deleteAll();
  });

  it('is empty by default', function() {
    expect(Customer.findAllByCity('city').length).toBe(0);
  });

  it('return the right amount of customers addedd with this city', function() {
    const customer1 = newCustomer();
    Customer.add(customer1);
    const customer2 = newCustomer();
    Customer.add(customer1);
    const cityName = 'city1';

    customer1.addAddress(new Address('type', cityName, 'country', 'line'));
    customer2.addAddress(new Address('type', 'city2', 'country', 'line'));
    expect(Customer.findAllByCity(cityName).length).toBe(2);     
  });

  it('return the right customer in this city', function() {
    const customer1 = newCustomer();
    Customer.add(customer1);
    const customer2 = newCustomer();
    Customer.add(customer1);
    const cityName = 'city1';

    customer1.addAddress(new Address('type', cityName, 'country', 'line'));
    customer2.addAddress(new Address('type', 'city2', 'country', 'line'));
    expect(Customer.findAllByCity(cityName)[0]).toEqual(customer1);     
  });
});

describe('findAllByPhonePrefix', function() {
  beforeEach(() => {
    Customer.deleteAll();
  });

  it('is empty by default', function() {
    expect(Customer.findAllByPhonePrefix('+33').length).toBe(0);
  });

  it('return the right amount of customers addedd with this phone number prefix', function() {
    const customer1 = newCustomer();
    Customer.add(customer1);
    const customer2 = newCustomer();
    Customer.add(customer1);

    expect(Customer.findAllByPhonePrefix(customer1.phoneNumber).length).toBe(2);     
  });

  it('return the right customer with this phone prefix', function() {
    const customer1 = newCustomer();
    Customer.add(customer1);
    const customer2 = newCustomer();
    Customer.add(customer1);

    expect(Customer.findAllByPhonePrefix(customer1.phoneNumber)[0].phoneNumber).toBe(customer1.phoneNumber);
  });
});