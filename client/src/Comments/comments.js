import React, { Component, PropTypes } from 'react';
import './comments.css';

class Comments extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentCommentIndex: 0,
      comments: props.comments,
      class: "not-active"
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
      if(this.state.comments.length > 0 && this.state.comments[i].length > 100){
        this.setState({
          class: "active-comment"
        })
      } else {
        this.setState({
          class: "non-active"
        })
      }
    }, 15000)

  }

  componentWillUnmount(){
      window.clearInterval(this.intervalId);
  }



  render(){
    return(
      <div className="comments-block">
        <div className={this.state.class}>"{this.state.comments[this.state.currentCommentIndex]}"</div>
      </div>
    );
  }

}

export default Comments;
