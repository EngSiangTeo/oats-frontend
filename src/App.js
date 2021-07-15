import React from 'react';
import './App.css';
import ChatUI from './Chat/ChatUI';
import Login from './Common/Login';
import NavBar from './Common/NavBar';
import ProductList from './Product/ProductList';
import ConversationList from './Conversation/ConversationList';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      token: '',
      active: '',
      chatId: ''
    };
  }

  setToken = (token) => {
    this.setState({
      token: token
    });
  };

  setActive = (page, chatId) => {
    this.setState({
      active: page,
      chatId: chatId
    });
  };

  renderContent() {
    if (this.state.active === "chat") {
      return (
        <ChatUI token={this.state.token} chatId={this.state.chatId}/>
      );
    } else if (this.state.active === "conversation") {
      return (
        <ConversationList token={this.state.token} setActive={this.setActive}/>
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
        <Login setToken={this.setToken} setActive={this.setActive}/>
      );
    }
    
    return (
      <div className="App">
        <header className="App-header">
          {/*<h1 className="App-title">Navbar or something</h1>*/}
          <NavBar setActive={this.setActive}/>
        </header>
        {this.renderContent()}
      </div>
    );

  }
}

export default App;