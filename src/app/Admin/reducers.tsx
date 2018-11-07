import { combineReducers } from 'redux';

import userManagement, { UserManagementState } from './UserManagement/reducer';

export interface IAdminState {
    readonly userManagement: UserManagementState;
}

const adminReducer = combineReducers<IAdminState>({
    userManagement
});

export default adminReducer;
