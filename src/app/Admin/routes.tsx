import React, { Fragment } from 'react';

import { ErrorBoundaryRoute } from '../shared/helpers';
import UserManagementPage from './UserManagement/pages/UserManagementPage';

const Routes = ({ match }) => (
    <Fragment>
        <ErrorBoundaryRoute
            path={`${match.url}/user-management`}
            component={UserManagementPage}
        />
    </Fragment>
);

export default Routes;
