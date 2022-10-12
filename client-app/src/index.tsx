import React from "react";
import ReactDOM from "react-dom";
import "./app/layout/styles.css";
import "react-calendar/dist/Calendar.css";
import "react-toastify/dist/ReactToastify.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { createBrowserHistory } from "history";

import App from "./app/layout/App";
import { store, StoreContext } from "./app/stores/store";
import { Router } from "react-router-dom";

export const history = createBrowserHistory();

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <Router history={history}>
      <App />
    </Router>
  </StoreContext.Provider>,
  document.getElementById("root")
);
