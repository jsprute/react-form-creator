import {FormItem} from '../models';

export interface Storage {
    ListRecords: () => Promise<string[]>;
    WriteRecords: (records: string[]) => Promise<void>;
    GetForm: (name: string) => Promise<FormItem[]>;
    SaveForm: (name: string, form: FormItem[]) => Promise<void>;
    DeleteForm: (name: string) => Promise<void>;
}