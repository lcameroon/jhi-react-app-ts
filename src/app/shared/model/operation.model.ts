import { Moment } from 'moment';
import { ILabel } from '../model/label.model';

export interface IOperation {
    id?: number;
    date?: Moment;
    description?: string;
    amount?: number;
    bankAccountName?: string;
    bankAccountId?: number;
    labels?: ILabel[];
}

export const defaultValue: Readonly<IOperation> = {};
