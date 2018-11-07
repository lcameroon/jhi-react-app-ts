import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col, Alert } from 'reactstrap';

import { IRootState } from '../../rootReducer';
import {
    activateAction,
    reset,
    selectActivationSuccess,
    selectActivationFailure
} from '../reducers/activate.reducer';

const successAlert = (
    <Alert color="success">
        <strong>Your user account has been activated.</strong> Please
        <Link to="/login" className="alert-link">
            sign in
        </Link>.
    </Alert>
);

const failureAlert = (
    <Alert color="danger">
        <strong>Your user could not be activated.</strong> Please use the registration
        form to sign up.
    </Alert>
);

export interface IActivateProps
    extends StateProps,
        DispatchProps,
        RouteComponentProps<{ key: any }> {}

export class ActivatePage extends React.Component<IActivateProps> {
    componentWillUnmount() {
        this.props.reset();
    }

    componentDidMount() {
        const { key } = this.props.match.params;
        this.props.activateAction(key);
    }

    render() {
        const { activationSuccess, activationFailure } = this.props;

        return (
            <div>
                <Row className="justify-content-center">
                    <Col md="8">
                        <h1>Activation</h1>
                        {activationSuccess ? successAlert : undefined}
                        {activationFailure ? failureAlert : undefined}
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (store: IRootState) => ({
    activationSuccess: selectActivationSuccess(store),
    activationFailure: selectActivationFailure(store)
});

const mapDispatchToProps = { activateAction, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ActivatePage);
