import { Address } from './address';

export class Customer {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  addresses: Address[] = [];
}