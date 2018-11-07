import axios from 'axios';
import { createSelector } from 'reselect';

import { IRootState } from '../rootReducer';
import { REQUEST, SUCCESS, FAILURE } from '../shared/utils/action-type.util';
import { APP_TOKEN_KEY } from '../shared/constants';
import { Storage } from '../shared/utils/storage.util';

export const ACTION_TYPES = {
    LOGIN: 'authentication/LOGIN',
    GET_SESSION: 'authentication/GET_SESSION',
    LOGOUT: 'authentication/LOGOUT',
    CLEAR_AUTH: 'authentication/CLEAR_AUTH',
    ERROR_MESSAGE: 'authentication/ERROR_MESSAGE'
};

const initialState = {
    loading: false,
    isAuthenticated: false,
    loginSuccess: false,
    loginError: false, // Errors returned from server side
    showModalLogin: false,
    account: {} as any,
    errorMessage: null as string, // Errors returned from server side
    redirectMessage: null as string
};

export type AuthenticationState = Readonly<typeof initialState>;

// Reducer

export default (
    state: AuthenticationState = initialState,
    action
): AuthenticationState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.LOGIN):
        case REQUEST(ACTION_TYPES.GET_SESSION):
            return {
                ...state,
                loading: true
            };
        case FAILURE(ACTION_TYPES.LOGIN):
            return {
                ...initialState,
                errorMessage: action.payload,
                showModalLogin: true,
                loginError: true
            };
        case FAILURE(ACTION_TYPES.GET_SESSION):
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                showModalLogin: true,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.LOGIN):
            return {
                ...state,
                loading: false,
                loginError: false,
                showModalLogin: false,
                loginSuccess: true
            };
        case ACTION_TYPES.LOGOUT:
            return {
                ...initialState,
                showModalLogin: true
            };
        case SUCCESS(ACTION_TYPES.GET_SESSION): {
            const isAuthenticated =
                action.payload && action.payload.data && action.payload.data.activated;
            return {
                ...state,
                isAuthenticated,
                loading: false,
                account: action.payload.data
            };
        }
        case ACTION_TYPES.ERROR_MESSAGE:
            return {
                ...initialState,
                showModalLogin: true,
                redirectMessage: action.message
            };
        case ACTION_TYPES.CLEAR_AUTH:
            return {
                ...state,
                loading: false,
                showModalLogin: true,
                isAuthenticated: false
            };
        default:
            return state;
    }
};

export const displayAuthError = message => ({
    type: ACTION_TYPES.ERROR_MESSAGE,
    message
});

export const getSession = () => dispatch =>
    dispatch({
        type: ACTION_TYPES.GET_SESSION,
        payload: axios.get('api/account')
    });

export const login = (username, password, rememberMe = false) => async (
    dispatch,
    getState
) => {
    const result = await dispatch({
        type: ACTION_TYPES.LOGIN,
        payload: axios.post('api/authenticate', { username, password, rememberMe })
    });
    // Alternative: get bearerToken from the header
    // const bearerToken = result.value.headers.authorization;
    // const jwt = bearerToken.slice(7, bearerToken.length);
    const bearerToken = result.value.data && result.value.data.id_token;

    if (bearerToken) {
        Storage.local.set(APP_TOKEN_KEY, bearerToken);
    }
    dispatch(getSession());
};

export const clearAuthToken = () => {
    if (Storage.local.get(APP_TOKEN_KEY)) {
        Storage.local.remove(APP_TOKEN_KEY);
    }
};

export const logout = () => dispatch => {
    clearAuthToken();
    dispatch({
        type: ACTION_TYPES.LOGOUT
    });
};

export const clearAuthentication = messageKey => (dispatch, getState) => {
    clearAuthToken();
    dispatch(displayAuthError(messageKey));
    dispatch({
        type: ACTION_TYPES.CLEAR_AUTH
    });
};

// Selectors
const getAuthenticationState = (state: IRootState) => state.auth;

export const selectAuthLoading = createSelector(
    getAuthenticationState,
    (state: AuthenticationState) => state.loading
);

export const selectIsAuthenticated = createSelector(
    getAuthenticationState,
    (state: AuthenticationState) => state.isAuthenticated
);

export const selectAuthLoginSuccess = createSelector(
    getAuthenticationState,
    (state: AuthenticationState) => state.loginSuccess
);

export const selectAuthLoginError = createSelector(
    getAuthenticationState,
    (state: AuthenticationState) => state.loginError
);

export const selectAuthShowModalLogin = createSelector(
    getAuthenticationState,
    (state: AuthenticationState) => state.showModalLogin
);

export const selectAuthAccount = createSelector(
    getAuthenticationState,
    (state: AuthenticationState) => state.account
);

export const selectAuthAccountAuthorities = createSelector(
    getAuthenticationState,
    (state: AuthenticationState) => state.account.authorities
);

export const selectAuthErrorMessage = createSelector(
    getAuthenticationState,
    (state: AuthenticationState) => state.errorMessage
);

export const selectAuthRedirectMessage = createSelector(
    getAuthenticationState,
    (state: AuthenticationState) => state.redirectMessage
);
