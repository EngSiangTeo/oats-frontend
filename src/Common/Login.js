import React, { useState } from 'react';
import PropTypes from 'prop-types';

async function loginUser(credentials) {
 return fetch(process.env.REACT_APP_BE_URL + 'loginByEmail', {
   method: 'POST',
   headers: {
    "Accept": "content/json",
    "Content-Type": "application/json"
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json());
}

export default function Login({ setToken, setActive }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      "email" : username,
      "password" : password
    });
    setToken(token.access_token);
    setActive('conversation');
  }

  return(
    <form onSubmit={handleSubmit}>
      <label>
        <p>Username</p>
        <input type="text" onChange={e => setUserName(e.target.value)}/>
      </label>
      <label>
        <p>Password</p>
        <input type="password" onChange={e => setPassword(e.target.value)}/>
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
