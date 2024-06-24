import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogForm from './components/BlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    if (window.localStorage.getItem('loggedBlogAppUser')) {
      const user = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'));
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  function handleUsername(event) {
    setUsername(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      setSuccessMessage(`Welcome, ${user.username}! You're now logged in!`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const addBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    try {
      const createdBlog = await blogService.create(newBlog);
      console.log(createdBlog);
      setBlogs(blogs.concat(createdBlog));
      setTitle('');
      setAuthor('');
      setUrl('');
      setSuccessMessage('Blog posted successfully!');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (err) {
      setErrorMessage(`Error occurred while posting blog: ${err.message}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  if (!user) {
    return (
      <div>
        <h2>BlogsApp</h2>
        <Notification message={errorMessage} type="error" />
        <Notification message={successMessage} type="success" />
        <LoginForm
          login={handleLogin}
          onUserChange={handleUsername}
          uValue={username}
          onPassChange={handlePassword}
          pValue={password}
        />
      </div>
    );
  } else {
    return (
      <div>
        <h2>BlogsApp</h2>
        <Notification message={errorMessage} type="error" />
        <Notification message={successMessage} type="success" />

        <div>
          <div>
            <span>
              Current user: <b>{user.name}</b>
            </span>
            <button
              onMouseDown={() => {
                window.localStorage.removeItem('loggedBlogAppUser');
                setUser(null);
                setSuccessMessage('Logged out successfully!');
                setTimeout(() => {
                  setSuccessMessage(null);
                }, 5000);
              }}
            >
              Logout
            </button>
          </div>
          <BlogForm
            formAction={addBlog}
            onTitleChange={setTitle}
            title={title}
            onAuthorChange={setAuthor}
            author={author}
            onUrlChange={setUrl}
            url={url}
          />
        </div>

        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  }
};

export default App;
