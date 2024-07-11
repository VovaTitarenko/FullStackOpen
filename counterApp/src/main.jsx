import React from "react";
import ReactDOM from "react-dom/client";
// import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import store from "./store.js";
import App from "./App.jsx";
import "./index.css";

// import noteReducer from "./reducers/noteReducer";
// import filterReducer from "./reducers/filterReducer.js";

// const store = configureStore({
//   reducer: {
//     notes: noteReducer,
//     filter: filterReducer,
//   },
// });

console.log(store.getState());

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
