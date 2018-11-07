import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import { routerReducer } from 'react-router-redux';

import auth, { AuthenticationState } from './Auth/reducers';
import admin, { IAdminState } from './Admin/reducers';
import account, { IAccountState } from './Account/reducers';

export interface IRootState {
    readonly router: any;
    readonly loadingBar: any;
    readonly auth: AuthenticationState;
    readonly admin: IAdminState;
    readonly account: IAccountState;
}

const rootReducer = combineReducers<IRootState>({
    router: routerReducer,
    loadingBar,
    auth,
    admin,
    account
});

export default rootReducer;
