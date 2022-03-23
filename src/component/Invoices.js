import { useEffect, useState } from "react";
import { Products, Product } from "./Products";
import axios from "axios";
import { ProvidedRequiredArgumentsRule } from "graphql";
import { inputClasses } from "@mui/material";


export const createInvoice = async(inv) => {
  // ADD item should ad items to invoice
  /** we add quantity here as well... by default all will be 1. */

  /**NEED TO HAVE
   *  1. Invoice ID
   *  2. CUSTOMER ID.
   *  3. ITEM NAME? ID? SOMETHING.
   */

  console.log("CREATE add item INVOICE WELCOME", inv, inv.items);

  try {
    const bussID =
      "QnVzaW5lc3M6ZTIyZmVhODEtNjg5OC00N2ZiLTgzOGItYWMyYzllNDZiM2Jk";
    const token = "zCtQa00zlorbFFum6I7Rlzc0QwMDoS";
    const shema = ` 
  mutation ($input: InvoiceCreateInput!) {
      invoiceCreate(input: $input) {
          didSucceed
          inputErrors {
              message
              code
              path
          }
          invoice {
              id
              createdAt
              modifiedAt
              pdfUrl
              viewUrl
              status
              title
              subhead
              invoiceNumber
              invoiceDate
              poNumber
              customer {
                  id
                  name
                  # Can add additional customer fields here
              }
              currency {
                  code
              }
              dueDate
              amountDue {
                  value
                  currency {
                      symbol
                  }
              }
              amountPaid {
                  value
                  currency {
                      symbol
                  }
              }
              taxTotal {
                  value
                  currency {
                      symbol
                  }
              }
              total {
                  value
                  currency {
                      symbol
                  }
              }
              exchangeRate
              footer
              memo
              disableCreditCardPayments
              disableBankPayments
              itemTitle
              unitTitle
              priceTitle
              amountTitle
              hideName
              hideDescription
              hideUnit
              hidePrice
              hideAmount
              items {
                  product {
                      id
                      name
                      # Can add additional product fields here
                  }
                  description
                  quantity
                  price
                  subtotal {
                      value
                      currency {
                          symbol
                      }
                  }
                  total {
                      value
                      currency {
                          symbol
                      }
                  }
                  account {
                      id
                      name
                      subtype {
                          name
                          value
                      }
                      # Can add additional account fields here
                  }
                  taxes {
                      amount {
                          value
                      }
                      salesTax {
                          id
                          name
                          # Can add additional sales tax fields here
                      }
                  }
              }
              lastSentAt
              lastSentVia
              lastViewedAt
          }
      }
  }`;

    //About to submit my shema to waveapps
    await fetch("https://gql.waveapps.com/graphql/public", {
      method: "POST",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: shema,
        variables: {
          input: {
            businessId: bussID,
            customerId: inv.customer.id,
            items:inv.items,
          },
        },
      }),
    })
      .then((r) => r.json())
      .then((data) => console.log(data, "ADD ITEM INV"));
  } catch (error) {}
  console.log("ADDED NEW ITEM TO INVOICE");
  
};

export const invoicesbycustomer = async (cust_id) => {
  try {
    const API_URL = "https://gql.waveapps.com/graphql/public";
    const bussID =
      "QnVzaW5lc3M6ZTIyZmVhODEtNjg5OC00N2ZiLTgzOGItYWMyYzllNDZiM2Jk";
    const token = "zCtQa00zlorbFFum6I7Rlzc0QwMDoS";

    const shema = `
query($businessId: ID!, $page: Int!, $pageSize: Int!, $customerId: ID!) {
    business(id: $businessId) {
      id
      isClassicInvoicing
      invoices(page: $page, pageSize: $pageSize, customerId: $customerId) {
        pageInfo {
          currentPage
          totalPages
          totalCount
        }
        edges {
          node {
            id
            createdAt
            modifiedAt
            pdfUrl
            viewUrl
            status
            title
            subhead
            invoiceNumber
            invoiceDate
            poNumber
            customer {
              id
              name
              # Can add additional customer fields here
            }
            currency {
              code
            }
            dueDate
            amountDue {
              value
              currency {
                symbol
              }
            }
            amountPaid {
              value
              currency {
                symbol
              }
            }
            taxTotal {
              value
              currency {
                symbol
              }
            }
            total {
              value
              currency {
                symbol
              }
            }
            exchangeRate
            footer
            memo
            disableCreditCardPayments
            disableBankPayments
            itemTitle
            unitTitle
            priceTitle
            amountTitle
            hideName
            hideDescription
            hideUnit
            hidePrice
            hideAmount
            items {
              product {
                id
                name
                # Can add additional product fields here
              }
              description
              quantity
              price
              subtotal {
                value
                currency {
                  symbol
                }
              }
              total {
                value
                currency {
                  symbol
                }
              }
              account {
                id
                name
                subtype {
                  name
                  value
                }
                # Can add additional account fields here
              }
              taxes {
                amount {
                  value
                }
                salesTax {
                  id
                  name
                  # Can add additional sales tax fields here
                }
              }
            }
            lastSentAt
            lastSentVia
            lastViewedAt
          }
        }
      }
    }
  }
      
`;

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
          pageSize: 20,
          customerId: cust_id,
        },
      },
    });

    //console.log(response, "GETTING GETTING INVOICE BY CUSTOMER!!!!!!!!!!!\n!!!!!!!!!!!!!!!")
    console.log(
      "splitting the invoices.",
      response.data.data.business.invoices.edges[0].node.id
    );

    return await Promise.resolve(response.data.data.business.invoices.edges);
  } catch (err) {
    console.log(err.message);
  
  }
};



export const deleteInvoice = async(id) => {
  const invoiceId = id;
  const token = "zCtQa00zlorbFFum6I7Rlzc0QwMDoS";
  const shema = ` 
  mutation ($input: InvoiceDeleteInput !) {
    invoiceDelete(input: $input) {

      didSucceed
      inputErrors {
        path
        code
        message
      }
    }
  }`;

  //About to submit my shema to waveapps
  const bussID = "QnVzaW5lc3M6ZTIyZmVhODEtNjg5OC00N2ZiLTgzOGItYWMyYzllNDZiM2Jk";
  await fetch("https://gql.waveapps.com/graphql/public", {
    method: "POST",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: shema,
      variables: {
        input: {
          invoiceId: invoiceId,
        },
      },
    }),
  })
    .then((r) => r.json())
    .then((data) => console.log(data));

  //console.log("return delete invoice complete")
  return "return invoice";
};

export const addItemInvoice = async(inv) => {

  console.log("CREATE add item INVOICE WELCOME");

  try {
    const bussID =
      "QnVzaW5lc3M6ZTIyZmVhODEtNjg5OC00N2ZiLTgzOGItYWMyYzllNDZiM2Jk";
    const token = "zCtQa00zlorbFFum6I7Rlzc0QwMDoS";
    const shema = ` 
  mutation ($input: InvoiceCreateInput!) {
      invoiceCreate(input: $input) {
          didSucceed
          inputErrors {
              message
              code
              path
          }
          invoice {
              id
              createdAt
              modifiedAt
              pdfUrl
              viewUrl
              status
              title
              subhead
              invoiceNumber
              invoiceDate
              poNumber
              customer {
                  id
                  name
                  # Can add additional customer fields here
              }
              currency {
                  code
              }
              dueDate
              amountDue {
                  value
                  currency {
                      symbol
                  }
              }
              amountPaid {
                  value
                  currency {
                      symbol
                  }
              }
              taxTotal {
                  value
                  currency {
                      symbol
                  }
              }
              total {
                  value
                  currency {
                      symbol
                  }
              }
              exchangeRate
              footer
              memo
              disableCreditCardPayments
              disableBankPayments
              itemTitle
              unitTitle
              priceTitle
              amountTitle
              hideName
              hideDescription
              hideUnit
              hidePrice
              hideAmount
              items {
                  product {
                      id
                      name
                      # Can add additional product fields here
                  }
                  description
                  quantity
                  price
                  subtotal {
                      value
                      currency {
                          symbol
                      }
                  }
                  total {
                      value
                      currency {
                          symbol
                      }
                  }
                  account {
                      id
                      name
                      subtype {
                          name
                          value
                      }
                      # Can add additional account fields here
                  }
                  taxes {
                      amount {
                          value
                      }
                      salesTax {
                          id
                          name
                          # Can add additional sales tax fields here
                      }
                  }
              }
              lastSentAt
              lastSentVia
              lastViewedAt
          }
      }
  }`;

    //About to submit my shema to waveapps
    await fetch("https://gql.waveapps.com/graphql/public", {
      method: "POST",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: shema,
        variables: {
          input: {
            businessId: bussID,
            customerId: inv.customer,
            items: inv.items,
          },
        },
      }),
    })
      .then((r) => r.json())
      .then((data) => console.log(data, "ADD ITEM INV"));
  } catch (err) {
    console.log(err, "522 error invoice")
  }
  console.log("ADDED NEW ITEM TO INVOICE");
  return "invoices";
};

export const removeItemInvoice = (inv) => {

  console.log("REMOVE ITEM");

  const token = "zCtQa00zlorbFFum6I7Rlzc0QwMDoS";
  const shema = ` 
  mutation ($input: InvoiceCreateInput!) {
      invoiceCreate(input: $input) {
          didSucceed
          inputErrors {
              message
              code
              path
          }
          invoice {
              id
              createdAt
              modifiedAt
              pdfUrl
              viewUrl
              status
              title
              subhead
              invoiceNumber
              invoiceDate
              poNumber
              customer {
                  id
                  name
                  # Can add additional customer fields here
              }
              currency {
                  code
              }
              dueDate
              amountDue {
                  value
                  currency {
                      symbol
                  }
              }
              amountPaid {
                  value
                  currency {
                      symbol
                  }
              }
              taxTotal {
                  value
                  currency {
                      symbol
                  }
              }
              total {
                  value
                  currency {
                      symbol
                  }
              }
              exchangeRate
              footer
              memo
              disableCreditCardPayments
              disableBankPayments
              itemTitle
              unitTitle
              priceTitle
              amountTitle
              hideName
              hideDescription
              hideUnit
              hidePrice
              hideAmount
              items {
                  product {
                      id
                      name
                      # Can add additional product fields here
                  }
                  description
                  quantity
                  price
                  subtotal {
                      value
                      currency {
                          symbol
                      }
                  }
                  total {
                      value
                      currency {
                          symbol
                      }
                  }
                  account {
                      id
                      name
                      subtype {
                          name
                          value
                      }
                      # Can add additional account fields here
                  }
                  taxes {
                      amount {
                          value
                      }
                      salesTax {
                          id
                          name
                          # Can add additional sales tax fields here
                      }
                  }
              }
              lastSentAt
              lastSentVia
              lastViewedAt
          }
      }
  }`;

  //About to submit my shema to waveapps
  const bussID = "QnVzaW5lc3M6ZTIyZmVhODEtNjg5OC00N2ZiLTgzOGItYWMyYzllNDZiM2Jk";
  fetch("https://gql.waveapps.com/graphql/public", {
    method: "POST",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: shema,
      variables: {
        input: {
          businessId: bussID,
          customerId: inv.customer,
          items: inv.items,
        },
      },
    }),
  })
    .then((r) => r.json())
    .then((data) => console.log(data, "removed item in INV"));

  console.log("REMOVE ITEM INV TO INVOICE");
  return "invoices";
};

export class Invoice {
  constructor(inv_id, customer) {
    this._id = inv_id;
    this._customer = customer;
    this._items = []; // this  should be an array of dictionarys.
  }

  addItem(prod) {
    

    if (prod.length !== 0) {
      //   console.log("REALLY ADDING NEW ITEMS")
      this.items.push({
        productId: prod.id,
        quantity: prod.qty,
      });
    }
  }



  removeitem(prod) {

    console.log(this.items, "this is prod");
    let found = false;
    if (prod.length !== 0) {
      // let newlist = this._items.pop(prod.id)
      //  console.log(newlist, "New list removed")
      let newlist = this._items.filter(function (obj) {
        if (found == false) {
          console.log(obj.productId, " THIS IS OBJ ID");
          console.log(prod.id, "This is PROD ID");
          if (obj.productId == prod.id) {
            found = true;
          }
          return obj.productId !== prod.id;
        } else {
          console.log("else active");
          return true;
        }
      });
      console.log(typeof newlist);
      console.log(newlist[0]);

      this._items = newlist;
      console.log(this.items, "THIS IS REMOVED ITEM");
    }
  }

  addqty(prod, newqty ) {
    // we need to find the item.
    // we change the qty of this item.
    console.log(this.items, "this is prod");
    let updateitem;
    let found = false;
    if (prod.length !== 0) {
      // let newlist = this._items.pop(prod.id)
      //  console.log(newlist, "New list removed")
      let newlist = this._items.filter(function (obj) {
        if (found == false) {
          console.log(obj.productId, " THIS IS OBJ ID");
          console.log(prod.id, "This is PROD ID");
          if (obj.productId == prod.id) {
            found = true;
            updateitem = obj;
          }
          return obj.productId !== prod.id;
        } else {
          console.log("else active");
          return true;
        }
      });

      // adding qty to the item needing to update
      let num = parseFloat(updateitem.quantity) + newqty;
      console.log(num);
      updateitem.quantity = num;
      newlist.push(updateitem);

      this._items = newlist;
    }
  }

  
  removeqty(prod, newqty ) {
    // we need to find the item.
    // we change the qty of this item.
    console.log(this.items, "this is prod");
    let updateitem;
    let found = false;
    if (prod.length !== 0) {
      // let newlist = this._items.pop(prod.id)
      //  console.log(newlist, "New list removed")
      let newlist = this._items.filter(function (obj) {
        if (found == false) {
          console.log(obj.productId, " THIS IS OBJ ID");
          console.log(prod.id, "This is PROD ID");
          if (obj.productId == prod.id) {
            found = true;
            updateitem = obj;
          }
          return obj.productId !== prod.id;
        } else {
          console.log("else active");
          return true;
        }
      });

      // adding qty to the item needing to update
      let num = parseFloat(updateitem.quantity) - newqty;
      
      if( num >0){
        updateitem.quantity = num;
        newlist.push(updateitem);

      }else{
        updateitem.quantity =0;
        newlist.push(updateitem);
      }

      this._items = newlist;
    }
  }



  get id() {
    return this._id;
  }

  get customer() {
    return this._customer;
  }

  get items() {
    return this._items;
  }
}


export default createInvoice;
