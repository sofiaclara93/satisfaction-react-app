import React, { Component, PropTypes } from 'react';
import './comments.css';

class Comments extends Component {

  // getComments = () => {
  //   const url = "https://chartbeat.zendesk.com/api/v2/satisfaction_ratings.json?score=good&start_time=1514764800"
  //
  //   let headers = new Headers();
  //
  //   // headers.append('Authorization', 'Basic ' + process.env.ZENDESK_KEY);
  //   headers.append('Authorization', 'Basic ' + 'c29maWFAY2hhcnRiZWF0LmNvbTpjaGFydGJlYXR0ZXN0');
  //
  //   fetch(url, {
  //     credentials: 'include',
  //     headers: headers
  //   })
  //     .then(function(data){
  //       console.log(data.json);
  //       return data.json();
  //     }).then(function(jsonData){
  //       console.log(jsonData);
  //       return jsonData;
  //     })
  //     .catch(function(error){
  //       console.log(error);
  //     });
  // }

// create function that collects only comments
// create function that randomizes comments

  renderComments() {
    return(
      <div>"The Support of Alicia was great. But I was still sad, that we didnt receive any information about the leave of Blake Liut and the new assigned account manager Krista. I assume this should be part of the service for your customers to keep them updated about changes which affects their contracts and support. Thanks a lot, Eman"</div>
      // this.getComments()
    );
  }

  render(){
    return(
      <div className="comments-block">
        {this.renderComments()}
      </div>
    );
  }

}

export default Comments;