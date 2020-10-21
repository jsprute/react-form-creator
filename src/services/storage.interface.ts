import {FormItem} from '../models';

export interface Storage {
    ListRecords: () => Promise<string[]>;
    WriteRecords: (records: string[]) => Promise<void>;
    GetForm: (name: string) => FormItem[];
    SaveForm: (name: string, form: FormItem[]) => void;
}