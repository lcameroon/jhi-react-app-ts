import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, {
    AdministrationState
} from '../../modules/administration/administration.reducer';
import userManagement, {
    UserManagementState
} from '../../modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from '../../modules/account/register/register.reducer';
import activate, { ActivateState } from '../../modules/account/activate/activate.reducer';
import password, { PasswordState } from '../../modules/account/password/password.reducer';
import settings, { SettingsState } from '../../modules/account/settings/settings.reducer';
import passwordReset, {
    PasswordResetState
} from '../../modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import bankAccount, {
  BankAccountState
} from '../../entities/bank-account/bank-account.reducer';
// prettier-ignore
import label, {
  LabelState
} from '../../entities/label/label.reducer';
// prettier-ignore
import operation, {
  OperationState
} from '../../entities/operation/operation.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
    readonly authentication: AuthenticationState;
    readonly locale: LocaleState;
    readonly applicationProfile: ApplicationProfileState;
    readonly administration: AdministrationState;
    readonly userManagement: UserManagementState;
    readonly register: RegisterState;
    readonly activate: ActivateState;
    readonly passwordReset: PasswordResetState;
    readonly password: PasswordState;
    readonly settings: SettingsState;
    readonly bankAccount: BankAccountState;
    readonly label: LabelState;
    readonly operation: OperationState;
    /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
    readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
    authentication,
    locale,
    applicationProfile,
    administration,
    userManagement,
    register,
    activate,
    passwordReset,
    password,
    settings,
    bankAccount,
    label,
    operation,
    /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
    loadingBar
});

export default rootReducer;
