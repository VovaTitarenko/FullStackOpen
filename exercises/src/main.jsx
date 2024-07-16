import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from '../2_phonebook/Phonebook';
import App from '../2_countries/Countries';
// import App from '../1_unicafe/Unicafe';

// import App from '../1_anecdotes/Anecdotes';
// import { configureStore } from '@reduxjs/toolkit';
// import { Provider } from 'react-redux';
// import anecdoteReducer from '../1_anecdotes/reducers/anecdoteReducer';
// import filterReducer from '../1_anecdotes/reducers/filterReducer';
// import notificationReducer from '../1_anecdotes/reducers/notificationReducer';
// const store = configureStore({
//   reducer: {
//     anecdotes: anecdoteReducer,
//     filter: filterReducer,
//     notification: notificationReducer,
//   },
// });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <App />
    {/* </Provider> */}
  </React.StrictMode>,
);

// store.subscribe(() => console.log(store.getState()));
