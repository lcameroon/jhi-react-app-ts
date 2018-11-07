import './styles.css';

import React from 'react';
import LoadingBar from 'react-redux-loading-bar';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    NavItem,
    NavLink,
    NavbarBrand,
    Navbar,
    Nav,
    NavbarToggler,
    Collapse
} from 'reactstrap';

import { AdminMenu, ContatcsMenu, AccountMenu } from './Menus';
import { APP_VERSION } from '../../constants';

export const NavDropdown = props => (
    <UncontrolledDropdown nav inNavbar id={props.id}>
        <DropdownToggle nav caret className="d-flex align-items-center">
            <FontAwesomeIcon icon={props.icon} />
            <span>{props.name}</span>
        </DropdownToggle>
        <DropdownMenu right style={props.style}>
            {props.children}
        </DropdownMenu>
    </UncontrolledDropdown>
);

const BrandIcon = props => (
    <div {...props} className="brand-icon">
        <img
            src={require('../../../../assets/images/logo-jhipster-react.svg')}
            alt="Logo"
        />
    </div>
);

const Brand = props => (
    <NavbarBrand tag={Link} to="/" className="brand-logo">
        <BrandIcon />
        <span className="brand-title">React App</span>
        <span className="navbar-version">{APP_VERSION}</span>
    </NavbarBrand>
);

const Home = props => (
    <NavItem>
        <NavLink tag={Link} to="/" className="d-flex align-items-center">
            <FontAwesomeIcon icon="home" />
            <span>Home</span>
        </NavLink>
    </NavItem>
);

export interface IHeaderProps {
    isAuthenticated: boolean;
    isAdmin: boolean;
}

export interface IHeaderState {
    menuOpen: boolean;
}

export class Header extends React.Component<IHeaderProps, IHeaderState> {
    state: IHeaderState = {
        menuOpen: false
    };

    toggleMenu = () => {
        this.setState({ menuOpen: !this.state.menuOpen });
    };

    render() {
        const { isAuthenticated, isAdmin } = this.props;

        return (
            <div id="app-header">
                <LoadingBar className="loading-bar" />
                <Navbar dark expand="sm" fixed="top" className="jh-navbar">
                    <NavbarToggler aria-label="Menu" onClick={this.toggleMenu} />
                    <Brand />
                    <Collapse isOpen={this.state.menuOpen} navbar>
                        <Nav id="header-tabs" className="ml-auto" navbar>
                            <Home />
                            {isAuthenticated && <ContatcsMenu />}
                            {isAuthenticated && isAdmin && <AdminMenu />}
                            <AccountMenu isAuthenticated={isAuthenticated} />
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}
