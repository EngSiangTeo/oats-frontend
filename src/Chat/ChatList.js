import React from "react";
import "./ChatList.css";
import Button from 'react-bootstrap/Button'
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
              <div className="messages" key={chat.id}>
                <div className="row">
                  <div className={`chatMessage ${chat.own_message ? "own" : "other"}`}>
                    <div className="box">
                      {chat.message}
                    </div>
                  </div>
                </div>
                <div className="row">
                  {(chat.system_offer && chat.own_message && chat.seller_offer !== -1) ? (
                    <div className="system">
                      <b>Your offer is a bit low, your CarouPoints will be deducted if the seller deem the offer not reasonable</b>
                    </div>
                    ) : ""
                  }
                  {chat.system_offer && !chat.own_message ? (
                    <div className="system">
                      <b>System detected low offer from buyer</b>
                      <div className="systemMessage">
                        <Button variant="outline-secondary" disabled>Is this a reasonable offer?</Button>
                      </div>
                      <div className="systemButton d-flex">
                        <Button variant={`${chat.seller_offer === 1 || chat.seller_offer === null ? "success" : "secondary"}`} className="w-100" disabled={chat.seller_offer!==null} onClick={(e) => this.props.handleOfferBtn(chat.id,1)}>Yes</Button>
                        <Button variant={`${chat.seller_offer === 0 || chat.seller_offer === null ? "danger" : "secondary"}`} className="w-100" disabled={chat.seller_offer!==null} onClick={(e) => this.props.handleOfferBtn(chat.id,0)}>No</Button>
                        <Button variant={`${chat.seller_offer === -1 || chat.seller_offer === null ? "warning" : "secondary"}`} className="w-100" disabled={chat.seller_offer!==null} onClick={(e) => this.props.handleOfferBtn(chat.id,-1)}>Not an offer</Button>
                      </div>
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