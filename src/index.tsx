import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';

import DevTools from './app/config/devtools';
import initStore from './app/config/store';
import { registerLocale } from './app/config/translation';
import setupAxiosInterceptors from './app/config/axios-interceptor';
import { clearAuthentication } from './app/shared/reducers/authentication';
import ErrorBoundary from './app/shared/error/error-boundary';
import AppComponent from './app';
import { loadIcons } from './app/config/icon-loader';

const devTools = process.env.NODE_ENV === 'development' ? <DevTools /> : null;

const store = initStore();
registerLocale(store);

const actions = bindActionCreators({ clearAuthentication }, store.dispatch);
setupAxiosInterceptors(() => actions.clearAuthentication('login.error.unauthorized'));

loadIcons();

const rootEl = document.getElementById('root');

const render = (Component: any) =>
    ReactDOM.render(
        <ErrorBoundary>
            <Provider store={store}>
                <div>
                    {/* If this slows down the app in dev disable it and enable when required  */}
                    {devTools}
                    <Component />
                </div>
            </Provider>
        </ErrorBoundary>,
        rootEl
    );

render(AppComponent);
