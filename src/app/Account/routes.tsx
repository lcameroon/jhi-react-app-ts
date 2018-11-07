import React, { Fragment } from 'react';

import { ErrorBoundaryRoute } from '../shared/helpers';
// features
import Settings from './pages/SettingsPage';
import Password from './pages/PasswordPage';

const Routes = ({ match }) => (
    <Fragment>
        <ErrorBoundaryRoute path={`${match.url}/settings`} component={Settings} />
        <ErrorBoundaryRoute path={`${match.url}/password`} component={Password} />
    </Fragment>
);

export default Routes;
