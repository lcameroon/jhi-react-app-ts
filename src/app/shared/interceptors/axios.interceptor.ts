import axios from 'axios';

import { Storage } from '../utils/storage.util';
import { SERVER_API_URL, APP_TOKEN_KEY } from '../constants';

const TIMEOUT = 1000000; // 10000
export const setupAxiosInterceptors = onUnauthenticated => {
    const onRequestSuccess = config => {
        const token = Storage.local.get(APP_TOKEN_KEY);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        config.timeout = TIMEOUT;
        config.url = `${SERVER_API_URL}${config.url}`;
        return config;
    };
    const onResponseSuccess = response => response;
    const onResponseError = err => {
        const status = err.status || err.response.status;
        if (status === 403 || status === 401) {
            onUnauthenticated();
        }
        return Promise.reject(err);
    };
    axios.interceptors.request.use(onRequestSuccess);
    axios.interceptors.response.use(onResponseSuccess, onResponseError);
};
