import Item from "antd/lib/list/Item";
import { fn } from "jquery";
import React, { useEffect, useState } from "react";



export const Products = async ()=>{ 
    let list 
    const Items_available = {}

    

    let ss
    const token = 'zCtQa00zlorbFFum6I7Rlzc0QwMDoS';
        const shema =` 
        query ($businessId: ID!, $page: Int!, $pageSize: Int!) {
            business(id: $businessId) {
            id
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

    `


 //About to submit my shema to waveapps
    const  bussID=  "QnVzaW5lc3M6ZTIyZmVhODEtNjg5OC00N2ZiLTgzOGItYWMyYzllNDZiM2Jk"
   let response = await fetch('https://gql.waveapps.com/graphql/public', {
    method: 'POST',
    headers: {
      'Authorization': token ? `Bearer ${token}` : "",
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: shema,
      variables: { 
        
           
                
                    "businessId":bussID,
                    "page":1,
                    "pageSize": 50,
              
            
          }
    
      })
    }).then(r=>r.json())

    .then(data =>{ 
       
        console.log(data, "PRODUCTS 91 LIST!!!!")
        var size = data["data"]["business"]["products"]["edges"].length
        list = data["data"]["business"]["products"]["edges"]
        for (let x = 0; x < size; x++) {
            var Iid = data["data"]["business"]["products"]["edges"][x]["node"]["id"]
            var Iname = data["data"]["business"]["products"]["edges"][x]["node"]["name"]
            var Iprice = data["data"]["business"]["products"]["edges"][x]["node"]["unitPrice"]
            
            let newProd = new Product(Iid, Iname, Iprice)
            
            Items_available[x] = newProd
            
        }
        
        
    });
    
    
    // console.log("\n\n----------------OUT VVVVVVV-----------------------------\n\n")

    // console.log(Items_available)
    // console.log("listt:  ", Promise.resolve(Product_Data))
    // console.log("\n\n----------------end out-----------------------------\n\n")

   
    return Promise.resolve(  response)
     
}





export class Product {
    constructor(item_id, item_name, item_price) {
        this._id = item_id
        this._name = item_name
        this._price = item_price
    }
    
    
    get id(){
        return this._id
    } 
    
    get name(){
        return this._name
    }
    
    get price(){
        return this._price
    }
    
}
export default Products;