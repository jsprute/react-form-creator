import { Expose } from "class-transformer";

export class FormItem {


        constructor(
                private _id: string,
                private _type: string,
                private _label: string,
                private _value: string | boolean,
                private _items: FormItem[],
        ) {}

        @Expose()
        get id(): string {return this._id;}
        set id(id: string) {this._id = id;}

        @Expose()
        get type(): string {return this._type;}
        set type(type: string) {this._type = type;}

        @Expose()
        get label(): string {return this._label;}
        set label(label: string) {this._label = label;}

        @Expose()
        get value(): string | boolean {return this._value;}
        set value(value: string | boolean) {this._value = value;}

        @Expose()
        get items(): FormItem[] {return this._items;}
        set items(items: FormItem[]) {this._items = items;}
        
}

export default FormItem;