import React, { Component } from 'react';
import logo from './logo.svg';
import Rating from './Rating/rating';
import Comments from './Comments/comments';
import Benchmarks from './Benchmarks/benchmarks';

import './App.css';


class App extends Component {

  state = {
      response: ''
    };

    componentDidMount() {
      this.callApi()
        .then(res => this.setState({ response: res.express }))
        // getting this catch
        .catch(err => console.log(err));
    }

    callApi = async () => {
      const response = await fetch('/');
      const body = await response.json();

      if (response.status !== 200) throw Error(body.message);

      return body;
    };

  renderRating(){
    return (
      <Rating />
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
          <div class="col s12 m4 l3">
             {this.renderBenchmarks()}
          </div>
          <div class="col s12 m8 l9">
            {this.renderRating()}
            {this.renderComments()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
