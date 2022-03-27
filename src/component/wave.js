import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Customer, Address } from "./customer";
import createCustomer from "./customer";
import { addItemInvoice, Invoice } from "./Invoices";
import { fblive, populatelist } from "./Facebook";
import { findcust } from "./Facebook";
import axios from "axios";
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
          className="fblive"
          onClick={() => {
            let red = getData();
            console.log(red);
          }}
        >
          GET DATA BUTOTN
        </button>
        <button
          className="newcust"
          onClick={() => {
            (async function () {
              let newnew = await findcust(
                email.toLowerCase(),
                firstName,
                lastName,
                address,
                city,
                postalCode,
                countryCode
              );
              console.log("we waiting new func create new", newnew);

              if (newnew == false) {
                console.log("Customer should have been added");
              } else {
                console.log("This email alreayd in system");
              }
            })();
          }}
        >
          Create Customer
        </button>
        <button
          className="myINV"
          onClick={async() => {
            let new_string = customerSearch.trim().split(" ");
            console.log(new_string, " STRING SPLIT");
            let cus = await findcust(["jack","early"])
            let real_cus = find(cus,customer_list)
            console.log(cus)
            console.log(real_cus)
            let re = await invoicesbycustomer(real_cus.id);
            console.log(re)
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

            console.log(customerSearch)
            let cus = findcust(customerSearch)
            console.log(cus)
            let inv = invoicesbycustomer(cus.id);

            console.log("GETTING CUSTOMERS ID", inv)
            
              //console.log(data[0].node.items, "here inside additems")
              let NewInvoice = new Invoice(
                inv[0].node.id,
                inv[0].node.customer.id
              );
              deleteInvoice(inv[0].node.id);
          
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
export const comment_trigger = async (customer, item, rmv) => {
  // FIND THE ITEM IN INVOICE.
  let re = await new Promise(async(resolve) =>{

 

  const client = find(customer, customer_list1);
  const real_item = find(item, item_list1);
  try {
    console.log(client, real_item);
    if (client != false && real_item != false) {
      let inv = await invoicesbycustomer(client.id);
      console.log(inv);

      if (inv == undefined || inv.length ==0) {
        console.log(customer, item);
        console.log(real_item.id);
        let new_Invoice = new Invoice("", client);
        let new_item = new Product(real_item.id, real_item.name, 1);
        await new_Invoice.addItem(new_item);
        console.log(new_Invoice);
        await createInvoice(new_Invoice);
        console.log("NO INVOICE WAS FOUND FOR THIS CLIENT");
      } else {
        console.log(inv);
       
          //console.log("before new invoice",data)
          // making sure there's a real invoice.
          console.log("DATA TYPE IS ", typeof inv);
          if (typeof inv !== "undefined") {
            console.log("inv is NOT underfine yall", inv);

            console.log(inv, "THIS IS INVOICE WITH CLIENT");
            console.log(inv[0].node.items.length);
            let oldItems = inv[0].node.items;
            let NewInvoice = new Invoice(
              inv[0].node.id,
              inv[0].node.customer.id
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
              console.log(found && rmv == "removeqty", found, rmv);
              if (found && rmv == "removeqty") {
                await removeqtyitem(customer, item);
                console.log("Qty for ", real_item.name, " has been removed");
              } else if (found && rmv == "removeAll") {
                await removeitem(customer, item);
                console.log("Item has been removed");
              } else if (found) {
                let aqi = await addqtyitem(customer, item);
                console.log(aqi)
                console.log("It has added a qty");
              } else {
                // add item
                await additems(customer, item);
                console.log("This new item has been Added.");
              }
            } else {
              await additems(customer, item);
              console.log("This is  a new item being added.");
            }
          }
        
      }
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
  } catch (error) {
    console.log("THERE WAS AN ERROR SOMEWHERE YOO. " )
    console.error(error.response.data)
  }

}
)
};

//// ADD ITEM
const additems = async (customer, item, qty = 1) => {
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
      let inv = await invoicesbycustomer(client.id);

      console.log(inv)
      //console.log("GETTING CUSTOMERS ID", inv)
  
        //console.log("before new invoice",data)
        console.log(inv, " THIS IS INV ADD ITEM ONLY NO QTY");
        let oldItems = inv[0].node.items;

        console.log("DATA TYPE IS ", typeof inv);

        let NewInvoice = new Invoice(inv[0].node.id, inv[0].node.customer.id);
        let Itemsize = oldItems.length;
        if (Itemsize > 0) {
          for (let x = 0; x < Itemsize; x++) {
            let oldProduct = new Product(
              oldItems[x].product.id,
              oldItems[x].product.name
            );
            await NewInvoice.addItem(oldProduct);
          }
        }
        //console.log("shiiiii",NewInvoice.id,"DELETE INC")

        //console.log("SECOND ADDING PROD", addproduct)

        await NewInvoice.addItem(addproduct);

        //console.log("this is the LAST INV TO BE SAVE", NewInvoice)
        await createInvoice(NewInvoice);
        await deleteInvoice(NewInvoice.id);
    
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
const addqtyitem = async (customer, item, qty = 1) => {
  // FIND THE ITEM IN INVOICE.
  const client = find(customer, customer_list1);
  const real_item = find(item, item_list1);
  try {
    console.log(customer_list1);
    console.log(customer, item);

    console.log(client, real_item);
    if (client != false && real_item != false) {
      let inv = await invoicesbycustomer(client.id);
   
        //console.log("before new invoice",data)
        if (typeof inv !== "undefined") {
          console.log("inv is NOT underfine yall", inv);

          console.log(inv, "THIS IS INVOICE WITH CLIENT");
          let oldItems = inv[0].node.items;
          let NewInvoice = new Invoice(
            inv[0].node.id,
            inv[0].node.customer.id
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
              await NewInvoice.addItem(oldProduct);
            }
          }
          // adding qty to the item
          await NewInvoice.addqty(real_item, qty);

          // adding the new invoice
          await addItemInvoice(NewInvoice);
          console.log("Created INVOICE FOR ", customer)
          //Removing old invoice
          await deleteInvoice(NewInvoice.id);
          console.log("Delete previous", customer)
          console.log("Item qty has been added");
        } else {
          // IF NO INVOICE HAS BEEN CREATED ONE IS CREATED AND ITEMS ADDED
          // THIS WON'T GO IN PRODUCTION
          console.log("CREATING A NEW INVOICE");
          await createInvoice(client.id);
          console.log("INVOICE HAS BEEN CREATED");
          console.log("ADDING ITEM");
          await additems(customer, item);
          console.log("INVOICE CREATED AND ADDED ITEM");
        }
     
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
const removeqtyitem = async (customer, item, qty = 1) => {
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
    console.log("REMOVE ALL ITEM");

    const client = find(customer, customer_list1);
    const real_item = find(item, item_list1);
    console.log(client.id, real_item);
    if (client != false && real_item != false) {
      let inv = invoicesbycustomer(client.id);

      //console.log("GETTING CUSTOMERS ID", inv)
     
        //console.log("before new invoice",data)

        let oldItems = inv[0].node.items;
        let NewInvoice = new Invoice(inv[0].node.id, inv[0].node.customer.id);
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
        createInvoice(NewInvoice);
        deleteInvoice(NewInvoice.id);
      
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

export const getData = async () => {
  console.log("honk honk");
  let Product_list = new Map();
  let customer_list = new Map();

  // useEffect(() => {

  let list;
  const Items_available = {};

  //const token = "SfAXaswa3yTwWxRnmrAMU5YwZllvo9";
  const token = "zCtQa00zlorbFFum6I7Rlzc0QwMDoS";
  const shema = ` 
        query ($businessId: ID!, $page: Int!, $pageSize: Int!) {
            business(id: $businessId) {
                id
                name
                customers{
                    edges{
                        node{
                        id
                        name
                        displayId
                        }
                    }
                    }
                
                products(page: $page, pageSize: $pageSize) {
                    pageInfo {
                        currentPage
                        totalPages
                        totalCount
                                            }
                                            edges {
                                                node {
                                                    id
                                                    name
                                                    description
                                                    unitPrice
                                                    defaultSalesTaxes {
                                                        id
                                                        name
                                                        abbreviation
                                                        rate
                                                    }
                                                    isSold
                                                    isBought
                                                    isArchived
                                                    createdAt
                                                    modifiedAt
                                                }
                                            }
                                        }
                                    }
                                }
                                
                                `;

  //About to submit my shema to waveapps
  const endpoint = "https://api.waveapps.com/oauth2/authorize/";
  const bussID = "QnVzaW5lc3M6ZTIyZmVhODEtNjg5OC00N2ZiLTgzOGItYWMyYzllNDZiM2Jk";
  const API_URL = "https://gql.waveapps.com/graphql/public";
  let response = await axios(API_URL, {
    method: "post",

    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
    data: {
      query: shema,
      variables: {
        businessId: bussID,
        page: 1,
        pageSize: 50,
      },
    },
  });
  //   list = response.data["data"]["business"]["products"]["edges"]
console.log(response)
  let prod_size = response.data.data.business.products.edges.length;
  let prod = response.data.data.business.products.edges
console.log(prod_size)
  for (let x = 0; x < prod_size; x++) {
    let name = prod[x]["node"]["name"];
    let id = prod[x]["node"]["id"];
    let qty = prod[x]["node"]["quantity"];
    let temp_prod = new Product(id, name, qty);
    Product_list.set(name, temp_prod);
    console.log("THIS IS THE QTY", qty);
  }

  let cust_size =
    response.data["data"]["business"]["customers"]["edges"].length;
  let cust = response.data["data"]["business"]["customers"]["edges"];

  for (let x = 0; x < cust_size; x++) {
    let name = cust[x]["node"]["name"];
    let id = cust[x]["node"]["id"];
    let displayid = cust[x]["node"]["displayId"];
    let key = name + " " + displayid;
    //    console.log(key, "THIS IS FUTURE KEY")
    let temp_cust = new Customer(name, "", "", "", id, displayid);
    customer_list.set(key, temp_cust);
  }

  return Promise.resolve([Product_list, customer_list]);
  //return [Promise.resolve(Product_list), Promise.resolve(customer_list)]
};

export const hasInvoice = async (custerid) => {};

export default Wave;
