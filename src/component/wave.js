import React, { useEffect, useState } from "react";
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

function Wave() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>WAVE Information Below 🚀</h2>

       <WaveData/>
      </div>
    </ApolloProvider>
  );
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
        console.log(data.user)
      return  (  
        <div>
          <h1> WAVE APPS DATA</h1>
          <ul>
            
              <li key={data.user.id}> {data.user.firstName}</li>
          
          </ul>

        </div>

      )
  }


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

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});



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
      "name": "Donda",
      "firstName": "Donda",
      "lastName": "Nias",
      "email": "dona@example.com",
      "address": {
        "city": "North WEST",
        "postalCode": "H0H 0H0",
        "provinceCode": "CA-NU",
        "countryCode": "CA"
      },
      "currency": "CAD"
    }}
  })
})
.then(r => r.json())
.then(data => console.log(data));

export default Wave;
