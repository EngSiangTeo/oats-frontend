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
      chats: [{'username':'j','message':'hi'}]
    };
  }
  
  componentDidMount() {
    // console.log(this.props.token);
    // const username = window.prompt('Username: ', 'Anonymous');
    // this.setState({ username });

    //Connect and subscribe to PUSHER API
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
      cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
      encrypted: true
    });
    const channel = pusher.subscribe('chat');
    channel.bind('MessageSent', data => {
      // console.log(data);
      this.setState({ chats: [...this.state.chats, data], handleTextChanget: '' });
      // console.log(this.state.chats);
    });

    //Get all chat history

    var self = this;
    axios.get(process.env.REACT_APP_BE_URL + 'message', {
        headers: {
          'Authorization': `Bearer ${this.props.token}` 
        }
      }).then(function(response){
        // self.setState({ text: ""});
        console.log(response.data.data);
        self.setState({ chats: [...response.data.data]});
      });

    //Binding events
    this.handleTextChange = this.handleTextChange.bind(this);
  }
  
  handleTextChange(e) {
    if (e.keyCode === 13) {
      const payload = {
        message: this.state.text
      };

      axios.post(process.env.REACT_APP_BE_URL + 'message', payload, {
        headers: {
          'Authorization': `Bearer ${this.props.token}` 
          // 'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}` 
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