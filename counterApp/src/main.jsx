import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import { Provider } from "react-redux";
// import store from "./store.js";
// import App from "./ReduxApp.jsx";

// import App from "./useReducerCounter";

// import App from "./RouterNoteApp";
// import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        {/* <Provider store={store}> */}
        {/* <Router> */}
        <App />
        {/* </Router> */}
        {/* </Provider> */}
    </React.StrictMode>
);
