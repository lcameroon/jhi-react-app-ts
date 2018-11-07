import moment from 'moment';

import { APP_LOCAL_DATETIME_FORMAT } from '../constants';

export const convertDateTimeFromServer = date =>
    date ? moment(date).format(APP_LOCAL_DATETIME_FORMAT) : null;
