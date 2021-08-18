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
var accesstoken = "EAAdbFKpjrhYBAOY1LdkGga5BeUvjgMAlZAR8EGxROVSrnajQrWWtKZApXM4IFbH2R3klzJjX8WC2f4y1rslzDZCUIVaZAsktYSta5AUi3nqJ05PvUoQoPZCFNyokmczMwhFGFlqxqOTecJiQinJwc3qCKz59o7ymNnXcRmxfirn9ifcaRMIMziQXZB3EudOd3JCYCqTaZAZAk1THaXC2UaS1alMWq2GITBA6V8pEwPIxLCPyEab4nc7E9slqMYLzevIZD"


var videoID = "1246110602508900"

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