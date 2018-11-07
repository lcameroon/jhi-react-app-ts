import axios from 'axios';
import { createSelector } from 'reselect';

import { IRootState } from '../../rootReducer';
import { REQUEST, SUCCESS, FAILURE } from '../../shared/utils/action-type.util';

export const ACTION_TYPES = {
    CREATE_ACCOUNT: 'register/CREATE_ACCOUNT',
    RESET: 'register/RESET'
};

const initialState = {
    loading: false,
    registrationSuccess: false,
    registrationFailure: false,
    errorMessage: null
};

export type RegisterState = Readonly<typeof initialState>;

// Reducer
export default (state: RegisterState = initialState, action): RegisterState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.CREATE_ACCOUNT):
            return {
                ...state,
                loading: true
            };
        case FAILURE(ACTION_TYPES.CREATE_ACCOUNT):
            return {
                ...initialState,
                registrationFailure: true,
                errorMessage: action.payload.response.data.errorKey
            };
        case SUCCESS(ACTION_TYPES.CREATE_ACCOUNT):
            return {
                ...initialState,
                registrationSuccess: true
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
export const handleRegister = (login, email, password, langKey = 'en') => ({
    type: ACTION_TYPES.CREATE_ACCOUNT,
    payload: axios.post('api/register', { login, email, password, langKey }),
    meta: {
        successMessage: `<strong>Registration saved!</strong> Please check your email for confirmation.`
    }
});

export const reset = () => ({
    type: ACTION_TYPES.RESET
});

// Selectors
const getRegisterState = (state: IRootState) => state.account.register;

export const selectRegistrationLoading = createSelector(
    getRegisterState,
    (state: RegisterState) => state.loading
);

export const selectRegistrationErrorMessage = createSelector(
    getRegisterState,
    (state: RegisterState) => state.errorMessage
);

export const selectRegistrationSuccess = createSelector(
    getRegisterState,
    (state: RegisterState) => state.registrationSuccess
);

export const selectRegistrationFailure = createSelector(
    getRegisterState,
    (state: RegisterState) => state.registrationFailure
);
