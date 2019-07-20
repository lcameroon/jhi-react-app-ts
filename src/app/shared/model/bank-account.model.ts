import { IOperation } from '../model/operation.model';

export interface IBankAccount {
    id?: number;
    name?: string;
    balance?: number;
    userLogin?: string;
    userId?: number;
    operations?: IOperation[];
}

export const defaultValue: Readonly<IBankAccount> = {};
