import React from 'react';
import { Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import { ErrorBoundaryRoute, PrivateRoute } from './shared/helpers';
import { AUTHORITIES } from './shared/constants';
import PageNotFound from './shared/components/PageNotFound';
// Account
import RegisterPage from './Account/pages/RegisterPage';
import ActivatePage from './Account/pages/ActivatePage';
import PasswordResetInitPage from './Account/pages/PasswordResetInitPage';
import PasswordResetFinishPage from './Account/pages/PasswordResetFinishPage';
// Auth
import Login from './Auth/pages/LoginPage';
import Logout from './Auth/pages/LogoutPage';
// Home
import HomePage from './Home/pages/HomePage';

const Account = Loadable({
    loader: () => import('./Account/routes'),
    loading: () => <div>loading ...</div>
});

const Admin = Loadable({
    loader: () => import('./Admin/routes'),
    loading: () => <div>loading ...</div>
});

const Routes = () => (
    <div className="view-routes">
        <ErrorBoundaryRoute path="/login" component={Login} />
        <Switch>
            <ErrorBoundaryRoute path="/logout" component={Logout} />
            <ErrorBoundaryRoute path="/register" component={RegisterPage} />
            <ErrorBoundaryRoute path="/activate/:key?" component={ActivatePage} />
            <ErrorBoundaryRoute path="/reset/request" component={PasswordResetInitPage} />
            <ErrorBoundaryRoute
                path="/reset/finish/:key?"
                component={PasswordResetFinishPage}
            />
            <PrivateRoute
                path="/admin"
                component={Admin}
                hasAnyAuthorities={[ AUTHORITIES.ADMIN ]}
            />
            <PrivateRoute
                path="/account"
                component={Account}
                hasAnyAuthorities={[ AUTHORITIES.ADMIN, AUTHORITIES.USER ]}
            />
            <ErrorBoundaryRoute path="/" component={HomePage} />
            <ErrorBoundaryRoute path="*" component={PageNotFound} />
        </Switch>
    </div>
);

export default Routes;
