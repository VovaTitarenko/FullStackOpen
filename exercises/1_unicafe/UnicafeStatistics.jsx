import StatisticLine from './UnicafeStatisticLine';
import Calculation from './UnicafeCalculation';

function Statistics(props) {
  if (props.reviewArr.length !== 0) {
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>stat</th>
              <th>value</th>
            </tr>
          </thead>
          <tbody>
            <StatisticLine
              score={props.scores[0]}
              counter={props.counters[0]}
            />
            <StatisticLine
              score={props.scores[1]}
              counter={props.counters[1]}
            />
            <StatisticLine
              score={props.scores[2]}
              counter={props.counters[2]}
            />
            <Calculation
              name="average"
              inputFun={props.funcs[0]}
              params={props.reviewArr}
            />
            <Calculation
              name="positive %"
              inputFun={props.funcs[1]}
              params={props.reviewArr}
            />
          </tbody>
        </table>
      </>
    );
  }
  return <p>No feedback yet.</p>;
}

export default Statistics;
