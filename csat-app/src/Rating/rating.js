import React, { Component, PropTypes } from 'react';
import './rating.css';

class Rating extends Component {

ratingPercentage = () => {
  const url = "https://chartbeat.zendesk.com/api/v2/satisfaction_ratings.json?start_time=1514764800"

  let headers = new Headers();

  // headers.append('Authorization', 'Basic ' + process.env.ZENDESK_KEY);
  headers.append('Authorization', 'Basic ' + 'c29maWFAY2hhcnRiZWF0LmNvbTpjaGFydGJlYXR0ZXN0');

  fetch(url, {
    credentials: 'include',
    headers: headers
  })
    .then(function(data){
      console.log(data.json);
      return data.json();
    }).then(function(jsonData){
      console.log(jsonData);
      return jsonData;
    })
    .catch(function(error){
      console.log(error);
    });
}

// create function that gets percentage based on good/total

renderRating() {
  return(
    this.ratingPercentage()
  )
}

  render(){
    return(
      <div className="sat-rating">
        25%
        {this.renderRating()}
      </div>
    )
  }
}

export default Rating;
