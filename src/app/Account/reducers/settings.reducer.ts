import axios from 'axios';
import { createSelector } from 'reselect';

import { IRootState } from '../../rootReducer';
import { REQUEST, SUCCESS, FAILURE } from '../../shared/utils/action-type.util';
import { getSession } from '../../Auth/reducers';

export const ACTION_TYPES = {
    UPDATE_ACCOUNT: 'account/UPDATE_ACCOUNT',
    RESET: 'account/RESET'
};

const initialState = {
    loading: false,
    errorMessage: null,
    updateSuccess: false,
    updateFailure: false
};

export type SettingsState = Readonly<typeof initialState>;

// Reducer
export default (state: SettingsState = initialState, action): SettingsState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.UPDATE_ACCOUNT):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            };
        case FAILURE(ACTION_TYPES.UPDATE_ACCOUNT):
            return {
                ...state,
                loading: false,
                updateSuccess: false,
                updateFailure: true
            };
        case SUCCESS(ACTION_TYPES.UPDATE_ACCOUNT):
            return {
                ...state,
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

export const saveAccountSettings = account => async dispatch => {
    await dispatch({
        type: ACTION_TYPES.UPDATE_ACCOUNT,
        payload: axios.post(apiUrl, account),
        meta: {
            successMessage: `<strong>Settings saved!</strong>`
        }
    });
    dispatch(getSession());
};

export const reset = () => ({
    type: ACTION_TYPES.RESET
});

// Selectors
const getSettingsState = (state: IRootState) => state.account.settings;

export const selectSettingsLoading = createSelector(
    getSettingsState,
    (state: SettingsState) => state.loading
);

export const selectSettingsErrorMessage = createSelector(
    getSettingsState,
    (state: SettingsState) => state.errorMessage
);

export const selectSettingsUpdateSuccess = createSelector(
    getSettingsState,
    (state: SettingsState) => state.updateSuccess
);

export const selectSettingsUpdateFailure = createSelector(
    getSettingsState,
    (state: SettingsState) => state.updateFailure
);
