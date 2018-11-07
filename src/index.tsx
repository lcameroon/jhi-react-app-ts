import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppContainer } from 'react-hot-loader';

import { DevTools, ErrorBoundary } from './app/shared/helpers';
import initStore from './app/store';
import { setupAxiosInterceptors } from './app/shared/interceptors';
import { clearAuthentication } from './app/Auth/reducers';
import { loadIcons } from './app/shared/utils';
import AppComponent from './app/app';

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
