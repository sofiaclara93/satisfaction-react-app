import React, { Component, PropTypes } from 'react';
import './comments.css';

class Comments extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentCommentIndex: 0,
      comments: props.comments
    }

  }

  componentWillReceiveProps(nextProps){
    if(this.props.comments !== nextProps.comments){
      this.setState({
        comments: nextProps.comments,
        currentCommentIndex: 0
      });
    }


  }

  componentDidMount(){
    this.intervalId = window.setInterval(() => {
      var i = Math.floor(Math.random() * Math.floor(this.state.comments.length));
      if(i > this.state.comments.length){
        i = 0;
      }
      this.setState({
        currentCommentIndex: i
      })
      var div = this.refs.comments
      if(this.state.comments[this.state.currentCommentIndex].length > 1){
  
      }
    }, 15000)

  }

  componentWillUnmount(){

  }



  render(){
    return(
      <div className="comments-block" ref="comments">
        <div>{this.state.comments[this.state.currentCommentIndex]}</div>
      </div>
    );
  }

}

export default Comments;
