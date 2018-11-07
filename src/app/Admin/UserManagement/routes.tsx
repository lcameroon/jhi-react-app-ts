import React from 'react';
import { Switch } from 'react-router-dom';

import { ErrorBoundaryRoute } from '../../shared/helpers';
// Admin
import UserManagement from './pages/UserManagementPage';
import UserManagementDetail from './pages/UserManagementDetailPage';
import UserManagementUpdate from './pages/UserManagementUpdatePage';
import UserManagementDeleteDialog from './components/UserManagementDeleteDialog';

const Routes = ({ match }) => (
    <div>
        <Switch>
            <ErrorBoundaryRoute
                exact
                path={`${match.url}/new`}
                component={UserManagementUpdate}
            />
            <ErrorBoundaryRoute
                exact
                path={`${match.url}/:login/edit`}
                component={UserManagementUpdate}
            />
            <ErrorBoundaryRoute
                exact
                path={`${match.url}/:login`}
                component={UserManagementDetail}
            />
            <ErrorBoundaryRoute path={match.url} component={UserManagement} />
        </Switch>
        <ErrorBoundaryRoute
            path={`${match.url}/:login/delete`}
            component={UserManagementDeleteDialog}
        />
    </div>
);

export default Routes;
