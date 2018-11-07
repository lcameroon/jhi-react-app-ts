import { combineReducers } from 'redux';

import activate, { ActivateState } from './activate.reducer';
import register, { RegisterState } from './register.reducer';
import password, { PasswordState } from './password.reducer';
import settings, { SettingsState } from './settings.reducer';
import passwordReset, { PasswordResetState } from './password-reset.reducer';

export interface IAccountState {
    readonly activate: ActivateState;
    readonly password: PasswordState;
    readonly passwordReset: PasswordResetState;
    readonly settings: SettingsState;
    readonly register: RegisterState;
}

const accountReducer = combineReducers<IAccountState>({
    activate,
    password,
    passwordReset,
    settings,
    register
});

export default accountReducer;
