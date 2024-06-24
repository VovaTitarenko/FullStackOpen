export default function Login({
  login,
  onUserChange,
  uValue,
  onPassChange,
  pValue,
}) {
  return (
    <form onSubmit={(event) => login(event)}>
      <h2>Login</h2>
      <div className="">
        <label>
          username:{' '}
          <input
            onChange={(event) => onUserChange(event)}
            type="text"
            for="username"
            placeholder="Enter your username"
            value={uValue}
          />
        </label>
      </div>
      <div className="">
        <label>
          password:{' '}
          <input
            onChange={(event) => onPassChange(event)}
            type="text"
            for="password"
            placeholder="Enter your password"
            value={pValue}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  );
}
