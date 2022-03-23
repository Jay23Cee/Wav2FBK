
3/21/2022
Need to make function handle multiple calls.
await is not working and new promise is not working.
==============================================
3/20/2022

CREATING INVOICE. 
    []Items not on invoice need to be added.
   [] If item exist add qty.
    []if it doesn't exist. Add this new Item.

    []Validate New invoice been created before deleting the previos one.

    []Need to find a query every function. and respond in due time.

/////////////////////

3/16/2022

Solve the THEN data to fin if customer is already using this email.
Turns out all i needed was the "AWAIT" function. and made that function a sync function as well.

Now we need a better form and a way to  make sure only emails are added to email.
possibly confirm address?
[x] Need Validations EMAIL
[No] Need Validations ADDRESS.
[No] FORM TEMPLATE with hash
[nO] USE THE .ENV 

[Done]START LOOKING FOR A TEMPLATES


-------------------------------------------------
3/15/2022

THEN DATA in FINDCUST is being callback after the function has been used

---------------------------------------
3/14/2022

Completed Customer Varified Email.

NEED TO HASH THE FORM. look for a better form template

Needs to improve in organizing functions.

Needs Futher Testing.

NEED TO REMOVE THE API , TOKEN, URL from here and include to .ENV.

THEN DATA. 

--------------------------------------
3/13/2022

Looking into making sure CUSTOMERS are varified by EMAIL.
EMAILS check is almost completed 

---------------------------------------
3/11/2022

Customers need need no duplicates allow.
possible by email. If same email ahs been reported.. no creation. deny ..



------------------------------------------------------------------

3/10/2022

Invoice:
  If item already exist. don't create a new input but add qty.

  I have adjusted the trigger comment.
  adjusted only the QTY of an item.

  STILL NEED TO TEST:
  The Delete all button
----------------------------------------
3/8/2022


Comment reading is not directiong properly to where it needs to go 
needs futher testing.


---------------------------------------------
3/6/2022
2100: Comment are now being monitor. when a trigger words are found it activates a purchase.

we need to implement the REMOVE ITEM and DECREMENT QTY


We need to know if we are adding a Brand NEW item or if it's adding qty to a existing 

we can use the find function.  
      customer        item

  

/////////////////////////////////////////
3/5/2022

We need a better way to add items and removed items. 

Removed entire Item. [ This is done]
Removed qty from item.


add qty to an item
add entire new item. [This is done]
----------------------------------------------


3/1/2021. 

Turns out we can also search for EMOJI. they are string objects.
can we add emoji to items?


currently working on getting REGEX to get the VIDEO ID from the live
regex now working..


we need to find and get location of customer and item.
added DISPLAYID to customer. 

-------------------------------------
2/28/2022

We are now able to find a Customer in the UI and most def find this person in the CHAT LIVE.
need a better error harding.

DisplayID on GRAPHQL -> WAVEAPPS IS ACCOUNT NUMBER.
This can be used as identifier for clients. Assign though wave apps.

we can use emoji 😝😝😝😝
------------------------------------------------------------------
2/27/2022

20:09 seems everything is working now through the LIVE COMMENTS. only add need to do remove item.

start clearing and making general clean up code. start making better notes. 

 ------ to add item functions only adds item.
---------- function ONLY TO CALL WAVES. for adding removing items. ONE FUNCTION TO CALL.
--XX Customer done.------ find functions. SHOULD BE FIND CUSTOMER AND ITEMS.
--------- better error handling when there's no invoice. 




BUTTON WORKS FINE. TO ADD INV AND DELETE AND EDIT 

When it comes to the CHAT LIVE. MULTIPLE INVOICES are being created. PREVIOUS IS NOT DELETED.

TURNS OUT MY KEYWORD TRIGGER IS CALLING MY CREATE INVOICE TWICE. weird. need more testing. 

ALMOST THERE. SO ALMOST THERE. 


FACEBOOK LIVE ID:
            NEED TO FIND A BETTER WAY TO HAVE THIS EXTRACTED FROM A URL LINK OR FIND ANOTHER WAY.
            \


BETTER ERROR HANDLING WHEN THERE'S NO INVOICE

===============================

2/26/2021
Invoice will be generated. with empty items.
it will later be used to add items every time.
with doing so the previous version will be deleted.


lets add an item with quantity to invoice. 

lets get the invoice with id number. 



NOTE FOR INVOICES AND CUSTOMERS.
  WE need to find the most recent INVOICE that was created. because that would be the last invoice avaialable.
    this is the invoice that will get deleted and will need to be created as new with new package .. either removed or added. 
     STEP1: GRAB INVOICE BY ID OF CUSTOMER.
     STEP 1B: FIND THE MOST RECENT INVOICE.
     STEP2: EDIT THE ITEMS PRODUCT (ADD OR DELETE QTY ECT.)
     STEP3: CALL FUNCTION TO UPDATE THIS NEW INVOICE. (ONE FUCTIONS FOR ALL. REMOVE AND DELT)
     step 3.b: THIS function should call the delete inv and add the new inv.


END OF DAY NOTES. ::::

We are now able to create a new added item to invoice. 
We need to do one to remove an Item. 
  later we can target that items.


Need to clean up WAVEAPPS. That add item function. need to be added to INVOICE.. 

clean up some of the comments.




FACEBOOK LIVE NOTES:
Need to get the trigger word to make the call to create inv

Seems that needs adjustments.

possibly move the livefb function where there's a useeffect in place.



    
----------------------------------------
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