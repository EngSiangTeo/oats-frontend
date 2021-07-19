import React from 'react';

import './App.css';
import NavBar from './Common/Nav';
import SignInSide from './Common/SignInSide';
import ProductList from './Product/ProductList';
import ConversationList from './Conversation/ConversationList';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      token: '',
      active: '',
      chatId: '',
      pusher: ''
    };
  }

  setToken = (token) => {
    this.setState({
      token: token
    });
  };

  setPusher = (pusher) => {
    this.setState({
      pusher: pusher
    });
  };

  setActive = (page, chatId) => {
    this.setState({
      active: page,
      chatId: chatId
    });
  };

  renderContent() {
    if (this.state.active === "conversation") {
      return (
        <ConversationList token={this.state.token} setActive={this.setActive} chatId={this.state.chatId} pusher={this.state.pusher}/>
      );
    } else if (this.state.active === "product") {
      return (
        <ProductList token={this.state.token} setActive={this.setActive}/>
      );
    }
  }

  render() {
    if (!this.state.token) {
      return (
        <SignInSide setToken={this.setToken} setActive={this.setActive} setPusher={this.setPusher}/>
      );
    }
    
    return (
      <div className="App">
        <header className="App-header">
          {/*<h1 className="App-title">Navbar or something</h1>*/}
          <NavBar setActive={this.setActive}/>
        </header>
        <div className="App-content">
          {this.renderContent()}
        </div>
      </div>
    );

  }
}

export default App;