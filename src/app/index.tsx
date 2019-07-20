import '../assets/scss/main.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'reactstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { hot } from 'react-hot-loader';

import { IRootState } from './shared/reducers';
import { getSession } from './shared/reducers/authentication';
import { getProfile } from './shared/reducers/application-profile';
import { setLocale } from './shared/reducers/locale';
import Header from './shared/layout/header/header';
import Footer from './shared/layout/footer/footer';
import { hasAnyAuthority } from './shared/auth/private-route';
import ErrorBoundary from './shared/error/error-boundary';
import { AUTHORITIES } from './config/constants';
import AppRoutes from './routes';

const baseHref = (document as any)
    .querySelector('base')
    .getAttribute('href')
    .replace(/\/$/, '');

export interface IAppProps extends StateProps, DispatchProps {}

export class App extends React.Component<IAppProps> {
    componentDidMount() {
        this.props.getSession();
        this.props.getProfile();
    }

    render() {
        const paddingTop = '60px';
        return (
            <Router basename={baseHref}>
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
                            currentLocale={`${this.props.currentLocale}`}
                            onLocaleChange={this.props.setLocale}
                            ribbonEnv={this.props.ribbonEnv}
                            isInProduction={this.props.isInProduction}
                            isSwaggerEnabled={this.props.isSwaggerEnabled}
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

const mapStateToProps = ({ authentication, applicationProfile, locale }: IRootState) => ({
    currentLocale: locale.currentLocale,
    isAuthenticated: authentication.isAuthenticated,
    isAdmin: hasAnyAuthority(authentication.account['authorities'], [
        AUTHORITIES.ADMIN
    ]),
    ribbonEnv: applicationProfile.ribbonEnv,
    isInProduction: applicationProfile.inProduction,
    isSwaggerEnabled: applicationProfile.isSwaggerEnabled
});

const mapDispatchToProps = { setLocale, getSession, getProfile };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(App) as any);
