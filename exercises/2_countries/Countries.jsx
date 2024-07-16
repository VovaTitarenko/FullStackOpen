import { useState, useEffect } from 'react';
import axios from 'axios';
import Nation from './CountriesNation';
import NationDetails from './CountriesNationDetails';
import { useCountry } from './hooks';

const App = () => {
  // const [nations, setNations] = useState([]);
  // const [newNation, setNewNation] = useState('');
  // const [fetchedData, setFetchedData] = useState([]);
  // const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all';

  // useEffect(() => {
  //   axios.get(baseUrl).then((response) => {
  //     console.log(response.data);
  //     setFetchedData(response.data);
  //   });
  // }, []);

  const country = useCountry();

  // function handleNewNation(event) {
  //   console.log(event.target.value);
  //   setNewNation(event.target.value);
  //   const filterPattern = new RegExp(`.*${event.target.value}`, 'i');
  //   const filteredNations = fetchedData.filter((n) =>
  //     filterPattern.test(n.name.common),
  //   );
  //   console.log(filteredNations);
  //   if (filteredNations.length <= 10) {
  //     setNations(filteredNations);
  //   } else {
  //     setNations([]);
  //   }
  // }

  return (
    <>
      <h1>Country Encyclopedia</h1>
      {/* <label>
        <input value={newNation} onChange={handleNewNation} />
      </label>
      <h2>Results</h2>
      {nations.length === 1 ? (
        <NationDetails nation={nations[0]} />
      ) : nations.length === 0 ? (
        <div>No countries with such name found!</div>
      ) : (
        nations.map((n) => <Nation key={n.ccn3} nation={n} />)
      )} */}

      <h2>Search</h2>
      <input value={country.value} onChange={country.handleChange} />
      {country.data ? (
        <NationDetails nation={country.data} />
      ) : (
        <div>No such country found!</div>
      )}
    </>
  );
};

export default App;
