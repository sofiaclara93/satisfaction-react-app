import React, { Component, PropTypes } from 'react';
import './rating.css';

class Rating extends Component {

renderRating() {
  return(
    <div className="sat-percentage">
      <h3 className="sat-title">Customer Satisfaction</h3>
      <div className="score">{this.props.score + "%"}</div>
    </div>
  );
}

renderSummary() {
  return(
    <div className="metrics-summary">
      <ul className="metrics-list">
        <li>
          <p className="metric">
            Good Ratings
          </p>
          <p className="metric-score">
            {this.props.goodRating}
          </p>
        </li>
        <li>
          <p className="metric">
            Bad Ratings
          </p>
          <p className="metric-score bad">
            {this.props.badRating}
          </p>
        </li>
        <li>
          <p className="metric">
            Response Rate
          </p>
          <p className="metric-score rate">
            {this.props.responseRate + "%"}
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
