import React, { Component } from 'react';
import Rating from './Rating/rating';
import Comments from './Comments/comments';
import Benchmarks from './Benchmarks/benchmarks';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      goodRatings: "0",
      badRatings: "0",
      responseRate: "0",
      score: "0",
      thirtyDaysSolved: "0",
      thirtyDaysReceived: "0",
      todayReceived: "0",
      todaySolved: "0",
      comments: []
    }
  }

  componentDidMount() {
    this.getRatings();
    this.getComments();
    this.getThirtyDaysSolved();
    this.getThirtyDaysReceived();
    this.getTodayReceived();
    this.getTodaySolved();
    this.intervalId = window.setInterval(() => {
      this.getRatings();
      this.getComments();
      this.getThirtyDaysSolved();
      this.getThirtyDaysReceived();
      this.getTodayReceived();
      this.getTodaySolved();
    }, 3600000)

  }

  componentWillUnmount() {
    window.clearInterval(this.intervalId);
  }

  getRatings = () => {
    fetch('/benchmarks')
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        this.setState({
          goodRatings: responseJson.statistics.good_ratings,
          badRatings: responseJson.statistics.bad_ratings,
          responseRate: responseJson.statistics.response_rate,
          score: responseJson.statistics.score
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  getThirtyDaysReceived = () => {
    fetch('/thirty-days-received')
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        this.setState({
          thirtyDaysReceived: responseJson
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  getThirtyDaysSolved = () => {
    fetch('/thirty-days-solved')
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        this.setState({
          thirtyDaysSolved: responseJson
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  getTodayReceived = () => {
    fetch('/today-received')
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        this.setState({
          todayReceived: responseJson
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  getTodaySolved = () => {
    fetch('/today-solved')
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        this.setState({
          todaySolved: responseJson
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  getComments = () => {
    fetch('/comments')
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        var satRatings = responseJson.satisfaction_ratings;
        var comments = [];
        satRatings.forEach(function(rating){
          comments.push(rating.comment);
        });
        if (responseJson.next_page != null){
          fetch('/comments-page-2')
            .then(response => {
              return response.json();
            })
            .then(responseJson => {
              var PageTwoSatRatings = responseJson.satisfaction_ratings;
              PageTwoSatRatings.forEach(function(rating){
                comments.push(rating.comment);
              });
            })
            .catch(err => {
              console.error(err);
            });
        }
        this.setState({
          comments: comments
        });
      })
      .catch(err => {
        console.error(err);
      });
  }



  renderRating(){

    return (
      <Rating
        goodRating={this.state.goodRatings}
        badRating={this.state.badRatings}
        responseRate={this.state.responseRate}
        score={this.state.score}
      />
    );
  }

  renderComments(){

    return (
      <Comments
      comments={this.state.comments}
    />
    );
  }

  renderBenchmarks(){

    return (
      <Benchmarks
        thirtyDaysReceived={this.state.thirtyDaysReceived}
        thirtyDaysSolved={this.state.thirtyDaysSolved}
        todayReceived={this.state.todayReceived}
        todaySolved={this.state.todaySolved}
      />
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
