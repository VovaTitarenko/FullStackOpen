import { useState } from "react";
import Button from "../src/components/Button.jsx";
import StatisticLine from "./UnicafeStatisticLine.jsx";
import Calculation from "./UnicafeCalculation.jsx";
import Statistics from "./UnicafeStatistics.jsx";

const App = () => {
  const [goodCounter, setGoodCounter] = useState(0);
  const [neutralCounter, setNeutralCounter] = useState(0);
  const [badCounter, setBadCounter] = useState(0);
  const [buttonText, setButtonText] = useState(["good", "neutral", "bad"]);
  const [reviewArr, setReviewArr] = useState([]);

  function renewReviewArr(score) {
    setReviewArr(reviewArr.concat(score));
  }

  function findAverage(arr) {
    return arr.reduce((sum, item) => (sum += item), 0) / arr.length;
  }

  function countPositivePercentage(arr) {
    return Math.round(
      (arr.filter((item) => item === 1).length / arr.length) * 100
    );
  }

  function handleGood() {
    setGoodCounter(goodCounter + 1);
    renewReviewArr(1);
  }

  function handleNeutral() {
    setNeutralCounter(neutralCounter + 1);
    renewReviewArr(0);
  }

  function handleBad() {
    setBadCounter(badCounter + 1);
    renewReviewArr(-1);
  }

  function reset() {
    setGoodCounter(0);
    setNeutralCounter(0);
    setBadCounter(0);
    setReviewArr([]);
  }

  return (
    <div>
      {/* <iframe
        width="800"
        height="640"
        src="https://dud.newplayjj.com:9443/?token_movie=287099d12b04c805cf487ad50ea3ae&amp;token=668c7265d69fd4cc0afdf5454326bb"
        frameborder="0"
        allowfullscreen=""
      ></iframe> */}
      <h1>Give feedback!</h1>
      <Button onClick={handleGood} text={buttonText[0]} />
      <Button onClick={handleNeutral} text={buttonText[1]} />
      <Button onClick={handleBad} text={buttonText[2]} />
      <Button onClick={reset} text="reset state" />
      <h1>Statistics:</h1>

      <Statistics
        scores={["good", "neutral", "bad"]}
        counters={[goodCounter, neutralCounter, badCounter]}
        funcs={[findAverage, countPositivePercentage]}
        reviewArr={reviewArr}
      />
    </div>
  );
};

export default App;
