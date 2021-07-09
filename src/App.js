import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Chat from './Chat/Chat';
import Login from './Common/Login';

function App() {
  const [token, setToken] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  }
  
  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/chat">
            <Chat />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;