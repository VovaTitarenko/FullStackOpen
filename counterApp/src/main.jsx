import React from "react";
import ReactDOM from "react-dom/client";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import App from "./App.jsx";
import "./index.css";
import noteReducer from "./reducers/noteReducer";
import filterReducer from "./reducers/filterReducer.js";
import { createNote } from "./reducers/noteReducer";
import { filterChange } from "./reducers/filterReducer";

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
});

const store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
};

renderApp();
store.subscribe(renderApp);
store.subscribe(() => console.log(store.getState()));

store.dispatch(filterChange("IMPORTANT"));
store.dispatch(
  createNote("combineReducers forms one reducer from many simple reducers")
);
