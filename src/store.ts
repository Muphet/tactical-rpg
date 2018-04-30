import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import * as reducers from "./reducers/index";

let middlewares;

if (process.env.NODE_ENV !== "production") {
  const { composeWithDevTools } = require("redux-devtools-extension");

  middlewares = composeWithDevTools(applyMiddleware(thunk));
} else {
  middlewares = applyMiddleware(thunk);
}

const store = createStore(combineReducers(reducers), middlewares);

if (process.env.NODE_ENV !== "production") {
  (window as any).store = store;
}

export default store;
