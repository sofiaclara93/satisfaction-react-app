import React, { Component, PropTypes } from 'react';
import './benchmarks.css';

class Benchmarks extends Component {


  renderReceived() {
    return(
    <div className= "tickets-received">
      <h3 className="bench-header">Tickets Received</h3>
      <ul className="received-list">
        <li>
          <div className="today">
            Today
          </div>
          <div className="today-value">
            #
          </div>
        </li>
        <li>
          <div className="30day">
            30 days
          </div>
          <div className="30day-value">
            #
          </div>
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
            <div className="today">
              Today
            </div>
            <div className="today-value">
              #
            </div>
          </li>
          <li>
            <div className="30day">
              30 days
            </div>
            <div className="30day-value">
              #
            </div>
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
