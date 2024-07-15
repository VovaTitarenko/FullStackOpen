import { CounterContextProvider } from "./useReducerCounterContext";
import "./App.css";
import Button from "./useReducerButton";
import Display from "./useReducerDisplay";

const App = () => {
  return (
    <CounterContextProvider>
      <h1>Counter</h1>
      <Display />
      <div>
        <Button type="INC" label="+" />
        <Button type="DEC" label="-" />
        <Button type="ZERO" label="0" />
      </div>
    </CounterContextProvider>
  );
};

export default App;
