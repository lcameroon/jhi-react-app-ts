import React, { Fragment } from 'react';
import MenuItem from './menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

const accountMenuItemsAuthenticated = (
    <Fragment>
        <MenuItem icon="wrench" to="/account/settings">
            <Translate contentKey="global.menu.account.settings">Settings</Translate>
        </MenuItem>
        <MenuItem icon="lock" to="/account/password">
            <Translate contentKey="global.menu.account.password">Password</Translate>
        </MenuItem>
        <MenuItem icon="sign-out-alt" to="/logout">
            <Translate contentKey="global.menu.account.logout">Sign out</Translate>
        </MenuItem>
    </Fragment>
);

const accountMenuItems = (
    <Fragment>
        <MenuItem id="login-item" icon="sign-in-alt" to="/login">
            <Translate contentKey="global.menu.account.login">Sign in</Translate>
        </MenuItem>
        <MenuItem icon="sign-in-alt" to="/register">
            <Translate contentKey="global.menu.account.register">Register</Translate>
        </MenuItem>
    </Fragment>
);

export const AccountMenu = ({ isAuthenticated = false }) => (
    <NavDropdown
        icon="user"
        name={translate('global.menu.account.main')}
        id="account-menu">
        {isAuthenticated ? accountMenuItemsAuthenticated : accountMenuItems}
    </NavDropdown>
);

export default AccountMenu;
