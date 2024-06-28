import { useState } from 'react';

export default function BlogForm({ createBlog, notifySuccess, notifyError }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    try {
      await createBlog(newBlog);
      setTitle('');
      setAuthor('');
      setUrl('');
      notifySuccess();
    } catch (exception) {
      notifyError(exception);
    }
  };

  return (
    <form onSubmit={(event) => addBlog(event)}>
      <div>
        <label>
          Title:
          <input
            type="text"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
        </label>
      </div>
      <div>
        <label>
          Author:
          <input
            type="text"
            onChange={(event) => setAuthor(event.target.value)}
            value={author}
          />
        </label>
      </div>
      <div>
        <label>
          URL:
          <input
            type="text"
            onChange={(event) => setUrl(event.target.value)}
            value={url}
          />
        </label>
      </div>
      <button type="submit">post</button>
    </form>
  );
}
