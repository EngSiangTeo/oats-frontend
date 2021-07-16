import React from "react";
import "./ChatList.css";
import { Scrollbars } from 'react-custom-scrollbars';

class ChatList extends React.Component {
  scrollbars = React.createRef();
  state = {
    mounted: false,
  }

  componentDidMount() {
    this.setState({mounted: true});
  }

  componentDidUpdate() {
    this.state.mounted && this.scrollbars.current.scrollToBottom();
  }

  render() {
    return (
      <Scrollbars ref={this.scrollbars} style={{height:500}} className="chatList">
        {this.props.chats.map(chat => {
          return (
            <div key={chat.id}>
              <div className="chatMessage">
                <div className="box">
                  <p><b>{chat.username}</b></p>
                  <p>{chat.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </Scrollbars>
    );
  }
}


export default ChatList;