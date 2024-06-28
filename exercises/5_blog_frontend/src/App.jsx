import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
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

  const blogFormRef = useRef(null);

  const createBlog = async (blogObject) => {
    const createdBlog = await blogService.create(blogObject);
    console.log(createdBlog);
    blogFormRef.current.toggleVisibility();
    setBlogs(blogs.concat(createdBlog));
  };

  const likeBlog = async (blog) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 };
    await blogService.update(blog.id, likedBlog);
    console.log(`Likes for "${blog.title}" updated successfully.`);
    setBlogs(blogs.map((b) => (b.id !== blog.id ? b : likedBlog)));
  };

  const deleteBlog = async (blog) => {
    if (
      window.confirm(
        `Blog "${blog.title}" by ${blog.author} is about to be deleted. Continue?`,
      )
    ) {
      const response = await blogService.deleteBlog(blog.id);
      console.log(
        `Blog "${blog.title}" by ${blog.author} has been successfully deleted:`,
        response,
      );
      setBlogs(blogs.filter((b) => b.id !== blog.id));
    } else {
      console.log(
        `You cancelled deletion of "${blog.title}" by ${blog.author}.`,
      );
    }
  };

  if (!user) {
    return (
      <div>
        <h2>BlogsApp</h2>
        <Notification message={errorMessage} type="error" />
        <Notification message={successMessage} type="success" />
        <Togglable buttonLabel="login">
          <LoginForm
            saveUser={(user) => setUser(user)}
            notifySuccess={() => {
              setSuccessMessage(`You're now logged in!`);
              setTimeout(() => {
                setSuccessMessage(null);
              }, 5000);
            }}
            notifyError={() => {
              setErrorMessage('Wrong credentials');
              setTimeout(() => {
                setErrorMessage(null);
              }, 5000);
            }}
          />
        </Togglable>
      </div>
    );
  } else {
    return (
      <div>
        <h2>BlogsApp</h2>{' '}
        <button
          onMouseDown={() => {
            console.log(user);
          }}
        >
          log user info
        </button>
        <Notification message={errorMessage} type="error" />
        <Notification message={successMessage} type="success" />
        <div>
          <div>
            <span>
              Current user: <b>{user.name}</b> with id: <b>{user.id}</b>
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
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm
              createBlog={createBlog}
              notifySuccess={() => {
                setSuccessMessage('Blog posted successfully!');
                setTimeout(() => {
                  setSuccessMessage(null);
                }, 5000);
              }}
              notifyError={(err) => {
                setErrorMessage(
                  `Error occurred while posting blog: ${err.message}`,
                );
                setTimeout(() => {
                  setErrorMessage(null);
                }, 5000);
              }}
            />
          </Togglable>
        </div>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              likeBlog={likeBlog}
              userId={user.id}
              deleteBlog={deleteBlog}
            />
          ))}
      </div>
    );
  }
};

export default App;
