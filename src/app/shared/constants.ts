export const SERVER_API_URL =
    process.env.SERVER_API_URL || `${window.location.origin}${window.location.pathname}`;

export const AUTHORITIES = {
    ADMIN: 'ROLE_ADMIN',
    USER: 'ROLE_USER'
};

export const messages = {
    DATA_ERROR_ALERT: 'Internal Error'
};

export const ITEMS_PER_PAGE = 20;

export const APP_VERSION = process.env.VERSION || '0.0.1-dev';
export const APP_TOKEN_KEY = 'jhi-token';
export const APP_DATE_FORMAT = 'DD/MM/YY HH:mm';
export const APP_TIMESTAMP_FORMAT = 'DD/MM/YY HH:mm:ss';
export const APP_LOCAL_DATE_FORMAT = 'DD/MM/YYYY';
export const APP_LOCAL_DATETIME_FORMAT = 'YYYY-MM-DDThh:mm';
export const APP_WHOLE_NUMBER_FORMAT = '0,0';
export const APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT = '0,0.[00]';
