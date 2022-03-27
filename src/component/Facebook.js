import React, { Component } from "react";
import { useState } from "react";
import { useEffect } from "react";
import FacebookLogin from "react-facebook-login";
import TextField from "@mui/material/TextField";
import additem, { comment_trigger, getData } from "./Wave";
import { get } from "jquery";
import { Token } from "graphql";

let customerslist = "";
let itemlist = "";
export const populatelist = async () => {
 let [itemlist1, customer_list1]= await getData()
itemlist= itemlist1
customerslist=customer_list1
  
};

export const fblive = async (liveid) => {
  if (liveid != null) {
    try {
      const reg = new RegExp("\\d{5,}");
      const found = liveid.match(reg);
      if (found > 0) {
        console.log(found, "  || ", found[0]);
        let activate = false;
        //console.log("LISTENING")
        var userid = "";
        //var accesstoken = process.env.FB_API_TOKEN
        var accesstoken =
          "EAAdbFKpjrhYBAMwZChjQjL8CnkryvIHXAqy4FxDByzkScrxAqLjzA8SjwCAvdHfiQPpQEZAimcSIfHZB6cgc9hjyOUzTJSmT6S3ZBss8oFUku4CHxZB5tMxYML0Hmy6Qe7ZB5wgdINy8XiDcwbZBIfEQsjSt6rQjg8dxi3BZB3pJSfuKFENU8ZAZB2";
        var videoID = found;

        var live_url =
          "https://streaming-graph.facebook.com/" +
          videoID +
          "/live_comments?access_token=" +
          accesstoken +
          "&comment_rate=one_hundred_per_second&fields=from{name,id},message";

        var source = new EventSource(live_url);

        source.onmessage = function (event) {
          var result = JSON.parse(event["data"]);

          //WE NEED A TRIGGER WORD THAT COULD "#" activate READ COMMENT

          let trigger_word = result["message"].search("#");

          console.log(trigger_word, "look here");

          readcomment(result["message"]);

          if (result["from"] != null) {
            console.log("FROM ! !:", result["from"]);
          }
          
        };
      } else {
        console.log("ZERO FOUND");
      }

      // } catch (error) {
      //    throw new Error("Facebook Live error")
      //}
    } catch (error) {
      //throw new Error("VIDEO ID NOT FOUND", error.message)
      console.log("FB LIVE COMMENT IS NOT RUNNING");
    }
  } else {
    console.log("Live ID not valid");
  }
};
export default function Facebook() {
  useEffect(() => {
    fblive(null);
    populatelist()
  });

  const [userId, setuserId] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [picture, setpicture] = useState("");
  const [isLoggedIn, setloggin] = useState(false);
  const [videoUrl, setvideoUrl] = useState("");
  const [livecomment, setlivecomment] = useState("");

  const state = {
    isLoggedIn: false,
    userId: "",
    name: "",
    email: "",
    picture: "",
  };

  let responseFacebook = (response) => {
    //console.log(response);

    this.setState({
      isLoggedIn: true,
      userId: response.userId,
      name: response.name,
      email: response.email,
    });
  };

  let componentClicked = () => console.log("click");

  let fbContent;

  if (state.isLoggedIn) {
    fbContent = (
      <div
        style={{
          width: "400px",
          margin: "auto",
          background: "#f4f4f4",
          padding: "20px",
        }}
      >
        <h2>Welcome {state.name}</h2>
        Email: {state.email}
      </div>
    );
  } else {
    fbContent = (
      <FacebookLogin
        appId="2070469153107478"
        autoLoad={true}
        fields="name,email"
        onClick={componentClicked}
        callback={responseFacebook}
      />
    );
  }
  return (
    <div>
      <br></br>LIVE URL
      <TextField
        value={videoUrl}
        name="videoUrl"
        onChange={(e) => setvideoUrl(e.target.value)}
      />
      <button
        className="videoUrl"
        onClick={() => {
          fblive(videoUrl);
        }}
      >
        VideoUrl live
      </button>
      <br></br> LIVE COMMENT
      <TextField
        value={livecomment}
        name="livecomment"
        onChange={(e) => setlivecomment(e.target.value)}
      />
      <button
        className="videoUrl"
        onClick={() => {
         
          // sending multiple request.  
          for (let x = 0; x < 1; x++) {
            
            readcomment(livecomment);

            readcomment("#112 TREE HELLOW");

             readcomment(livecomment);

            // readcomment("#112 TREE HELLOW");
    
          }
        }}
      >
        VideoUrl live
      </button>
    </div>
  );
}

export const readcomment = async (the_comment) => {
  console.log(" CALLING LIVE READ COMMENT ", the_comment);
  let re = await new Promise((resolve) =>
  setTimeout(
    setTimeout(async function () {
      
      console.log(the_comment);
      
      if (the_comment.includes("#")) {
        populatelist();
        console.log(the_comment);

        let new_string = the_comment.trim().split(" ");
        console.log(new_string, " STRING SPLIT");
        
        let customer_found = await findcust(new_string);
        let item_found = await finditem(new_string);
        
        console.log(customer_found, item_found, "WE FOUND ");
        
        if (customer_found != false && item_found != false) {
          console.log("THERE'S A TRIGGER SALE HERE");
          
          let remove = await find_remov(new_string);
          console.log(remove, "WE ARE LOOKING AT RMOVE ");
          await trigger_active(customer_found,item_found,remove)
      //     let re = await  Promise.all([populatelist,findcust(new_string),finditem(new_string),find_remov(new_string)]).then(async(values)=>{
        console.log(the_comment)
      //   await trigger_active(customer_found,item_found,remove)
       console.log("promise for " , the_comment, " has been fullfilled")

      // })


    }
  }
}, 2000)
)
);
  
};

export const findcust = async (word_list) => {
  //if (list != null && word.length > 0) { }

  console.log(customerslist);
  for (let word in word_list) {
    if (word_list[word].length > 2) {
      for (let [key] of customerslist) {
        let Ukey = key.toUpperCase();
        word = word.toUpperCase();
        console.log(word, " <= word list    || uKey=>", Ukey);
        if (Ukey.includes(word_list[word].toUpperCase())) {
          return word_list[word];
        }
      }
    }
  }

  return false;
};

const finditem = (word_list) => {
  //if (list != null && word.length > 0) { }
  for (let word in word_list) {
    console.log(
      word_list[word].length,
      "WORD LENGTH WORD WORD",
      word_list[word]
    );
    if (word_list[word].length > 3) {
      for (let [key] of itemlist) {
        let Ukey = key.toUpperCase();
        word = word.toUpperCase();
        if (Ukey.includes(word_list[word].toUpperCase())) {
          return word_list[word];
        }
      }
    }
  }
  return false;
};

const find_remov = (word_list) => {
  //if (list != null && word.length > 0) { }
  for (let word in word_list) {
    console.log(word_list[word]);
    if (word_list[word].length >= 2) {
      console.log();
      if (word_list[word].includes("**")) {
        return "removeqty";
      } else if (word_list[word].toUpperCase().includes("-ALL")) {
        return "removeAll";
      }
    }
  }

  return false;
};

const trigger_active = async (customer_found, item_found, remove) => {
  let re = await new Promise((resolve) =>
    setTimeout(
      setTimeout(async function () {
        try {
          console.log("TRIGGER GOING ACTIVE")
          await comment_trigger(customer_found, item_found, remove);
          return Promise.resolve("Complete trigger.")
        } catch (error) {
          console.error(error.response.data)
          
        }
      }, 9000)
    )
  );
};



