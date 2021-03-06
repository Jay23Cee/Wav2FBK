import Item from "antd/lib/list/Item";
import { fn, type } from "jquery";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";
import { ProvidedRequiredArgumentsOnDirectivesRule } from "graphql/validation/rules/ProvidedRequiredArgumentsRule";
import {Customer} from "./customer"
import { display } from "@mui/system";

const API_URL = 'https://gql.waveapps.com/graphql/public'
 const  bussID=  "QnVzaW5lc3M6ZTIyZmVhODEtNjg5OC00N2ZiLTgzOGItYWMyYzllNDZiM2Jk"
//const bussID=   "QnVzaW5lc3M6YTQwNTY3NjgtY2IyZS00MzFiLWIxYWUtYjhmMWE0ZDdkNjk0"


export  const Products = async ()=>{ 
    
    console.log("honk honk")
    let Product_list = new Map();
    let customer_list = new Map();
    
    // useEffect(() => {
        
        let list 
        const Items_available = {}
        
        
        //const token = "SfAXaswa3yTwWxRnmrAMU5YwZllvo9";
        const token = "zCtQa00zlorbFFum6I7Rlzc0QwMDoS"
        const shema =` 
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
                                
                                `
                                
                                
                                //About to submit my shema to waveapps
                                    const endpoint = 'https://api.waveapps.com/oauth2/authorize/'
                                     const  bussID=  "QnVzaW5lc3M6ZTIyZmVhODEtNjg5OC00N2ZiLTgzOGItYWMyYzllNDZiM2Jk"
                                   // const bussID=   "QnVzaW5lc3M6YTQwNTY3NjgtY2IyZS00MzFiLWIxYWUtYjhmMWE0ZDdkNjk0"
                                //    let response = await fetch(endpoint, {
                                    //     method: 'POST',
                                    //     headers: {
                                        //       'Authorization': token ? `Bearer ${token}` : "",
                                        //       'Content-Type': 'application/json',
                                        //     },
                                        //     body: JSON.stringify({
                                            //       query: shema,
                                            //       variables: { 
                                                
                                                
                                                
                                                //                     "businessId":bussID,
                                                //                     "page":1,
                                                //                     "pageSize": 50,
                                                
                                                
                                                //           }
                                                
                                                //       })
                                                //     }).then(r=>r.json())
                                                
                                                //     .then(data =>{ 
                                                    
                                                    
                                                    //         // var size = data["data"]["business"]["products"]["edges"].length
                                                    //         // list = data["data"]["business"]["products"]["edges"]
                                                    //         // for (let x = 0; x < size; x++) {
                                                        //         //     var Iid = data["data"]["business"]["products"]["edges"][x]["node"]["id"]
                                                        //         //     var Iname = data["data"]["business"]["products"]["edges"][x]["node"]["name"]
                                                        //         //     var Iprice = data["data"]["business"]["products"]["edges"][x]["node"]["unitPrice"]
                                                        
                                                        //         //     let newProd = new Product(Iid, Iname, Iprice)
                                                        
                                                        //         //     Items_available[x] = newProd
                                                        
                                                        //         // }
                                                        
                                                        
                                                        //     });
                                                        
                                                        
                                                        // console.log("\n\n----------------OUT VVVVVVV-----------------------------\n\n")
                                                        
                                                        // console.log(Items_available)
                                                        // console.log("listt:  ", Promise.resolve(Product_Data))
                                                        // console.log("\n\n----------------end out-----------------------------\n\n")
                                                        
                                                        
                                                        
                                                        
                                                        
                                                        let response = await axios(API_URL, {
                                                            method: 'post',
                                                            
                                                            
                                                            headers: {
                                                                  'Authorization': token ? `Bearer ${token}` : "",
                                                                  'Content-Type': 'application/json',
                                                                },
                                                                data:{  
                                                                      query: shema,
                                                                      variables: { 

                                                                                        "businessId":bussID,
                                                                                        "page":1,
                                                                                        "pageSize": 50,
                                                                    
                                                                    
                                                                              }
                                                                    
                                                                         
                                                                    }  })
                                                     //   list = response.data["data"]["business"]["products"]["edges"]  
                                                    
                                                       let prod_size = response.data["data"]["business"]["products"]["edges"].length
                                                        let prod = response.data["data"]["business"]["products"]["edges"]

                                                       for (let x=0; x<prod_size; x++){
                                                        
                                                            let name = prod[x]["node"]["name"]
                                                            let id = prod[x]["node"]["id"]
                                                            let qty = prod[x]["node"]["quantity"]
                                                            let temp_prod = new Product(id, name, qty)
                                                            Product_list.set(name,temp_prod)
                                                            console.log("THIS IS THE QTY", qty)
                                                       }
                                                       
                                                       
                                                       let cust_size = response.data["data"]["business"]["customers"]["edges"].length
                                                       let cust = response.data["data"]["business"]["customers"]["edges"]
 
                                                      for (let x=0; x<cust_size; x++){
                                                     
                                                           let name = cust[x]["node"]["name"]
                                                           let id = cust[x]["node"]["id"]
                                                           let displayid = cust[x]["node"]["displayId"]
                                                           let key = name +" " +displayid
                                                        //    console.log(key, "THIS IS FUTURE KEY")
                                                           let temp_cust = new Customer(name, "", "","",id,displayid)
                                                           customer_list.set( key,temp_cust)
                                                      }

                                                    //   console.log(customer_list, "| This is Customer list")
                                                    //   console.log(Product_list, " | This is the Product List")
                                                       //console.log(myitem.data["data"]["business"]["products"]["edges"][0]["node"]["name"], "MYITEM YAY ZERO  ", typeof(myitem[0]))
                                                       //console.log(myitem.data["data"]["business"]["customers"]["edges"][0]["node"]["name"], "MYITEM YAY ZERO  ", typeof(myitem[0]))                  
                                                      
                                                    //  console.log(find("Jack",customer_list),"CUSTOMER LIST YALL")
                                                      

                                                        // console.log(response.error)
                                                                    return [Product_list, customer_list]
                                                                    //return [Promise.resolve(Product_list), Promise.resolve(customer_list)]
                                                    
                                                                    }
                                                    
                                                    
export class Product {
    constructor(item_id, item_name,  qty) {
        this._id = item_id
        this._name = item_name
        this._qty = qty
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

    get qty(){
        return this._qty
    }

}




export default Products;