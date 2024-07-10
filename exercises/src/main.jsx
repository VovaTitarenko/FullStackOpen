import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from '../2_phonebook/Phonebook';
// import App from "../2_countries/Countries";
// import App from '../1_unicafe/Unicafe';

import App from '../1_anecdotes/Anecdotes';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import anecdoteReducer from '../1_anecdotes/reducers/anecdoteReducer';
import filterReducer from '../1_anecdotes/reducers/filterReducer';
const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
});
const store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
const renderApp = () =>
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  );

renderApp();
store.subscribe(() => console.log(store.getState()));
