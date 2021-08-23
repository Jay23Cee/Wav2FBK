import React, { useEffect, useState } from "react";
import { render } from "@testing-library/react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  createHttpLink,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const Query_bussiness = gql`
  query {
    businesses {
      edges {
        node {
          id
          name
          countries
        }
      }
    }
  }
`;

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
  const token = 'eyuuMOuBJRYjpf59rFX0euH4cVlBzo';
  
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






     // let bear_token = "Bearer eyuuMOuBJRYjpf59rFX0euH4cVlBzo";
    // fetch("https://gql.waveapps.com/graphql/public", {
    //   method: "POST",
    //   headers: {
    //     Authorization: bear_token,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     query:
    //       "query { user { id defaultEmail firstName  } accountTypes{name} }",
    //     variables: {},
    //   }),
    // })
    //   .then((r) => r.json())
    //   .then((data) =>{ 
    //   });
      
export default Wave;
