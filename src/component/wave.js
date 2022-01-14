import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import {Customer, Address} from './require/customer';


import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  createHttpLink,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';




const token = 'G5qNRPdeVZMk1AAQIYuEuAGgu729yG';

const httpLink = createHttpLink({
  uri: 'https://gql.waveapps.com/graphql/public',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


function Wave() {
  const [firstName, setFirstName] = useState('');
  const  [lastName, setlastname]= useState('');
  const [email, setemail]= useState('');
  const  [address, setaddress]= useState('');
  const  [city, setcity]= useState('');
  const  [postalCode, setpostalcode]= useState('');
  const  [countryCode, setcountrycode]= useState('');
        
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>WAVE Information Below 🚀</h2>

       <WaveData/>
  
     <br></br> Firstname
      <TextField value={firstName}   name="firstName"  onChange={e =>setFirstName(e.target.value)} />
      <br></br>Lastname
      <TextField value={lastName}   name="lastName"  onChange={e => setlastname(e.target.value)} />
     <br></br> Email
      <TextField value={email}   name="email"  onChange={e => setemail(e.target.value)} />
      <br></br> Address
      <TextField value={address}   name="address"  onChange={e => setaddress(e.target.value)} />
      <br></br> Address 2
      <TextField value={address}   name="address2"  onChange={e => setaddress(e.target.value)} />
      
      <br></br> city
      <TextField value={city}   name="city"  onChange={e => setcity(e.target.value)} />
      <br></br>postal code
      <TextField value={postalCode}   name="postalCode"  onChange={e => setpostalcode(e.target.value)} />
      <br></br>countryCode
      <TextField value={countryCode}   name="countryCode"  onChange={e => setcountrycode(e.target.value)} />

      <button className="myButton" onClick={ ()=> createCustomer(firstName,lastName,email,address,city,postalCode,countryCode)}>Create Customer</button>
      </div>
    </ApolloProvider>
  );
}


function Callme(e){
  console.log("here")
 
}
const Query_bus = gql`
query {
  user {
    id
    defaultEmail
    firstName
  }
  accountTypes {
    name
  }
}
`;

function WaveData(){
  
  
  const { loading, error, data } = useQuery(Query_bus);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {error.message}</p>;
    console.log("data.user")
    return  (  
      <div>
          <h1> WAVE APPS DATA</h1>
          <ul>
            
              <li key={data.user.id}> {data.user.firstName}</li>
          
          </ul>

        </div>

)
}




function createCustomer(firstName,lastName,email,address,city,postalcode,countryCode) {
  console.log("CLICK CLICK ", firstName);
  
  let c_address = new Address(address," address", city, countryCode, postalcode)
  let c_customer = new Customer(firstName,lastName,email,c_address);

  console.log(c_customer);
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
          "businessId": "QnVzaW5lc3M6MmU0YTUwMzQtYTI1Mi00ODY4LThkMTYtN2QzNDBjYmE0NzZi",
          "name": c_customer.fullname,
          "firstName": c_customer.getfirstame,
          "lastName": c_customer.lastName,
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

  }
  export default Wave;