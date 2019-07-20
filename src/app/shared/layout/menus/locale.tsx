import React from 'react';
import { DropdownItem } from 'reactstrap';
import { NavDropdown } from './menu-components';
import { locales, languages } from '../../../config/translation';

export const LocaleMenu: any = ({ currentLocale, onClick }) =>
    Object.keys(languages).length > 1 && (
        <NavDropdown
            icon="flag"
            name={currentLocale ? languages[currentLocale].name : undefined}>
            {locales.map(locale => (
                <DropdownItem key={locale} value={locale} onClick={onClick}>
                    {languages[locale].name}
                </DropdownItem>
            ))}
        </NavDropdown>
    );