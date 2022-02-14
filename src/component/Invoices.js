import  { Products,Product } from "./Products";



const createInvoice = ()=> { 

    let id = ""
    let Newprod= Products();
    
    Newprod.then(data=>{ 
        console.log(data[0]["node"]["id"], " PORMIS RESOLVE")
        id =data[0]["node"]["id"];
        console.log(id, " unwrape ")
    }
        
        )

    console.log(Newprod, " HE HE I AM INVOICE")
    console.log(id, " unwrape ")
    
  

 
      

    const token = '6ZhLr2S7uyj0DMLqfouhxFl164HFeJ';
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


// About to submit my shema to waveapps
    // const bussID =  "QnVzaW5lc3M6MmU0YTUwMzQtYTI1Mi00ODY4LThkMTYtN2QzNDBjYmE0NzZi"
    // fetch('https://gql.waveapps.com/graphql/public', {
    // method: 'POST',
    // headers: {
    //   'Authorization': token ? `Bearer ${token}` : "",
    //   'Content-Type': 'application/json',
    // },
    // body: JSON.stringify({
    //   query: shema,
    //   variables: { 
        
    //         "input": {
    //           "businessId":bussID,
    //           "customerId": "QnVzaW5lc3M6MmU0YTUwMzQtYTI1Mi00ODY4LThkMTYtN2QzNDBjYmE0NzZiO0N1c3RvbWVyOjYwNjI3Nzg2",
    //           "items": [
    //             {
    //               "productId": "QnVzaW5lc3M6MmU0YTUwMzQtYTI1Mi00ODY4LThkMTYtN2QzNDBjYmE0NzZiO1Byb2R1Y3Q6NzIwOTM5Mjc="
    //             }
    //           ]
    //         }
    //       }
    
    //   })
    // })
    // .then(r => r.json())
    // .then(data => console.log(data));

    console.log("CREATED INVOICE")
    return "invoices"
}


export default createInvoice;