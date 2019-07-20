export const SERVER_API_URL = process.env.SERVER_API_URL;

export const VERSION = process.env.VERSION || '0.0.1';

export const BUILD_TIMESTAMP = process.env.BUILD_TIMESTAMP || Date.now();

export const BUILD_NUMBER = process.env.BUILD_NUMBER || '001';

export const AUTH_TOKEN_KEY = 'jhi-token';

export const AUTHORITIES = {
    ADMIN: 'ROLE_ADMIN',
    USER: 'ROLE_USER'
};

export const messages = {
    DATA_ERROR_ALERT: 'Internal Error'
};

export const APP_DATE_FORMAT = 'DD/MM/YY HH:mm';
export const APP_TIMESTAMP_FORMAT = 'DD/MM/YY HH:mm:ss';
export const APP_LOCAL_DATE_FORMAT = 'DD/MM/YYYY';
export const APP_LOCAL_DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm';
export const APP_LOCAL_DATETIME_FORMAT_Z = 'YYYY-MM-DDTHH:mm Z';
export const APP_WHOLE_NUMBER_FORMAT = '0,0';
export const APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT = '0,0.[00]';

const config = {
    VERSION,
    BUILD_NUMBER,
    BUILD_TIMESTAMP
};

export default config;
