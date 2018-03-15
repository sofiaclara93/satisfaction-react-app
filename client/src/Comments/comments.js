import React, { Component, PropTypes } from 'react';
import './comments.css';

class Comments extends Component {
  constructor(props){
    super(props);
    this.state = {
      comments: this.props.comments,
      comment: " "
    }

  }

  componentDidMount(){
    this.shuffleComments();

  }

  componentWillUnmount(){

  }
  shuffleComments = () => {


  }

  renderComments() {
    return(
      <div>"The Support of Alicia was great. But I was still sad, that we didnt receive any information about the leave of Blake Liut and the new assigned account manager Krista. I assume this should be part of the service for your customers to keep them updated about changes which affects their contracts and support. Thanks a lot, Eman"</div>
      // this.getComments()
    );
  }

  render(){
    return(
      <div className="comments-block">
        {this.renderComments()}
      </div>
    );
  }

}

export default Comments;
