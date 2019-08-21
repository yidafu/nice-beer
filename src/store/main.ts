import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import sagas from './sagas';
import reducers from './reducers';
import { ConfigState } from './config/types';
import { PostState } from './posts/types';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware, logger),
  ),
);

sagaMiddleware.run(sagas);

export default store;

export interface AppState {
  config: ConfigState,
  posts: PostState,
}
