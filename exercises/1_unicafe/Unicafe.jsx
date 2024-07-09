import { useState, useEffect } from 'react';
import { createStore } from 'redux';
import Button from './Button.jsx';
import StatisticLine from './UnicafeStatisticLine.jsx';
import Calculation from './UnicafeCalculation.jsx';
import Statistics from './UnicafeStatistics.jsx';
import reviewReducer from './reducers/reviewReducer.js';

// Redux store
const store = createStore(reviewReducer);

const App = () => {
  const [reviewArr, setReviewArr] = useState([]);
  const buttonText = ['good', 'neutral', 'bad'];

  useEffect(() => {
    setReviewArr([]);
  }, []);

  function renewReviewArr(score) {
    setReviewArr(reviewArr.concat(score));
  }

  function findAverage(arr) {
    return arr.reduce((sum, item) => (sum += item), 0) / arr.length;
  }

  function countPositivePercentage(arr) {
    return Math.round(
      (arr.filter((item) => item === 1).length / arr.length) * 100,
    );
  }

  function handleGood() {
    store.dispatch({ type: 'GOOD_REVIEW' });
    renewReviewArr(1);
  }

  function handleNeutral() {
    store.dispatch({ type: 'OK_REVIEW' });
    renewReviewArr(0);
  }

  function handleBad() {
    store.dispatch({ type: 'BAD_REVIEW' });
    renewReviewArr(-1);
  }

  function reset() {
    store.dispatch({ type: 'RESET' });
    setReviewArr([]);
  }

  return (
    <div>
      <h1>Give feedback!</h1>
      <Button onClick={handleGood} text={buttonText[0]} />
      <Button onClick={handleNeutral} text={buttonText[1]} />
      <Button onClick={handleBad} text={buttonText[2]} />
      <Button onClick={reset} text="reset state" />
      <h1>Statistics:</h1>

      <Statistics
        scores={buttonText}
        counters={[
          store.getState().good,
          store.getState().ok,
          store.getState().bad,
        ]}
        funcs={[findAverage, countPositivePercentage]}
        reviewArr={reviewArr}
      />
    </div>
  );
};

export default App;
