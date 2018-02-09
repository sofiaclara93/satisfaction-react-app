import React, { Component, PropTypes } from 'react';

class Rating extends Component {

ratingPercentage = () => {
  const url = "https://chartbeat.zendesk.com/api/v2/satisfaction_ratings.json?score=good&start_time=1514764800"

  let headers = new Headers();

  headers.append('Authorization', 'Basic ' + process.env.ZENDESK_KEY);

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

renderRating() {
  return(
    this.ratingPercentage()
  )
}

  render(){
    return(
      <div className="sat-rating">
        {this.renderRating()}
      </div>
    )
  }
}

export default Rating;
