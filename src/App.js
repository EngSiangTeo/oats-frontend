import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import ChatList from './Chat/ChatList';
import ChatBox from './Chat/ChatBox';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      username: '',
      chats: [{'message':'hi'}]
    };
  }
  
  componentDidMount() {
    const username = window.prompt('Username: ', 'Anonymous');
    this.setState({ username });
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
      cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
      encrypted: true
    });
    const channel = pusher.subscribe('chat');
    channel.bind('MessageSent', data => {
      // console.log(data);
      this.setState({ chats: [...this.state.chats, data], test: '' });
      // console.log(this.state.chats);
    });
    this.handleTextChange = this.handleTextChange.bind(this);
  }
  
  handleTextChange(e) {
    if (e.keyCode === 13) {
      const payload = {
        message: this.state.text
      };
      axios.post(process.env.REACT_APP_BE_URL + 'message', payload, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}` 
        }
      });
    } else {
      this.setState({ text: e.target.value });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React-Pusher Chat</h1>
        </header>
        <section>
          <ChatList chats={this.state.chats} />
          <ChatBox
            text={this.state.text}
            username={this.state.username}
            handleTextChange={this.handleTextChange}
          />
        </section>
      </div>
    );
  }
}

export default App;

// import React, { useState } from 'react';
// import './App.css';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import Chat from './Chat/Chat';
// import Login from './Common/Login';

// function App() {
//   const [token, setToken] = useState();

//   if(!token) {
//     return <Login setToken={setToken} />
//   }
  
//   return (
//     <div className="wrapper">
//       <h1>Application</h1>
//       <a href="chat">Chat</a>
//       <BrowserRouter>
//         <Switch>
//           <Route path="/chat">
//             <Chat />
//           </Route>
//         </Switch>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;