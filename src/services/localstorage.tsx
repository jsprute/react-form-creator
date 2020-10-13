import { FormItem } from '../models';
import {Storage} from './storage.interface'

export class LocalStorage implements Storage {
    
    ListRecords() { 
        return [];
    };

    WriteRecords(records: String[]){

    }
    
    GetForm(name: String){
        return [
            new FormItem("single-text","First Name","",[]),
            new FormItem("single-text","Middle Name","",[]),
            new FormItem("single-text","Third Name","",[]),
            new FormItem("checkbox","Enabled",true,[]),
            new FormItem("group","My Group","",[
              new FormItem("single-text","City","",[]),
              new FormItem("single-text","State","",[]),
              new FormItem("group","My Sub-Group","",[
                new FormItem("single-text","Zip","",[]),
                new FormItem("single-text","Code","",[])
              ])
            ])
          ];
    }

    SaveForm(name: String, form: FormItem[]){
        
    }

}