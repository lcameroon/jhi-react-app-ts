import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';

import Login from './modules/login/login';
import Register from './modules/account/register/register';
import Activate from './modules/account/activate/activate';
import PasswordResetInit from './modules/account/password-reset/init/password-reset-init';
import PasswordResetFinish from './modules/account/password-reset/finish/password-reset-finish';
import Logout from './modules/login/logout';
import Home from './modules/home/home';
import PrivateRoute from './shared/auth/private-route';
import ErrorBoundaryRoute from './shared/error/error-boundary-route';
import PageNotFound from './shared/error/page-not-found';
import { AUTHORITIES } from './config/constants';

const Entities = React.lazy(() => import('./entities'));
const Account = React.lazy(() => import('./modules/account'));
const Admin = React.lazy(() => import('./modules/administration'));

const Routes = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <Switch>
            <ErrorBoundaryRoute path="/login" component={Login} />
            <ErrorBoundaryRoute path="/logout" component={Logout} />
            <ErrorBoundaryRoute path="/register" component={Register} />
            <ErrorBoundaryRoute path="/activate/:key?" component={Activate} />
            <ErrorBoundaryRoute path="/reset/request" component={PasswordResetInit} />
            <ErrorBoundaryRoute
                path="/reset/finish/:key?"
                component={PasswordResetFinish}
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
            <PrivateRoute
                path="/entity"
                component={Entities}
                hasAnyAuthorities={[ AUTHORITIES.USER ]}
            />
            <ErrorBoundaryRoute path="/" exact component={Home} />
            <ErrorBoundaryRoute component={PageNotFound} />
        </Switch>
    </Suspense>
);

export default Routes;
