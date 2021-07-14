import React, { Component } from 'react';
import axios from 'axios';

class ConversationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: []
    };
  }
  
  componentDidMount() {
    var self = this;
    axios.get(process.env.REACT_APP_BE_URL + 'chats', {
        headers: {
          'Authorization': `Bearer ${this.props.token}` 
        }
      }).then(function(response){
        self.setState({ conversations: [...response.data.data]});
      });
  }

  handleChatClick(id,e) {
    this.props.setActive('chat',id);
  }

  render() {
    return (
        <section>
          {this.state.conversations.map(conversation => {
            return (
              <div key={conversation.chat_id}>
                <p>Chat: {conversation.chat_id}</p>
                <p>Listing: {conversation.listing_id}</p>
                {conversation.participants.map(participant => {
                  return (
                    <p key={participant}>{participant}</p>
                  );
                })}
                <button onClick={this.handleChatClick.bind(this,conversation.chat_id)}>Chat</button>
              </div>
            );
          })}
        </section>
    );
  }
}

export default ConversationList;