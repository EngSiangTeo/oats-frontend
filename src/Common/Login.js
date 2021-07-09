import React, { useState } from 'react';
import PropTypes from 'prop-types';

async function loginUser(credentials) {
 return fetch('http://staging-insights-api.carro.sg/loginByEmail', {
   method: 'POST',
   headers: {
     "Accept": "content/json",
    "Content-Type": "application/json"
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
  }

  return(
    <form onSubmit={handleSubmit}>
      <label>
        <p>Username</p>
        <input type="text" onChange={e => setUserName(e.target.value)} value="test4@email.com"/>
      </label>
      <label>
        <p>Password</p>
        <input type="password" onChange={e => setPassword(e.target.value)} value="password"/>
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}