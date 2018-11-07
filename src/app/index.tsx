import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppContainer } from 'react-hot-loader';

import initStore from './store';
import { setupAxiosInterceptors } from './shared/interceptors';
import { clearAuthentication } from './Auth/reducers';
import { DevTools, ErrorBoundary } from './shared/helpers';
import AppComponent from './app';
import { loadIcons } from './shared/utils/icon-loader.util';

const devTools = process.env.NODE_ENV === 'development' ? <DevTools /> : null;

const store = initStore();

const actions = bindActionCreators({ clearAuthentication }, store.dispatch);
setupAxiosInterceptors(() => actions.clearAuthentication('login.error.unauthorized'));

loadIcons();

const rootEl = document.getElementById('root');

const render = Component =>
    ReactDOM.render(
        <ErrorBoundary>
            <AppContainer>
                <Provider store={store}>
                    <div>
                        {/* If this slows down the app in dev disable it and enable when required  */}
                        {devTools}
                        <Component />
                    </div>
                </Provider>
            </AppContainer>
        </ErrorBoundary>,
        rootEl
    );

render(AppComponent);
