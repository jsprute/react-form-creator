import { FormItem } from '../models';
import {Storage} from './storage.interface'
import {classToPlain, plainToClassFromExist, Expose, Type} from "class-transformer";
import localForage from "localforage";

export class LocalStorage implements Storage {
    
  private _store: LocalForage;

  constructor() {
    this._store = localForage.createInstance({
      name: 'Forms',
      version: 1.0,
      storeName: `js-forms-storage`,
      description: 'Custom Form Storage'
    });
  }

    ListRecords(): String[] { 
        //this._store.getItem();
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
      const serializedVersion = classToPlain(form, {excludePrefixes: ["_"] });
      console.log("Serialized version: ", serializedVersion);
    }

}