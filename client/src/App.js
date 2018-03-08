import React, { Component } from 'react';
import Rating from './Rating/rating';
import Comments from './Comments/comments';
import Benchmarks from './Benchmarks/benchmarks';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      goodRatings: ["test"]
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

  renderRating(){
    return (
      <Rating
        goodRating={this.state.getGoodRatings}
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
  // render() {
  //   return (
  //     <div className="App">
  //       <h1>Users</h1>
  //       {this.state.goodCount}
  //     </div>
  //   );
  // }


export default App;
