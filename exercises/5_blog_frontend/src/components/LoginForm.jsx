import { useState } from 'react';
import PropTypes from 'prop-types';
import loginService from '../services/login';
import blogService from '../services/blogs';

export default function Login({ saveUser, notifySuccess, notifyError }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
      saveUser(user);
      setUsername('');
      setPassword('');
      notifySuccess();
    } catch (exception) {
      notifyError();
    }
  };

  return (
    <form onSubmit={(event) => handleLogin(event)}>
      <h2>Login</h2>
      <div className="">
        <label>
          username:{' '}
          <input
            onChange={(event) => setUsername(event.target.value)}
            type="text"
            name="username"
            placeholder="Enter your username"
            value={username}
          />
        </label>
      </div>
      <div className="">
        <label>
          password:{' '}
          <input
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  );
}

Login.propTypes = {
  saveUser: PropTypes.func.required,
};
