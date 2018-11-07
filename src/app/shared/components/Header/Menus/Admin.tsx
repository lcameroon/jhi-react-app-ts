import React, { Fragment } from 'react';
import { DropdownItem } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavDropdown } from '..';

const adminMenuItems = (
    <Fragment>
        <DropdownItem tag={Link} to="/admin/user-management">
            <FontAwesomeIcon icon="user" /> User management
        </DropdownItem>
    </Fragment>
);

export const AdminMenu = () => (
    <NavDropdown
        icon="user-plus"
        name="Administration"
        style={{ width: '140%' }}
        id="admin-menu">
        {adminMenuItems}
    </NavDropdown>
);

export default AdminMenu;
