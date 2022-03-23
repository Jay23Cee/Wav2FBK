import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Customer, Address } from "./customer";
import createCustomer from "./customer";
import { addItemInvoice, Invoice } from "./Invoices";
import { fblive, populatelist } from "./Facebook";
import { findcust } from "./require/getwaves";

import $ from "jquery";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Invoices from "./Invoices";
import { Products, Product } from "./Products";
import { createInvoice, invoicesbycustomer, deleteInvoice } from "./Invoices";
import { indigo } from "@mui/material/colors";
import { use } from "express/lib/application";
import { checkCustomer } from "./require/getwaves";

let testid = "";
let testname = "";
let customer_list1;
let item_list1;

const token = "zCtQa00zlorbFFum6I7Rlzc0QwMDoS";

const httpLink = createHttpLink({
  uri: "https://gql.waveapps.com/graphql/public",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function Wave() {
  const [item_list, setitem] = useState(null);
  const [customer_list, setcust] = useState(null);

  useEffect(() => {
    // let x , y = Products();
    // //console.log("wave wave wave ", y , x)
    //fblive();
    Products().then((data) => {
      setitem(data[0]);
      setcust(data[1]);

      console.log(data[0]);
    });
  }, []);

  //intialize name and item id
  let name = "";
  let item_id = "";


  let cust_name = "";
  let cust_id = "";

  if (customer_list != null) {
    customer_list1 = customer_list;
    item_list1 = item_list;
    populatelist(customer_list1, item_list1);
    //console.log(data[1].get('Jack'), "USE EFFECT YALL", )
  }

  const [firstName, setFirstName] = useState("");
  const [lastName, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [postalCode, setpostalcode] = useState("");
  const [countryCode, setcountrycode] = useState("");
  const [customerSearch, setCustomerSearch] = useState("");
  const [itemSearch, setitemSearch] = useState("");

  return (
    <ApolloProvider client={client}>
      <div>
        <h2>WAVE Information Below 🚀</h2>
        {name}
        <WaveData />
        <br></br> Firstname
        <TextField
          value={firstName}
          name="firstName"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br></br>Lastname
        <TextField
          value={lastName}
          name="lastName"
          onChange={(e) => setlastname(e.target.value)}
        />
        <br></br> Email
        <TextField
          value={email}
          name="email"
          onChange={(e) => setemail(e.target.value)}
        />
        <br></br> Address
        <TextField
          value={address}
          name="address"
          onChange={(e) => setaddress(e.target.value)}
        />
        <br></br> Address 2
        <TextField
          value={address}
          name="address2"
          onChange={(e) => setaddress(e.target.value)}
        />
        <br></br> city
        <TextField
          value={city}
          name="city"
          onChange={(e) => setcity(e.target.value)}
        />
        <br></br>postal code
        <TextField
          value={postalCode}
          name="postalCode"
          onChange={(e) => setpostalcode(e.target.value)}
        />
        <br></br>countryCode
        <TextField
          value={countryCode}
          name="countryCode"
          onChange={(e) => setcountrycode(e.target.value)}
        />
        <br></br>SEARCH CUSTOMER
        <TextField
          value={customerSearch}
          name="customerSearch"
          onChange={(e) => setCustomerSearch(e.target.value)}
        />
        <br></br>SEARCH ITEM
        <TextField
          value={itemSearch}
          name="itemSearch"
          onChange={(e) => setitemSearch(e.target.value)}
        />
        <button
          className="fblive"
          onClick={() => {
            fblive();
          }}
        >
          FB LIVE
        </button>
        <button
          className="newcust"
          onClick={() => {
            (async function(){
            let newnew =  await findcust(email.toLowerCase(),firstName,lastName,address,city,postalCode,countryCode)
              console.log("we waiting new func create new", newnew)

              if(newnew==false){
                console.log("Customer should have been added")
              }else{
                console.log("This email alreayd in system")
              }
            })()

          }
        }
        >
          Create Customer
        </button>
        <button
          className="myINV"
          onClick={() => {
            invoicesbycustomer(find("Jack", customer_list)).then((data) => {
              console.log(customer_list);
            });
          }}
        >
          VIEW INVOICES
        </button>
        <button
          className="myProducts"
          onClick={() => {
            additems(customerSearch, itemSearch);
          }}
        >
          add items
        </button>
        <button
          className="myProducts"
          onClick={() => {
            //console.log(cl.get('Jack').id, "this is button 1")
            createInvoice(customer_list.get("Jack").id);
            // createInvoice(cust_id, item_id)
          }}
        >
          {" "}
          NEW INVOICE{" "}
        </button>
        <button
          className="DeleteInvoice"
          onClick={() => {
            // let update = additems();// This needs customer id to be send.

            let inv = invoicesbycustomer(customer_list.get("Jack").id);

            //console.log("GETTING CUSTOMERS ID", inv)
            inv.then((data) => {
              //console.log(data[0].node.items, "here inside additems")
              let NewInvoice = new Invoice(
                data[0].node.id,
                data[0].node.customer.id
              );
              deleteInvoice(data[0].node.id);
            });
          }}
        >
          Delete Invoice
        </button>
        <button
          className="csearch"
          onClick={() => {
            console.log(find(customerSearch, customer_list));
          }}
        >
          Customer SEARCH
        </button>
        <button
          className="psearch"
          onClick={() => {
            console.log(find(itemSearch, item_list));
          }}
        >
          Item SEARCH
        </button>
        <br></br>
        <br></br>
        <button
          className="rmvitem"
          onClick={() => {
            addqtyitem(customerSearch, itemSearch);
          }}
        >
          add qty item
        </button>
        <br></br>
        <br></br>
        <button
          className="rmvitem"
          onClick={() => {
            removeqtyitem(customerSearch, itemSearch);
          }}
        >
          remove qty item
        </button>
        <br></br>
        <br></br>
        <button
          className="rmvitem"
          onClick={() => {
            comment_trigger(customerSearch, itemSearch);
          }}
        >
          COMMENT TRIGGER
        </button>
        <br></br>
        <br></br>
        <button
          className="rmvitem"
          onClick={() => {
            removeitem(customerSearch, itemSearch);
          }}
        >
          COMMENT TRIGGER
        </button>
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

function WaveData() {
  const { loading, error, data } = useQuery(Query_bus);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {error.message}</p>;
  //console.log("data.user")
  return (
    <div>
      <h1> WAVE APPS DATA</h1>
      <ul>
        <li key={data.user.id}> {data.user.firstName}</li>
      </ul>
    </div>
  );
}

//////////////////////////////
/// RECEIVE COMMENT TRIGGER
export const comment_trigger = (customer, item, rmv) => {
  // FIND THE ITEM IN INVOICE.
  const client = find(customer, customer_list1);
  const real_item = find(item, item_list1);
  try {
    console.log(client, real_item);
    if (client != false && real_item != false) {
      let inv = invoicesbycustomer(client.id);

      inv.then((data) => {
        //console.log("before new invoice",data)
        // making sure there's a real invoice.
        console.log("DATA TYPE IS ", typeof data);
        if (typeof data !== "undefined") {
          console.log("inv is NOT underfine yall", data);

          console.log(data, "THIS IS INVOICE WITH CLIENT");
          console.log(data[0].node.items.length);
          let oldItems = data[0].node.items;
          let NewInvoice = new Invoice(
            data[0].node.id,
            data[0].node.customer.id
          );
          let Itemsize = oldItems.length;
          let found = false;
          if (Itemsize > 0) {
            //IF ITEMS EXIST ADD QTY.
            // ELSE ADD THIS NEW ITEM.
            for (let x in oldItems) {
              console.log(oldItems[x], "FOUND THE ITEM TO ADD QTY");
              console.log(real_item.id, "READ ITEM");
              console.log(oldItems[x].product.id);
              if (real_item.id == oldItems[x].product.id) {
                console.log("YES FOUND ID");
                found = true;
              }
            }
            console.log( found && rmv == "removeqty", found, rmv)
            if (found && rmv == "removeqty") {
              removeqtyitem(customer , item);
              console.log("Qty for ", real_item.name, " has been removed")
            } else if (found && rmv == "removeAll") {
              removeitem(customer , item);
              console.log("Item has been removed");
            } else if (found){
              addqtyitem(customer , item);
              console.log("It has added a qty")
            } else {  
              // add item
              additems(customer , item);
              console.log("This new item has been Added.");
            }

          } else {
            additems(customer,item)
            console.log("This is  a new item being added.");
          }

        } else {
          console.log(customer, item)
          console.log(real_item.id)
          let new_Invoice = new Invoice("",client)
          let new_item = new Product(real_item.id, real_item.name, 1)
          new_Invoice.addItem(new_item)
          console.log(new_Invoice)
          createInvoice(new_Invoice)
          console.log("NO INVOICE WAS FOUND FOR THIS CLIENT");
          

        
        }
      });
    } else {
      let errmssg = "";

      if (!client) {
        errmssg = errmssg.concat(" ", " Client is not valid ");
        console.log("client not found", errmssg);
      }
      if (!real_item) {
        errmssg = errmssg.concat("", " Item not found");
      }
      console.log(errmssg);
      console.error(errmssg);
    }
  } catch (error) {}
};

//// ADD ITEM
export const additems = (customer, item, qty = 1) => {
  // adding an item to invoice.
  // first create the item variable.
  // then add new item variable to invoice.
  //   key word append to array. that new dictionary.

  // invoice created first then add items.
  try {
    console.log(customer_list1);
    console.log(customer, item);

    const client = find(customer, customer_list1);
    const real_item = find(item, item_list1);
    console.log(client.id, real_item);
    if (client != false && real_item != false) {
      //console.log("program click click add item")
      let addproduct = new Product(testid, testname, qty);
      //console.log(addproduct, "NEW PRODU id -==", cl.get('Jack').id)
      let inv = invoicesbycustomer(client.id);

      //console.log("GETTING CUSTOMERS ID", inv)
      inv.then((data) => {
        //console.log("before new invoice",data)
        console.log(data, " THIS IS INV ADD ITEM ONLY NO QTY");
        let oldItems = data[0].node.items;

        console.log("DATA TYPE IS ", typeof data);
      
        
        let NewInvoice = new Invoice(data[0].node.id, data[0].node.customer.id);
        let Itemsize = oldItems.length;
        if (Itemsize > 0) {
          for (let x = 0; x < Itemsize; x++) {
            let oldProduct = new Product(
              oldItems[x].product.id,
              oldItems[x].product.name
            );
            NewInvoice.addItem(oldProduct);
          }
        }
        //console.log("shiiiii",NewInvoice.id,"DELETE INC")

        //console.log("SECOND ADDING PROD", addproduct)

        NewInvoice.addItem(addproduct);

        //console.log("this is the LAST INV TO BE SAVE", NewInvoice)
        addItemInvoice(NewInvoice);
        deleteInvoice(NewInvoice.id);
      });
      console.log("PRODUCT ADDED. NO QTY");
    } else {
      console.error("Client or Product are not valid");
    }
  } catch (error) {
    throw console.error("Invalid customer or product", error);
  }
  //console.log(inv, "additems console inv")
};

////////////////THIS PURPOSE BELOW NEED TO DELETE
export const addqtyitem = (customer, item, qty = 1) => {
  // FIND THE ITEM IN INVOICE.
  const client = find(customer, customer_list1);
  const real_item = find(item, item_list1);
  try {
    console.log(customer_list1);
    console.log(customer, item);

    console.log(client, real_item);
    if (client != false && real_item != false) {
      let inv = invoicesbycustomer(client.id);

      inv.then((data) => {
        //console.log("before new invoice",data)
        if (typeof data !== "undefined") {
          console.log("inv is NOT underfine yall", data);

          console.log(data, "THIS IS INVOICE WITH CLIENT");
          let oldItems = data[0].node.items;
          let NewInvoice = new Invoice(
            data[0].node.id,
            data[0].node.customer.id
          );
          let Itemsize = oldItems.length;
          if (Itemsize > 0) {
            for (let x = 0; x < Itemsize; x++) {
              let oldProduct = new Product(
                oldItems[x].product.id,
                oldItems[x].product.name,
                oldItems[x].quantity
              );
              // Adding items to invoice
              NewInvoice.addItem(oldProduct);
            }
          }
          // adding qty to the item
          NewInvoice.addqty(real_item, qty);

          

          // adding the new invoice
          addItemInvoice(NewInvoice);
          //Removing old invoice
          deleteInvoice(NewInvoice.id);
          console.log("Item qty has been added");
        } else {
          // IF NO INVOICE HAS BEEN CREATED ONE IS CREATED AND ITEMS ADDED
          // THIS WON'T GO IN PRODUCTION
          console.log("CREATING A NEW INVOICE");
          createInvoice(client.id);
          console.log("INVOICE HAS BEEN CREATED");
          console.log("ADDING ITEM");
          additems(customer, item);
          console.log("INVOICE CREATED AND ADDED ITEM");
        }
      });
    } else {
      let errmssg = "";

      if (!client) {
        errmssg = errmssg.concat(" ", " Client is not valid");
        console.log("client not found", errmssg);
      }
      if (!real_item) {
        errmssg = errmssg.concat("", " Item not found");
      }
      console.log(errmssg);
      console.error(errmssg);
    }
  } catch (error) {}
};

// REMOVE QTY
export const removeqtyitem = (customer, item, qty = 1) => {
  // FIND THE ITEM IN INVOICE.
  try {

    const client = find(customer, customer_list1);
    const real_item = find(item, item_list1);

    if (client != false && real_item != false) {
      let inv = invoicesbycustomer(client.id);

      //console.log("GETTING CUSTOMERS ID", inv)
      inv.then((data) => {
        //console.log("before new invoice",data)

        let oldItems = data[0].node.items;
        let NewInvoice = new Invoice(data[0].node.id, data[0].node.customer.id);
        let Itemsize = oldItems.length;
        if (Itemsize > 0) {
          for (let x = 0; x < Itemsize; x++) {
            let oldProduct = new Product(
              oldItems[x].product.id,
              oldItems[x].product.name,
              oldItems[x].quantity
            );
            // Adding items to invoice
            NewInvoice.addItem(oldProduct);
          }
        }
        // adding qty to the item
        NewInvoice.removeqty(real_item, qty);

        // adding the new invoice
        addItemInvoice(NewInvoice);
        //Removing old invoice
        deleteInvoice(NewInvoice.id);
        console.log("Item qty has been remove");
      });
    } else {
      console.error("Client or Product are not valid");
    }
  } catch (error) {}
};

/// REMOVE ITEM might need to be reviewed. made some changes on  line 376 and down
export const removeitem = (customer, item) => {
  try {
    console.log("REMOVE ALL ITEM")

    const client = find(customer, customer_list1);
    const real_item = find(item, item_list1);
    console.log(client.id, real_item);
    if (client != false && real_item != false) {
      let inv = invoicesbycustomer(client.id);

      //console.log("GETTING CUSTOMERS ID", inv)
      inv.then((data) => {
        //console.log("before new invoice",data)

        let oldItems = data[0].node.items;
        let NewInvoice = new Invoice(data[0].node.id, data[0].node.customer.id);
        let Itemsize = oldItems.length;
        if (Itemsize > 0) {
          for (let x = 0; x < Itemsize; x++) {
            let oldProduct = new Product(
              oldItems[x].product.id,
              oldItems[x].product.name,
              oldItems[x].quantity
            );
            NewInvoice.addItem(oldProduct);
          }
        }
        //console.log("shiiiii",NewInvoice.id,"DELETE INC")

        //console.log("SECOND ADDING PROD", addproduct)
       

        NewInvoice.removeitem(real_item);
        //console.log("this is the LAST INV TO BE SAVE", NewInvoice)
        console.log(NewInvoice, "ITEM SHOULD HAVE BEEN REMOVED.");
        addItemInvoice(NewInvoice);
        deleteInvoice(NewInvoice.id);
      });
      console.log("INSIDE if");
    } else {
      console.error("Client or Product are not valid");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// Finding CUSTOMER or Inventory
const find = (word, list) => {
  console.log(list);
  if (list != null && word.length > 0) {
    for (let [key] of list) {
      let Ukey = key.toUpperCase();
      word = word.toUpperCase();
      console.log(Ukey, " KEY UPPERCASE,", word, " ", Ukey.includes(word));
      if (Ukey.includes(word)) {
        return list.get(key);
      }
    }
  }
  return false;
};

export default Wave;
