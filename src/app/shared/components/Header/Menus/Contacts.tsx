import React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ContatcsMenu = props => (
    <NavItem>
        <NavLink tag={Link} to="/contatcs" className="d-flex align-items-center">
            <FontAwesomeIcon icon="book" />
            <span>Contatcs</span>
        </NavLink>
    </NavItem>
);
