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
      chats: []
    };
  }
  
  componentDidMount() {
    //Connect and subscribe to PUSHER API
    // console.log(this.props.chatId);
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
      cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
      encrypted: true
    });
    const channel = pusher.subscribe('chat'+this.props.chatId);
    channel.bind('MessageSent', data => {
      // console.log(data);
      this.setState({ chats: [...this.state.chats, data], handleTextChanget: '' });
      // console.log(this.state.chats);
    });

    //Get all chat history

    var self = this;
    axios.get(process.env.REACT_APP_BE_URL + 'message/' + this.props.chatId, {
        headers: {
          'Authorization': `Bearer ${this.props.token}` 
        }
      }).then(function(response){
        if(response.data.data.messages.length){
          self.setState({ chats: [...response.data.data.messages]});          
        }
      });

    //Binding events
    this.handleTextChange = this.handleTextChange.bind(this);
  }
  
  handleTextChange = (e) =>{
    if (e.keyCode === 13) {
      const payload = {
        message: this.state.text
      };

      axios.post(process.env.REACT_APP_BE_URL + 'message/' + this.props.chatId, payload, {
        headers: {
          'Authorization': `Bearer ${this.props.token}` 
          // 'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}` 
        }
      });

      const message = {
        body : {
          "text": this.state.text
        }
      };

      axios.put(process.env.REACT_APP_SENTIMENT_URL, message, {
        headers : {
          'Content-Type': 'application/json'
        }
      }).then(function(response){
          console.log(response);
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
        <section>
          <ChatList chats={this.state.chats} />
          <ChatBox
            text={this.state.text}
            handleTextChange={this.handleTextChange}
          />
        </section>
    );
  }
}

export default ChatUI;
