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





var source = new EventSource("https://streaming-graph.facebook.com/620229992279431/live_comments?access_token=EAAdbFKpjrhYBADYRV7xA6tZC5z7hzaKapj5DM5jtSa32ZCr3ay01RaYLohx3wgIEQuZCNz0IQt1SGHiBaTKRS1QHZABhVcmwzzGNueRYsCcBacwZCC4es7GtKBxDxRiqbzZBQJ0VwrslT2srex2Dgwk59AHeiU2pd8extfGZBODq8NZAaPcUxkwTmidsWmyUBwDOsqsCChnGZAE3fZAB5HB9bNNOGlkKrxx9aZCrIQxJG9jOZCc2SfulZCHrVbgMfFJTMuokZD&comment_rate=one_per_two_seconds&fields=from{name,id},message");
source.onmessage = function(event) {
    var result = JSON.parse(event["data"])

    
   // console.log("EVENT_: ", event)
    console.log("DATA:_ ", result["message"])

   console.log("type of data:", event["data"])
  
    

  // Do something with event.message for example
};



// var source = new EventSource("https://streaming-graph.facebook.com/{live-video-id}/live_comments?access_token={access-token}&comment_rate=one_per_two_seconds&fields=from{name,id},message");
// source.onmessage = function(event) {
//   // Do something with event.message for example
// };



// TOKEN
// EAAdbFKpjrhYBANmtC1rABZApft8PwCnaIHwq85ZC1f6Yu6T9vAdibKyRpJE8kZAaxUDl50uFXtcGP9UiDLao646DDxXXSWTbS4TgyEEHHDJo3DseoO3tVOprNJ9CnIm74GFmIv1CF0JiUOIg9CMVlBoIRPgEBARgDVYJQUYjzFobGMZAYPvn3VMVGBKA3ON1O4oyjD8oGcuagSFglX6TnxmwCulfAWXUZAZAbArsZCWsOSjx1kJhZC0GhD4HjFbdcNcZD