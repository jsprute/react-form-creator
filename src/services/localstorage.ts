import { FormItem } from '../models';
import {Storage} from './storage.interface'
import {classToPlain} from "class-transformer";
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
  
    ListRecords(): Promise<string[]> {
      return new Promise<string[]>((resolve, reject) => {
        this._store.getItem("_js_forms")
        .then(value => {
              resolve((value as string).split(";"));
          })
          .catch(err => {
            reject(err);
          }) 
        });
    };

    WriteRecords(records: string[]): Promise<void> {
      return new Promise<void>((resolve, reject) => {
        this._store.setItem("_js_forms",records.join(";"))
        .then(value => {
              resolve();
          })
          .catch(err => {
            reject(err);
          }) 
        });
    }
    
    GetForm(name: string){


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

    SaveForm(name: string, form: FormItem[]){
      const serializedVersion = classToPlain(form, {excludePrefixes: ["_"] });
      console.log("Serialized version: ", serializedVersion);
      return new Promise<void>((resolve, reject) => {
        this._store.setItem(name, serializedVersion)
        .then(value => {
              resolve();
          })
          .catch(err => {
            reject(err);
          }) 
        });
    }

    DeleteForm(name: string) {
      return new Promise<void>((resolve, reject) => {
        this._store.removeItem(name)
          .then(value => {resolve();})
          .catch(err => {reject(err);});
      });
    }


}