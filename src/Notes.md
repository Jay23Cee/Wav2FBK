2/220/2022

We can now delete invoice by it's invoice ID.

we found a way to add more items into the invoice.
possibly add Quantity to our order to avoid duplicates. 

need to add a "ADD ITEM TO INVOICE" function. Item_Add_Invoice

=============================


2/19/2022

We are now able to get Item product and Customers.
from there we can now create Invoice.

Creating Invoice: 
  THis should only be trigger by an Admin. 
  - From this creation only edit would be able to get done through the facebook live comments. 


Facebook User Information.
Create a sign up with a facebook button click. 


========================================================


2/12/2022

we are unable to get data outside of the then fetch.
there's needs to be a way to get that data out of there.
Promise.resolve() is said to be the solution. somehow now working.

Need to use USESTATE OR useeffect. that might resolve this.
https://designcode.io/react-hooks-handbook-fetch-data-from-an-apihttps://designcode.io/react-hooks-handbook-fetch-data-from-an-api


==============================================
2/11/2022
Added Products to this. We are able to retrieve the list of item.
Current goal was to display that list onto the screen. 

But that could be delay.

Next could be working on creating a invoice.
This part has already been done but now we need to implement a 
customer and product id.

Giant Leap.

we still need to get customers.


customer dictionary will need to be created.

problem: error:  One of the error coming up is that there's no data coming from dictionary. it's string type but won't display in JSX
--------------------------------------



2/6/2022.
A dictionary will need to be created on  a seperate js page.

The following mutations , quary is for Items to create invoice.
Business Product

Getting customers ID
                        # Write queries in this panel
                        # Press Play button to evaluate (Ctrl+Enter)
                        # Use Ctrl+Space for auto-complete

                        # List your businesses
                        query {
                        businesses {
                            
                            edges {
                                
                            node {
                                id
                                name
                                customers{
                                edges{
                                    node{
                                    id
                                    name
                                    }
                                }
                                }
                            
                            }
                            }
                        }
                        }



Get Invoice Item ID and name
# Write queries in this panel
# Press Play button to evaluate (Ctrl+Enter)
# Use Ctrl+Space for auto-complete

# List your businesses
query {
  businesses {
    
    edges {
     	
      node {
        id
        name
        products{
          edges{
          node{
            id
						name
          }
          }
        }
      
      }
    }
  }
}



------------------------------------
1/22/2022

I am now able to create a invoice.
Turns out I need customer ID.
Including Item IDS.

in order to create an invoice.

Still needs some adjusting. 
--------------------------------------



1/19/2022 
Currently working with creating an Invoice.
Creating the Invoice is almost complete. at the momment.
I am unable to find the PRODUCT ID. this is the item that is being sold.

Need to brainstorm how to organize this better because we are connecting
to the live apps.



-------------------------------------------
1/18/2022

Routers have been fixed. we have /Success and /

Next need to do is. CREATING AN INVOICE.
            No Items Create.
            but need to find a way to retrieve an ITEM.
                key word?
            
Later: Have Invoice be created and edit based on keywords. 

customer needs better authentication before being created.



===============================

1/17/2022

Currently working on Routes. Trying to get a certain section of the page to switch base on the URL.

It's going to be the register place and then the success page. 

currently getting error on APP.JS

-----------------

1/15/2022 
Customers are now able to be created to the Wave apps.

Textfield is cleared after creating a new one.

Currently working on the browser router.
    - Possibly creating a invoice with a keyword

    


1/13/2022

We are now able to officially create a customer using the UI.

UI needs better adjustments.

next we need to create an INVOICE.
Maybe add ITEMS using the WAVE INTERFACE.
The rest code for invoice on those items. .



1/9/2022.

Business ID was found through the PLAYGROUND
https://developer.waveapps.com/hc/en-us/articles/360018937431-API-Playground

We are now able to create a customer using the GRAPHQL.

Need to do.

Create
Items
Invoice

Edit
Customer
Items
Invoice


Create Customer example
https://developer.waveapps.com/hc/en-us/articles/360032569232-Mutation-Create-customer

schema types
https://developer.waveapps.com/hc/en-us/articles/360019968212-API-Reference

GraphQL mutations
https://graphql.org/graphql-js/mutations-and-input-types/