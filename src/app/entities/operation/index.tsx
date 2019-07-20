import React, { Fragment } from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from '../../shared/error/error-boundary-route';

import Operation from './operation';
import OperationDetail from './operation-detail';
import OperationUpdate from './operation-update';
import OperationDeleteDialog from './operation-delete-dialog';

const Routes = ({ match }) => (
    <Fragment>
        <Switch>
            <ErrorBoundaryRoute
                exact
                path={`${match.url}/new`}
                component={OperationUpdate}
            />
            <ErrorBoundaryRoute
                exact
                path={`${match.url}/:id/edit`}
                component={OperationUpdate}
            />
            <ErrorBoundaryRoute
                exact
                path={`${match.url}/:id`}
                component={OperationDetail}
            />
            <ErrorBoundaryRoute path={match.url} component={Operation} />
        </Switch>
        <ErrorBoundaryRoute
            path={`${match.url}/:id/delete`}
            component={OperationDeleteDialog}
        />
    </Fragment>
);

export default Routes;
