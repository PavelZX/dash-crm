import request from "supertest";
import { app } from "../../src/app";

describe("POST /customer", () => {
  it('should create a customer', async () => {
    const customer = {
      first_name: "Julien",
      last_name: "M",
      email: "email@email.com",
      phone_number: "+33642424242"
    };
    await post('/customer', customer)
      .expect(201);
  });
});

describe("POST /customer/:id/address", () => {
  it('should add an address to the customer', async () => {
    const address = {
      "type": "perso",
      "city": "Paris",
      "country": "france",
      "line": "7 rue de temple"
    };
    const res = await post('/customer/1/address', address)
      .expect(201);
    
    expect(res.body).toEqual(
      {
        customer: {
          firstName: 'Julien',
          lastName: 'M',
          phoneNumber: '+33642424242',
          email: 'email@email.com',
          addresses: [
            {
              type: "perso",
              city: "Paris",
              country: "france",
              line: "7 rue de temple",
              id: 1
            }
          ],
          id: 1
        }
      }
    );
  });
});

describe("GET /customer/:id", () => {
  it('should return the customer', async () => {
    const res = await request(app).get('/customer/1');
      expect(res.body).toEqual(
        {
          customer: {
            firstName: 'Julien',
            lastName: 'M',
            phoneNumber: '+33642424242',
            email: 'email@email.com',
            addresses: [
              {
                type: "perso",
                city: "Paris",
                country: "france",
                line: "7 rue de temple",
                id: 1
              }
            ],
            id: 1
          }
        }
      );
  });
});

describe("GET /customer", () => {
  it('should return all customers', async () => {
    const res = await request(app).get('/customer');
      expect(res.body).toEqual(
        {
          customers: [
            {
              firstName: 'Julien',
              lastName: 'M',
              phoneNumber: '+33642424242',
              email: 'email@email.com',
              addresses: [
                {
                  type: "perso",
                  city: "Paris",
                  country: "france",
                  line: "7 rue de temple",
                  id: 1
                }
              ],
              id: 1
            }
          ]
        }
      );
  });
});

describe("GET /city/:city", () => {
  it('should return all customers in this city', async () => {
    const res = await request(app).get('/city/Paris');
    expect(res.body).toEqual(
      {
        customers: [
          {
            firstName: 'Julien',
            lastName: 'M',
            phoneNumber: '+33642424242',
            email: 'email@email.com',
            addresses: [
              {
                type: "perso",
                city: "Paris",
                country: "france",
                line: "7 rue de temple",
                id: 1
              }
            ],
            id: 1
          }
        ]
      }
    );
  });

  it('should return no customers if city not in any address', async () => {
    const res = await request(app).get('/city/test');
    expect(res.body).toEqual(
      {
        customers: []
      }
    );
  });
});

describe("GET /phone/+336", () => {
  it('should return all customers with this phone prefix', async () => {
    const res = await request(app).get('/phone/+33');
    expect(res.body).toEqual(
      {
        customers: [
          {
            firstName: 'Julien',
            lastName: 'M',
            phoneNumber: '+33642424242',
            email: 'email@email.com',
            addresses: [
              {
                type: "perso",
                city: "Paris",
                country: "france",
                line: "7 rue de temple",
                id: 1
              }
            ],
            id: 1
          }
        ]
      }
    );
  });

  it('should return no customers with unexistant phone prefix', async () => {
    const res = await request(app).get('/phone/+118');
    expect(res.body).toEqual(
      {
        customers: []
      }
    );
  });
});

describe("DELETE /customer/:id/address/:address_id", () => {
  it('should remove the address to the customer', async () => {
    const res = await request(app).delete('/customer/1/address/1')
      .expect(200);
    
    expect(res.body).toEqual(
      {
        customer: {
          firstName: 'Julien',
          lastName: 'M',
          phoneNumber: '+33642424242',
          email: 'email@email.com',
          addresses: [],
          id: 1
        }
      }
    );
  });
});

export function post(url: string, body: object){
  const httpRequest = request(app).post(url);
  httpRequest.send(body);
  httpRequest.set('Accept', 'application/json')
  httpRequest.set('Origin', 'http://localhost:8080')
  return httpRequest;
}