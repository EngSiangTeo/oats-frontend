import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import ChatList from './ChatList';
import ChatBox from './ChatBox';

class ChatUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      productId : '',
      chats: []
    };

    this.pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
      cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
      encrypted: true
    });

    const channel = this.pusher.subscribe('chat'+this.props.chatId);
    channel.bind('MessageSent', data => {
      // console.log(data);
      this.setState({ chats: [...this.state.chats, data] });
      // console.log(this.state.chats);
    });

  }

  componentDidMount() {
    //Connect and subscribe to PUSHER API
    console.log(this.props.chatId);
    console.log('hi');

    //Get all chat history
    var self = this;
    axios.get(process.env.REACT_APP_BE_URL + 'message/' + this.props.chatId, {
      headers: {
        'Authorization': `Bearer ${this.props.token}` 
      }
    }).then(function(response){
        self.setState({ productId : response.data.data.listing_id});  
      if(response.data.data.messages.length){
        self.setState({ chats: [...response.data.data.messages]});          
      }
    });

    //Binding events
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  componentWillUnmount() {
    //Connect and subscribe to PUSHER API
    console.log(this.props.chatId);
    console.log('bue');
    console.log(this.pusher);

    this.pusher.unsubscribe('chat'+this.props.chatId);

    console.log(this.pusher);
  }

  
  handleTextChange = (e) =>{
    if (e.keyCode === 13) {
      const payload = {
        message: this.state.text
      };

      const message = {
        body : {
          "text": this.state.text
        }
      };
      
      var self = this;
      
      //Send to BE for BROADCAST
      axios.post(process.env.REACT_APP_BE_URL + 'message/' + this.props.chatId, payload, {
        headers: {
          'Authorization': `Bearer ${this.props.token}` 
        }
      }).then(function(response){
        self.setState({ text : ''})
      });

      //Send to Lambda for analysis
      axios.put(process.env.REACT_APP_SENTIMENT_URL, message, {
        headers : {
          'Content-Type': 'application/json'
        }
      }).then(function(response){
          if (response.data.body.Sentiment === "NEGATIVE") {
            alert('Negative Message Detected');
          }
        });

    } else {
      this.setState({ text: e.target.value });
    }
  }

  render() {
    return (
        <div>
          <h2>Chat Id <b>{this.props.chatId}</b></h2>
          <h2>Product Id <b>{this.state.productId}</b></h2>
          <ChatList chats={this.state.chats} />
          <ChatBox
            text={this.state.text}
            handleTextChange={this.handleTextChange}
          />
        </div>
    );
  }
}

export default ChatUI;
