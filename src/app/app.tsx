// Global styles
import '../assets/styles.css';
// App styles
import './app.css';

import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Card } from 'reactstrap';

import { AUTHORITIES } from './shared/constants';
import { IRootState } from './rootReducer';
import {
    getSession,
    selectIsAuthenticated,
    selectAuthAccountAuthorities
} from './Auth/reducers';

import AppRoutes from './routes';
import { ErrorBoundary, hasAnyAuthority } from './shared/helpers';
import { Header, Footer } from './shared/components';

export interface IAppProps extends StateProps, DispatchProps {}

export class App extends React.Component<IAppProps> {
    public componentDidMount() {
        this.props.getSession();
    }

    public render() {
        const paddingTop = '60px';
        return (
            <Router>
                <div className="app-container" style={{ paddingTop }}>
                    <ToastContainer
                        position={toast.POSITION.TOP_LEFT}
                        className="toastify-container"
                        toastClassName="toastify-toast"
                    />
                    <ErrorBoundary>
                        <Header
                            isAuthenticated={this.props.isAuthenticated}
                            isAdmin={this.props.isAdmin}
                        />
                    </ErrorBoundary>
                    <div
                        className="container-fluid view-container"
                        id="app-view-container">
                        <Card className="jh-card">
                            <ErrorBoundary>
                                <AppRoutes />
                            </ErrorBoundary>
                        </Card>
                        <Footer />
                    </div>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = (store: IRootState) => ({
    isAuthenticated: selectIsAuthenticated(store),
    isAdmin: hasAnyAuthority(selectAuthAccountAuthorities(store), [ AUTHORITIES.ADMIN ])
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(App);
