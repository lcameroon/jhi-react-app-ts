import { createStore, applyMiddleware, compose } from 'redux';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';

import reducer, { IRootState } from './rootReducer';
import { DevTools } from './shared/helpers';
import errorMiddleware from './shared/middlewares/error.middleware';
import notificationMiddleware from './shared/middlewares/notification.middleware';
import loggerMiddleware from './shared/middlewares/logger.middleware';

const defaultMiddlewares = [
    thunkMiddleware,
    errorMiddleware,
    notificationMiddleware,
    promiseMiddleware(),
    loadingBarMiddleware(),
    loggerMiddleware
];
const composedMiddlewares = middlewares =>
    process.env.NODE_ENV === 'development'
        ? compose(
              applyMiddleware(...defaultMiddlewares, ...middlewares),
              DevTools.instrument()
          )
        : compose(applyMiddleware(...defaultMiddlewares, ...middlewares));

const initialize = (initialState?: IRootState | any, middlewares = []) =>
    createStore(reducer, initialState, composedMiddlewares(middlewares));

export default initialize;
