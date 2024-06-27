import { useState } from 'react';
import loginService from '../services/login';
import noteService from '../services/notes';

export default function Login({ saveUser, notifySuccess, notifyError }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user));
      noteService.setToken(user.token);
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
            onChange={({ target }) => setUsername(target.value)}
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
            onChange={({ target }) => setPassword(target.value)}
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
