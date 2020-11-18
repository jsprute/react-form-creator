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
          new FormItem("1","single-text","First Name","",[]),
          new FormItem("2","single-text","Middle Name","",[]),
          new FormItem("3","single-text","Third Name","",[]),
          new FormItem("4","checkbox","Enabled",true,[]),
          new FormItem("5","group","My Group","",[
            new FormItem("6","single-text","City","",[]),
            new FormItem("7","single-text","State","",[]),
            new FormItem("8","group","My Sub-Group","",[
              new FormItem("9","single-text","Zip","",[]),
              new FormItem("10","single-text","Code","",[])
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