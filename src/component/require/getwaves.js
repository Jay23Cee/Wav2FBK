// import { resolveOnChange } from "antd/lib/input/Input";
// import axios from "axios";
// import createCustomer, { Customer } from "../customer";




// export const checkCustomer = async () => {
//   console.log("honk honk");
//   let Product_list = new Map();
//   let customer_list = new Map();
//   let process = require('dotenv').config
//   // useEffect(() => {

//   let list;
//   const Items_available = {};

//   const token = "zCtQa00zlorbFFum6I7Rlzc0QwMDoS";
//   const shema = ` 
//         query ($businessId: ID!, $page: Int!, $pageSize: Int!) {
//             business(id: $businessId) {
//                 id
//                 name
//                 customers{
//                     edges{
//                         node{
//                         id
//                         name
//                         displayId
//                         email
//                         }
//                     }
//                     }
                
//                 products(page: $page, pageSize: $pageSize) {
//                     pageInfo {
//                         currentPage
//                         totalPages
//                         totalCount
//                                             }
//                                             edges {
//                                                 node {
//                                                     id
//                                                     name
//                                                     description
//                                                     unitPrice
//                                                     defaultSalesTaxes {
//                                                         id
//                                                         name
//                                                         abbreviation
//                                                         rate
//                                                     }
//                                                     isSold
//                                                     isBought
//                                                     isArchived
//                                                     createdAt
//                                                     modifiedAt
//                                                 }
//                                             }
//                                         }
//                                     }
//                                 }
                                
//                                 `;

//   //About to submit my shema to waveapps
//   const endpoint = "https://api.waveapps.com/oauth2/authorize/";
//   const bussID = "QnVzaW5lc3M6ZTIyZmVhODEtNjg5OC00N2ZiLTgzOGItYWMyYzllNDZiM2Jk";

//   let response = await axios("https://gql.waveapps.com/graphql/public", {
//     method: "post",

//     headers: {
//       Authorization: token ? `Bearer ${token}` : "",
//       "Content-Type": "application/json",
//     },
//     data: {
//       query: shema,
//       variables: {
//         businessId: bussID,
//         page: 1,
//         pageSize: 50,
//       },
//     },
//   });

 

//   let cust_size = response.data["data"]["business"]["customers"]["edges"].length;
//   let cust = response.data["data"]["business"]["customers"]["edges"];

//   for (let x = 0; x < cust_size; x++) {
//     let name = cust[x]["node"]["name"];
//     let id = cust[x]["node"]["id"];
//     let displayid = cust[x]["node"]["displayId"];
//     let email = cust[x]["node"]["email"].toLowerCase().trim();
   
//     let key = email
//     let temp_cust = new Customer(name, "", email, "", id, displayid);

//     // This is creating the custuomer list. with Key being name + DisplaYiD
//     customer_list.set(key,temp_cust);
//   }

//   console.log(customer_list, "| This is Customer list");
 
//   //  console.log(find("Jack",customer_list),"CUSTOMER LIST YALL")

//   // console.log(response.error)

//  // return Promise.resolve(customer_list)
//     return customer_list
//   //return [Promise.resolve(Product_list), Promise.resolve(customer_list)]
// };



// export const findcust = async( email, firstName, lastName, address, city, postalCode, countryCode) => {
//     //if (list != null && word.length > 0) { }
//     let word_list
//     let cust_list = await checkCustomer()
//     let former_cust= false;
//   console.log("this is cust list on find cust ", cust_list)
//     // cust_list.then((data)=>{
//     word_list = cust_list;
//         console.log("THIS IS THEN DATA")
//         for (const entry of word_list) {

//           console.log(entry[0])
//             for (let word in entry){
//                 console.log(entry[0] ===email)
           
//                 if (entry[0]=== email) {
//                   console.log(" THIS IS NOT A NEW CUSTOMER")
//                    former_cust=true
//                     break;
//                 }
//        }
    
//      }
//     // })
    
    
//      console.log("THIS IS THE FUTURE OF FORMER_CUST", former_cust)

//      if (former_cust==false){
//        // this is a new customer

//        createCustomer(firstName,
//          lastName, 
//          email,
//          address,
//          city,
//          postalCode,
//          countryCode)

//          console.log("CUSTOMER HAS BEEN CREATED")
//      }else{
//        // this customer email already in used
//        console.log("This email has alredy been used")
//      }
//     return former_cust;
//   };
  