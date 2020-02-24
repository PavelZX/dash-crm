import { Address } from '../models/address';
import { find, add, findAll, findAllByCity , findAllByPhonePrefix, deleteAll, addAddress} from '../repositories/customers';

export class Customer {
  public id: number;
  public addresses: Address[];

  constructor(public firstName: string, public lastName: string, public phoneNumber: string, public email: string) {
    this.addresses = [];
  }

  public addAddress(id: number, address: Address): Address {
    const newAddress = addAddress(id, address);
    return newAddress;
  }

  public deleteAddress(id: number): void {
    const index = this.addresses.findIndex(address => address.id === id);
    if (index === -1) {
      throw new Error("Address doesn't exist");
    }
    this.addresses.splice(index, 1)
  }

  public isLivingIn(city: string): Boolean {
    return this.addresses.some(function(address, _index, _array) {
      if (address.city) {
        return address.city.toLowerCase() === city.toLowerCase()
      } else {
        return false;
      }
    });
  }

  public hasPhoneNumberPrefix(prefix: string): Boolean {
    if (this.phoneNumber) {
      return this.phoneNumber.startsWith(prefix);
    } else {
      return false;
    }
  }

  static find(id: number): Customer {
    return find(id);
  }

  static add(customer: Customer): Customer {
    return add(customer);
  }

  static all(): Customer[] {
    return findAll();
  }

  static findAllByCity(city: string): Customer[] {
    return findAllByCity(city);
  }

  static findAllByPhonePrefix(prefix: string): Customer[] {
    return findAllByPhonePrefix(prefix);
  }

  static deleteAll(): void {
    deleteAll();
  }
}
