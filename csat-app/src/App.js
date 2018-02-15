import React, { Component } from 'react';
import logo from './logo.svg';
import Rating from './Rating/rating';
import Comments from './Comments/comments';
import './App.css';


class App extends Component {

  state = {
      response: ''
    };

    componentDidMount() {
      this.callApi()
        .then(res => this.setState({ response: res.express }))
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
    )
  }

  renderComments(){
    return (
      <Comments />
    )
  }

  render() {
    return (
      <div className="App">
        {this.renderRating()}
        {this.renderComments()}
      </div>
    );
  }
}

export default App;
