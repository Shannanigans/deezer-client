import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const saga = createSagaMiddleware();

export default function configureStore() {
  const middlewares = [saga];

  // if (__DEV__) {
  middlewares.push(logger);
  // }

  const store = compose(applyMiddleware(...middlewares))(createStore)(
    rootReducer
  );

  saga.run(rootSaga);
  return store;
}
