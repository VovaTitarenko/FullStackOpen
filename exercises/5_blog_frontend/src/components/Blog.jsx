import NoRefTogglable from './NoRefTogglable';

const Blog = ({ blog, likeBlog, userId, deleteBlog }) => (
  <div
    style={{
      border: '2px solid #141414',
      backgroundColor: '#f1f1f1',
      borderRadius: '4px',
      marginTop: '4px',
      marginLeft: '4px',
    }}
  >
    {blog.title} <b>{blog.author}</b>{' '}
    {userId === blog.user && (
      <button
        onMouseDown={() => deleteBlog(blog)}
        style={{ backgroundColor: 'tomato' }}
      >
        delete
      </button>
    )}
    <NoRefTogglable buttonLabel="show details">
      <p>
        Link: <i>{blog.url}</i>
      </p>
      <p>
        Likes: <b>{blog.likes}</b>{' '}
        <button onMouseDown={() => likeBlog(blog)}>Like</button>
      </p>
      <p>
        UserId: <i>{blog.user}</i>
      </p>
      <p>
        BlogId: <i>{blog.id}</i>
      </p>
    </NoRefTogglable>
  </div>
);

export default Blog;
