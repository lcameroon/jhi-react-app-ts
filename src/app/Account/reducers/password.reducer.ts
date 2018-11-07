import axios from 'axios';
import { createSelector } from 'reselect';

import { IRootState } from '../../rootReducer';
import { REQUEST, SUCCESS, FAILURE } from '../../shared/utils/action-type.util';

export const ACTION_TYPES = {
    UPDATE_PASSWORD: 'account/UPDATE_PASSWORD',
    RESET: 'account/RESET'
};

const initialState = {
    loading: false,
    errorMessage: null,
    updateSuccess: false,
    updateFailure: false
};

export type PasswordState = Readonly<typeof initialState>;

// Reducer
export default (state: PasswordState = initialState, action): PasswordState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.UPDATE_PASSWORD):
            return {
                ...initialState,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            };
        case FAILURE(ACTION_TYPES.UPDATE_PASSWORD):
            return {
                ...initialState,
                loading: false,
                updateSuccess: false,
                updateFailure: true
            };
        case SUCCESS(ACTION_TYPES.UPDATE_PASSWORD):
            return {
                ...initialState,
                loading: false,
                updateSuccess: true,
                updateFailure: false
            };
        case ACTION_TYPES.RESET:
            return {
                ...initialState
            };
        default:
            return state;
    }
};

// Actions
const apiUrl = 'api/account';

export const savePassword = (currentPassword, newPassword) => ({
    type: ACTION_TYPES.UPDATE_PASSWORD,
    payload: axios.post(`${apiUrl}/change-password`, {
        currentPassword,
        newPassword
    }),
    meta: {
        successMessage: `<strong>Password changed!</strong>`,
        errorMessage: `<strong>An error has occurred!</strong> The password could not be changed.`
    }
});

export const reset = () => ({
    type: ACTION_TYPES.RESET
});

// Selectors
const getPasswordState = (state: IRootState) => state.account.password;

export const selectPasswordLoading = createSelector(
    getPasswordState,
    (state: PasswordState) => state.loading
);

export const selectPasswordErrorMessage = createSelector(
    getPasswordState,
    (state: PasswordState) => state.errorMessage
);

export const selectPasswordUpdateSuccess = createSelector(
    getPasswordState,
    (state: PasswordState) => state.updateSuccess
);

export const selectPasswordUpdateFailure = createSelector(
    getPasswordState,
    (state: PasswordState) => state.updateFailure
);
