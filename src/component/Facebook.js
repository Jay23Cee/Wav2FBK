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
var accesstoken = "EAAdbFKpjrhYBAPxX8JCD0F3y881ZCSzYmUMLMCa1MROZBnZC44o2vwYTL0dn4YHNAACG926Elxf3HQAk2qKvBUER9g6Mv3GgtKZC46f5bVB5Wgr024IvshQZCEZAwiCx0kXwkZAdxYV05h8ka4Ky8tbXUTJ2gxcZBPm3NzFuwO072yfdj7BRawv2HvtqsYGcZCPRnZBhlXB9lQu3JX1MlHZBfJSvmMAWFkkHuDe249ZB0pvqI2WX1SAeZAcnfvlTZBG8OZBnV4ZD"


var videoID = "657179922314657"

var source = new EventSource("https://streaming-graph.facebook.com/"+videoID+"/live_comments?access_token=" + accesstoken+"&comment_rate=one_hundred_per_second&fields=from{name,id},message");

source.onmessage = function(event) {

    var result = JSON.parse(event["data"])

    
   // console.log("EVENT_: ", event)
    console.log("Message:_ ", result["message"])

  // userid = String( result["id"]).replace(videoID+"_", "")

  if (result["from"] != null){
    console.log("FROM ! !:", result["from"])
  }
  // console.log("type of data:", result )



};





// var source = new EventSource("https://streaming-graph.facebook.com/{live-video-id}/live_comments?access_token={access-token}&comment_rate=one_per_two_seconds&fields=from{name,id},message");
// source.onmessage = function(event) {
//   // Do something with event.message for example
// };



// TOKEN
// EAAdbFKpjrhYBANmtC1rABZApft8PwCnaIHwq85ZC1f6Yu6T9vAdibKyRpJE8kZAaxUDl50uFXtcGP9UiDLao646DDxXXSWTbS4TgyEEHHDJo3DseoO3tVOprNJ9CnIm74GFmIv1CF0JiUOIg9CMVlBoIRPgEBARgDVYJQUYjzFobGMZAYPvn3VMVGBKA3ON1O4oyjD8oGcuagSFglX6TnxmwCulfAWXUZAZAbArsZCWsOSjx1kJhZC0GhD4HjFbdcNcZD