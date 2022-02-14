export class Customer {

    constructor(firstname, lastname, email,address) {
        
        this._address = address;
        this._fullname = firstname + " "+lastname;
        this._firstname= firstname;
        this._lastname=lastname;
        this._email=email;
        this._currency="USD";
    }
    // Getter address
    get address(){
        return this._address;
    }

    get address2(){
      return this._address2
    }
    
    // get name
    get fullname(){
        return this._fullname;
    }
    // get first name
    get firstname(){
        return this._firstname;
    }

    // get last name
    get lastname(){
        return this._lastname;
    };

    // get email
    get email(){
        return this._email;
    }

    // get currency
    get currency(){
        return this._currency;
    }

   
  }


export class Address {
    constructor(addressline1, addressline2, city, province, country, postalcode,countryCode) {
       this._addressline1 = addressline1;
       this._addressline2 =  addressline2;
       this._city=  city;
       this._province= province
       this._country = country;
       this._postalcode= postalcode;
       this._countryCode=countryCode;
    }
    // Getter
    get addres1() {
      return this._addressline1 ;
    }

    get countryCode(){
      return this._countryCode;
    }
    // Getter
    get addressline2() {
        return this._addressline2;
      }

    // Getter
    get city() {
        return this._city;
      }

    // Getter
    get province() {
        return this._province;
      }

    // Getter
    get country() {
        return this._country;
      }

    get postalcode(){
        return this._postalcode;
    }



  }



/// FOLLOWING IS THE GRAPH QL
const token = 'zCtQa00zlorbFFum6I7Rlzc0QwMDoS';

const createCustomer = (firstName,lastName,email,address,city,postalcode,countryCode)=> {
  
    let c_address = new Address(address," address", city, countryCode, postalcode)
    let c_customer = new Customer(firstName,lastName,email,c_address);
    
    console.log("CLICK CLICK ",  c_customer.firstname + " "+ c_customer.lastname );
  
  
  
    const shema = `
    mutation ($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        didSucceed
        inputErrors {
          code
          message
          path
        }
        customer {
          id
          name
          firstName
          lastName
          email
          address {
            addressLine1
            addressLine2
            city
            province {
              code
              name
            }
            country {
              code
              name
            }
            postalCode
          }
          currency {
            code
          }
        }
      }
    }` 
    
    
    console.log("CLICK CLICK ",  c_customer.firstname + " "+ c_customer.lastname );
  
  
    fetch('https://gql.waveapps.com/graphql/public', {
      method: 'POST',
      headers: {
        'Authorization': token ? `Bearer ${token}` : "",
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: shema,
        variables: { 
          "input": {
            "businessId": "QnVzaW5lc3M6ZTIyZmVhODEtNjg5OC00N2ZiLTgzOGItYWMyYzllNDZiM2Jk",
            "name": c_customer.fullname,
            "firstName": c_customer.firstname,
            "lastName": c_customer.lastname,
            "email": c_customer.email,
            "address": {
              "city":c_customer.address.city,
              "postalCode": "90012",
  
            },
            "currency": "USD"
          }}
        })
      })
      .then(r => r.json())
      .then(data => console.log(data));
  
      // clear the textfield
  
     
      // display customer created
  
     
      console.log("CUSTOMER CREATED")
    }
  
  export default createCustomer;