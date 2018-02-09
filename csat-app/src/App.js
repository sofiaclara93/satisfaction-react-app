import React, { Component } from 'react';
import logo from './logo.svg';
import Rating from './Rating/rating';
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

  render() {
    return (
      <div className="App">
        {this.renderRating()}
      </div>
    );
  }
}

export default App;
