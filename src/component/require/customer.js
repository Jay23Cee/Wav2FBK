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