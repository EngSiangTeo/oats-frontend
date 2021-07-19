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
      <Scrollbars ref={this.scrollbars}>
        <div className="container chatList">
          {this.props.chats.map(chat => {
            return (
              <div key={chat.id}>
                <div className="row">
                  <div className={`chatMessage ${chat.own_message ? "own" : "other"}`}>
                    <div className="box">
                      {chat.message}
                    </div>
                  </div>
                </div>
                <div className="row">
                  {chat.system_offer && chat.own_message ? (
                    <div className="system">
                      <b>Your offer is a bit low, your CarouPoints will be deducted if the seller deem the offer not reasonable</b>
                    </div>
                    ) : ""
                  }
                </div>
              </div>
            );
          })}
        </div>
      </Scrollbars>
    );
  }
}


export default ChatList;