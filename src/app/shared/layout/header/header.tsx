import './header.scss';

import React from 'react';
import { Translate, Storage } from 'react-jhipster';
import { Navbar, Nav, NavbarToggler, Collapse } from 'reactstrap';

import LoadingBar from 'react-redux-loading-bar';

import { Home, Brand } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu, LocaleMenu } from '../menus';

export interface IHeaderProps {
    isAuthenticated: boolean;
    isAdmin: boolean;
    ribbonEnv: string;
    isInProduction: boolean;
    isSwaggerEnabled: boolean;
    currentLocale: string;
    onLocaleChange: Function;
}

export interface IHeaderState {
    menuOpen: boolean;
}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
    state: IHeaderState = {
        menuOpen: false
    };

    handleLocaleChange = (event?: any) => {
        const langKey = event.target.value;
        Storage.session.set('locale', langKey);
        this.props.onLocaleChange(langKey);
    };

    renderDevRibbon = () =>
        this.props.isInProduction === false ? (
            <div className="ribbon dev">
                <button className="btn btn-link">
                    <Translate contentKey={`global.ribbon.${this.props.ribbonEnv}`} />
                </button>
            </div>
        ) : null;

    toggleMenu = () => {
        this.setState({ menuOpen: !this.state.menuOpen });
    };

    render() {
        const {
            currentLocale,
            isAuthenticated,
            isAdmin,
            isSwaggerEnabled,
            isInProduction
        } = this.props as any;

        return (
            <div id="app-header">
                {this.renderDevRibbon()}
                <LoadingBar className="loading-bar" />
                <Navbar dark expand="sm" fixed="top" className="jh-navbar">
                    <NavbarToggler aria-label="Menu" onClick={this.toggleMenu} />
                    <Brand />
                    <Collapse isOpen={this.state.menuOpen} navbar>
                        <Nav id="header-tabs" className="ml-auto" navbar>
                            <Home />
                            {isAuthenticated && <EntitiesMenu />}
                            {isAuthenticated &&
                            isAdmin && (
                                <AdminMenu
                                    showSwagger={isSwaggerEnabled}
                                    showDatabase={!isInProduction}
                                />
                            )}
                            <LocaleMenu
                                currentLocale={currentLocale}
                                onClick={this.handleLocaleChange}
                            />
                            <AccountMenu isAuthenticated={isAuthenticated} />
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}
