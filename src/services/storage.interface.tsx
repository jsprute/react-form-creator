import {FormItem} from '../models';

export interface Storage {
    ListRecords: () => String[];
    WriteRecords: (records: String[]) => void;
    GetForm: (name: String) => FormItem[];
    SaveForm: (name: String, form: FormItem[]) => void;
}