import React, { Component, PropTypes } from 'react';
import './benchmarks.css';

class Benchmarks extends Component {


  renderReceived() {
    return(
    <div className= "tickets-received">
      <h3 className="bench-header">Tickets Received</h3>
      <ul className="received-list">
        <li>
          <p className="today">Today</p>
          <p className="today-value">
            {this.props.todayReceived}
          </p>
        </li>
        <li>
          <p className="thirtyday">30 Days</p>
          <p className="thirtyday-value">
            {this.props.thirtyDaysReceived}
          </p>
        </li>
      </ul>
    </div>
    )
  }

  renderSolved() {
    return(
      <div className= "tickets-solved">
        <h3 className="bench-header">Tickets Solved</h3>
        <ul className="solved-list">
          <li>
            <p className="today">Today</p>
            <p className="today-value">
              {this.props.todaySolved}
            </p>
          </li>
          <li>
            <p className="thirtyday">30 Days</p>
            <p className="thirtyday-value">
              {this.props.thirtyDaysSolved}
            </p>
          </li>
        </ul>
      </div>
    )
  }



  render(){
    return(
      <div className="benchmarks-bar">
        {this.renderReceived()}
        {this.renderSolved()}
      </div>
    );
  }

}

export default Benchmarks;
