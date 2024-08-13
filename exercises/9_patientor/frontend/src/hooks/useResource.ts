import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const useResource = (baseUrl: string) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios.get(baseUrl).then((response) => setResources(response.data));
  }, []);

  //   let token = null;
  //   const setToken = (newToken) => {
  //     token = `bearer ${newToken}`;
  //   };

  const create = async (newObject: {}) => {
    // const config = {
    //   headers: { Authorization: token },
    // };
    // const response = await axios.post(baseUrl, newObject, config);
    const response = await axios.post(baseUrl, newObject);
    setResources(resources.concat(response.data));
    return response.data;
  };

  const update = async (id: string, newObject: string) => {
    // const config = {
    //   headers: { Authorization: token },
    // };
    // const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
    const response = await axios.put(`${baseUrl}/${id}`, newObject);
    return response.data;
  };

  //   const service = { create, update, setToken };
  const service = { create, update };

  return [resources, service];
};

export default useResource;
