function Display({ counter }) {
  if (counter !== 0) {
    return (
      <div>
        <p>You can set the value back to 0 using the "reset" button!</p>
        <div>{counter}</div>
      </div>
    );
  } else {
    return <div>{counter}</div>;
  }
}

export default Display;
