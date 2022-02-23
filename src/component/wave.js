import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import {Customer, Address} from './require/customer';
import createCustomer from "./require/customer";


import $ from 'jquery';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  createHttpLink,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

import Invoices from "./Invoices";
import {Products, Product} from "./Products";
import {createInvoice, invoicesbycustomer , deleteInvoice}from "./Invoices";


const token = 'zCtQa00zlorbFFum6I7Rlzc0QwMDoS';

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



function  Wave(){
  const [myitem, setitem] = useState(null);
  const[cust, setcust] = useState(null)
  const [itemid, setid]= useState('')
  const [itemname,setitemname]= useState('')
  const [itemprice,setprice]= useState('')


  useEffect(() => {
    // let x , y = Products();
    // console.log("wave wave wave ", y , x)
      Products().then((data, data2) => {
    
        setitem(data[0])
        setcust(data[1])
        
      });

      
    }, []);

   let name = ""
   let item_id = ""
  if (myitem != null) {
  //   console.log(myitem, "MYITEM YAY ", typeof(myitem))
  //   console.log(myitem.data["data"]["business"]["products"]["edges"][0]["node"]["name"], "MYITEM YAY ZERO  ", typeof(myitem[0]))
  //   console.log(myitem.data["data"]["business"]["customers"]["edges"][0]["node"]["name"], "MYITEM YAY ZERO  ", typeof(myitem[0]))
  //   name = myitem[0]
  //console.log(myitem.get("Pencil Mickey").name)
    name = myitem.get("Pencil Mickey").name
    item_id = myitem.get("Pencil Mickey").id

  }

  let cust_name = ""
  let cust_id =  ""
  
  if(cust != null){
    cust_name = cust.get("Jack").name
    cust_id =  cust.get("Jack").id
  }

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
        {name}
        
       <WaveData/>
  
     <br></br> Firstname
     <TextField value={firstName}   name="firstName"  onChange={e => setFirstName(e.target.value)} />
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

      <button className="myButton" onClick={ ()=>{  createCustomer(firstName,lastName,email,address,city,postalCode,countryCode)
        }}>Create Customer</button>

<button className="myProducts" onClick={ ()=>{ //invoicesbycustomer()
                                                  createInvoice(cust_id, item_id)

        }}>Get Products</button>

<button className="DeleteInvoice" onClick={ ()=>{ deleteInvoice()//createInvoice(cust_id, item_id)

}}>Delete Invoice</button>
        

        
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





  export default Wave;