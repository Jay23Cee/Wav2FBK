import React, { Component } from 'react'
import  FacebookLogin  from 'react-facebook-login' 



export default class Facebook extends Component {
    state = {
        isLoggedIn:false,
        userId:'',
        name:'',
        email:'',
        picture:''
    };

   


    responseFacebook= response=> {
        //console.log(response);


        this.setState({
            isLoggedIn: true,
            userId:response.userId,
            name:response.name,
            email:response.email,
        
        })
    }

    componentClicked=()=>console.log("click")

    render() {
        let fbContent;

        if(this.state.isLoggedIn){
            fbContent=(
                <div style={{
                    width:'400px',
                    margin:'auto',
                    background: '#f4f4f4',
                    padding: '20px'
                }}>
                    <h2>Welcome {this.state.name}</h2>
                    Email: {this.state.email}
                </div>
            );
        }else{
fbContent = (
  <FacebookLogin
    appId="2070469153107478"
    autoLoad={true}
    fields="name,email"
    onClick={this.componentClicked}
    callback={this.responseFacebook}
  />
);
        }


        return (
            <div>
                {fbContent}
            </div>
        )
    }
}

var userid = ""
var accesstoken = "EAAdbFKpjrhYBAGDFuTQfj3pPrlTzvCghWAajyUMHhlpSW5TiPIouPyWqbWAnmkDJHn3w3qHiUjYL2TqeyVyeKj8Dv9uJ27mjZATfZAiVULVxEdeHtubBEmAnP9yg8Hy7cZACjq6Lad5aMII5PDCdnrtUVNPInp1k6m0v54fB6Ifz1LWAEfhs3tukcNhKaPdqj1ZBJ2HXuZAoHt30x0R3vKb4kvpawnwgvgLcTFlKk6Hmo3kopEgDgK80v0QPJ7ikZD"

var videoID = "1918597575014780"
var live_url= "https://streaming-graph.facebook.com/"+videoID+"/live_comments?access_token=" + accesstoken+"&comment_rate=one_hundred_per_second&fields=from{name,id},message"

var source = new EventSource(live_url);

source.onmessage = function(event) {

    var result = JSON.parse(event["data"])

    
   // console.log("EVENT_: ", event)
    console.log("Message:_ ", result["message"])

  // userid = String( result["id"]).replace(videoID+"_", "")

  if (result["from"] != null){
    console.log("FROM ! !:", result["from"])
  }
   console.log("type of data:", result )



};





// var source = new EventSource("https://streaming-graph.facebook.com/{live-video-id}/live_comments?access_token={access-token}&comment_rate=one_per_two_seconds&fields=from{name,id},message");
// source.onmessage = function(event) {
//   // Do something with event.message for example
// };



// TOKEN
// EAAdbFKpjrhYBANmtC1rABZApft8PwCnaIHwq85ZC1f6Yu6T9vAdibKyRpJE8kZAaxUDl50uFXtcGP9UiDLao646DDxXXSWTbS4TgyEEHHDJo3DseoO3tVOprNJ9CnIm74GFmIv1CF0JiUOIg9CMVlBoIRPgEBARgDVYJQUYjzFobGMZAYPvn3VMVGBKA3ON1O4oyjD8oGcuagSFglX6TnxmwCulfAWXUZAZAbArsZCWsOSjx1kJhZC0GhD4HjFbdcNcZD