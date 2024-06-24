export default function BlogForm({
  formAction,
  onTitleChange,
  title,
  onAuthorChange,
  author,
  onUrlChange,
  url,
}) {
  return (
    <form onSubmit={(event) => formAction(event)}>
      <div>
        <label>
          Title:
          <input
            type="text"
            onChange={(event) => onTitleChange(event.target.value)}
            value={title}
          />
        </label>
      </div>
      <div>
        <label>
          Author:
          <input
            type="text"
            onChange={(event) => onAuthorChange(event.target.value)}
            value={author}
          />
        </label>
      </div>
      <div>
        <label>
          URL:
          <input
            type="text"
            onChange={(event) => onUrlChange(event.target.value)}
            value={url}
          />
        </label>
      </div>
      <button type="submit">post</button>
    </form>
  );
}
