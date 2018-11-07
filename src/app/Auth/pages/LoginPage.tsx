import React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import { IRootState } from '../../rootReducer';
import {
    login,
    selectIsAuthenticated,
    selectAuthLoginError,
    selectAuthShowModalLogin
} from '../reducers';
import LoginModal from '../components/LoginModal';

export interface ILoginProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export interface ILoginState {
    showModal: boolean;
}

export class Login extends React.Component<ILoginProps, ILoginState> {
    state: ILoginState = {
        showModal: this.props.showModal
    };

    componentDidUpdate(prevProps: ILoginProps, prevState) {
        if (this.props !== prevProps) {
            this.setState({ showModal: this.props.showModal });
        }
    }

    handleLogin = (username, password, rememberMe = false) => {
        this.props.login(username, password, rememberMe);
    };

    handleClose = () => {
        this.setState({ showModal: false });
    };

    render() {
        const { location, isAuthenticated } = this.props;
        const { from } = location.state || {
            from: { pathname: '/', search: location.search }
        };
        const { showModal } = this.state;
        if (isAuthenticated) {
            return <Redirect to={from} />;
        }
        return (
            <LoginModal
                showModal={showModal}
                handleLogin={this.handleLogin}
                handleClose={this.handleClose}
                loginError={this.props.loginError}
            />
        );
    }
}

const mapStateToProps = (store: IRootState) => ({
    isAuthenticated: selectIsAuthenticated(store),
    loginError: selectAuthLoginError(store),
    showModal: selectAuthShowModalLogin(store)
});

const mapDispatchToProps = { login };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
