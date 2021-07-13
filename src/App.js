import React, { useState } from 'react';
import './App.css';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ChatUI from './Chat/ChatUI';
import Login from './Common/Login';

function App() {
  const [token, setToken] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Welcome to React-Pusher Chat</h1>
      </header>
      <ChatUI token={token}/>
    </div>
  );
}

export default App;