import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import rootReducer from "./Actions";
import rootSaga from "./Sagas";

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger({ collapsed: true });

export const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);