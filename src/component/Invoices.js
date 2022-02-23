import { useEffect, useState } from "react";
import  { Products,Product } from "./Products";
import axios from "axios";

export const invoicesbycustomer= async() =>{
const API_URL = 'https://gql.waveapps.com/graphql/public'
const  bussID=  "QnVzaW5lc3M6ZTIyZmVhODEtNjg5OC00N2ZiLTgzOGItYWMyYzllNDZiM2Jk"
const token = 'zCtQa00zlorbFFum6I7Rlzc0QwMDoS';

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
      
`

let response = await axios(API_URL, {
    method: 'post',
    
    
    headers: {
          'Authorization': token ? `Bearer ${token}` : "",
          'Content-Type': 'application/json',
        },
        data:{  
              query: shema,
              variables: {
                "businessId": bussID,
                "page": 1,
                "pageSize": 20,
                "customerId": "QnVzaW5lc3M6ZTIyZmVhODEtNjg5OC00N2ZiLTgzOGItYWMyYzllNDZiM2JkO0N1c3RvbWVyOjU2MjMxNzYw"
              }
                  
            
                 
            }  })

console.log(response, "GETTING GETTING INVOICE BY CUSTOMER")

    
}

export const createInvoice = (custid, itemid)=> { 
    console.log("CREATE INVOICE WELCOME")
    
    
    const token = 'zCtQa00zlorbFFum6I7Rlzc0QwMDoS';
    const shema =` 
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
    }`
    
    
    //About to submit my shema to waveapps
    const bussID =  "QnVzaW5lc3M6ZTIyZmVhODEtNjg5OC00N2ZiLTgzOGItYWMyYzllNDZiM2Jk"
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
                    "businessId":bussID,
                    "customerId": custid,
                    "items": [
                        {
                            "productId": itemid,
                            "quantity": 2,
                        },
                      
                    ]
                   
                }
            }
            
        })
    })
    .then(r => r.json())
    .then(data => console.log(data));
    
    console.log("CREATED INVOICE")
    return "invoices"
}




// Delete

export const deleteInvoice= () =>{

  const invoiceId= "QnVzaW5lc3M6ZTIyZmVhODEtNjg5OC00N2ZiLTgzOGItYWMyYzllNDZiM2JkO0ludm9pY2U6MTQwMzUxODM3OTcwNDI5MzYzNg=="
  const token = 'zCtQa00zlorbFFum6I7Rlzc0QwMDoS';
  const shema =` 
  mutation ($input: InvoiceDeleteInput !) {
    invoiceDelete(input: $input) {

      didSucceed
      inputErrors {
        path
        code
        message
      }
    }
  }`
  

  //About to submit my shema to waveapps
  const bussID =  "QnVzaW5lc3M6ZTIyZmVhODEtNjg5OC00N2ZiLTgzOGItYWMyYzllNDZiM2Jk"
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
                  "invoiceId":invoiceId,
                 
              }
          }
          
      })
  })
  .then(r => r.json())
  .then(data => console.log(data));
  




console.log("return delete invoice complete")
  return "return invoice"
}

export default createInvoice;
