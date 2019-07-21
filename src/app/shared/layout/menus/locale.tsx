import React from 'react';
import { DropdownItem } from 'reactstrap';
import { NavDropdown } from './menu-components';
import { locales, languages } from '../../../config/translation';

export const LocaleMenu: any = ({ currentLocale, onClick }) => {
    console.log('languages', languages);
    console.log('currentLocale', currentLocale);
    console.log('locales', locales);

    return (
        locales.length > 1 && (
            <NavDropdown
                icon="flag"
                name={languages[currentLocale] ? languages[currentLocale].name : null}>
                {locales.map(locale => (
                    <DropdownItem key={locale} value={locale} onClick={onClick}>
                        {languages[locale].name}
                    </DropdownItem>
                ))}
            </NavDropdown>
        )
    );
};
