import React, { Component, PropTypes } from 'react';
import './rating.css';

class Rating extends Component {

// create function that gets percentage based on good/total

renderRating() {
  return(
    <div className="sat-percentage">
      <h3>Customer Satisfaction</h3>
      <div className="score">{this.props.score + "%"}</div>
    </div>
  );
}

renderSummary() {
  return(
    <div className="metrics-summary">
      <ul className="metrics-list">
        <li>
          <p className="metric-score">
            {this.props.goodRating}
          </p>
          <p className="metric">
            Good Ratings
          </p>
        </li>
        <li>
          <p className="metric-score">
            {this.props.badRating}
          </p>
          <p className="metric">
            Bad Ratings
          </p>
        </li>
        <li>
          <p className="metric-score">
            {this.props.responseRate + "%"}
          </p>
          <p className="metric">
            Response Rate
          </p>
        </li>
      </ul>
    </div>
  )
}

  render(){
    return(
      <div className="sat-ratings">
        {this.renderRating()}
        {this.renderSummary()}
      </div>
    );
  }
}

export default Rating;
