import { IOperation } from '../model/operation.model';

export interface ILabel {
    id?: number;
    label?: string;
    operations?: IOperation[];
}

export const defaultValue: Readonly<ILabel> = {};
