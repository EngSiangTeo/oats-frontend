import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { Scrollbars } from 'react-custom-scrollbars';
import ChatUI from './../Chat/ChatUI';
import "./ConversationList.css"

class ConversationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
      chat : ""
    };
  }
  
  componentDidMount() {
    var self = this;
    this.setState({chat : this.props.chatId});
    axios.get(process.env.REACT_APP_BE_URL + 'chats', {
        headers: {
          'Authorization': `Bearer ${this.props.token}` 
        }
      }).then(function(response){
        self.setState({ conversations: [...response.data.data]});
      });
  }

  handleChatClick(id,e) {
    // this.props.setActive('conversation',id);
    this.setState({chat : id});
  }

  render() {
    return (
        <section>
          <Grid container component="main">
            <Grid item xs={false} sm={4} md={4} className="inboxSector">
              <h3>Inbox</h3>
              <Scrollbars>
              {this.state.conversations.map(conversation => {
                return (
                  <div key={conversation.chat_id}>
                    <button className="chatBtn" onClick={this.handleChatClick.bind(this,conversation.chat_id)}>Chat</button>
                    <p>Chat with: 
                      {conversation.participants.length === 0 ? "" : conversation.participants.map(participant => {
                        return (
                          <span key={participant}> {participant}</span>
                        );
                      }).reduce(
                        (prev, curr) => [prev, ', ', curr]
                      )}
                    </p>
                    <p>Item: {conversation.listing_item}</p>
                    <p>Last Message: {conversation.last_message}</p>
                    <hr/>
                  </div>
                );
              })}
              </Scrollbars>
            </Grid>
            <Grid item xs={12} sm={8} md={8}>
              {this.state.chat ? (
                <ChatUI key={this.state.chat} token={this.props.token} chatId={this.state.chat}/>
              ) : (
                <p>Please select a message to start</p>
              )}
            </Grid>
          </Grid>
        </section>
    );
  }
}

export default ConversationList;