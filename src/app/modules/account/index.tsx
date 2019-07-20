import React, { Fragment } from 'react';

import ErrorBoundaryRoute from '../../shared/error/error-boundary-route';

import Settings from './settings/settings';
import Password from './password/password';

const Routes = ({ match }) => (
    <Fragment>
        <ErrorBoundaryRoute path={`${match.url}/settings`} component={Settings} />
        <ErrorBoundaryRoute path={`${match.url}/password`} component={Password} />
    </Fragment>
);

export default Routes;
