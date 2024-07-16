import { useState, useEffect } from 'react';
import axios from 'axios';

export const useCountry = () => {
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState(null);

  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries';

  useEffect(() => {
    console.log(searchValue);
    axios
      .get(`${baseUrl}/api/name/${searchValue}`)
      .then((response) => {
        console.log(response.data);
        return setData(response.data);
      })
      .catch((error) => {
        setData(null);
      });
  }, [searchValue]);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return { searchValue, handleChange, data };
};
