import React, { Component } from 'react';
import Rating from './Rating/rating';
import Comments from './Comments/comments';
import Benchmarks from './Benchmarks/benchmarks';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      goodRatings: ["0"],
      badRatings: ["0"],
      totalSurveysSent: ["0"]
    }
  }


  getGoodRatings = () => {
    fetch('/good-sat')
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        this.setState({
          goodRatings: responseJson.count
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  getBadRatings = () => {
    fetch('/bad-sat')
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        this.setState({
          badRatings: responseJson.count
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  getTotalSurvey = () => {
    fetch('/total-survey')
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        this.setState({
          totalSurveysSent: responseJson.count
        });

      })
      .catch(err => {
        console.error(err);
      });
  }

  getResponseRate = () => {
    var totalReceived = Number(this.state.goodRatings) + Number(this.state.badRatings);
    var responseRate = Math.round((totalReceived / Number(this.state.totalSurveysSent)) * 100);
    var rate = responseRate.toString() + "%";
    return rate;
  }


  renderRating(){
    this.getGoodRatings();
    this.getBadRatings();
    this.getTotalSurvey();
    var responseRate = this.getResponseRate();

    return (
      <Rating
        goodRating={this.state.goodRatings}
        badRating={this.state.badRatings}
        responseRate={responseRate}
      />
    );
  }

  renderComments(){
    return (
      <Comments />
    );
  }

  renderBenchmarks(){
    return (
      <Benchmarks />
    );
  }

  render() {
    return (
      <div className="App">
        <div class="row">
          <div class="col s12 m4 l3 z-depth-2 center-align">
             {this.renderBenchmarks()}
          </div>
          <div class="col s12 m8 l9 center-align">
            {this.renderRating()}
            {this.renderComments()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
