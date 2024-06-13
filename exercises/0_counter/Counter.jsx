import { useState } from "react";
import Display from "./CounterDisplay.jsx";
import Button from "../../frontend-notesApp/src/components/Button.jsx";

const App = () => {
  const [counter, setCounter] = useState(0);
  const [ButtonText, setButtonText] = useState(["plus", "reset", "minus"]);

  const increment = () => {
    setCounter(counter + 1);
  };

  const decrement = () => {
    setCounter(counter - 1);
  };

  const setToZero = () => {
    setCounter(0);
  };

  console.log("rendering...", counter);

  return (
    <div>
      <Display counter={counter} />
      <Button onClick={increment} text={ButtonText[0]} />
      <Button onClick={setToZero} text={ButtonText[1]} />
      <Button onClick={decrement} text={ButtonText[2]} />
    </div>
  );
};

export default App;
