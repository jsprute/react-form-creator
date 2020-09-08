
export class FormItem {
        
        constructor(
                private _id: string,
                private _type: string,
                private _label: string,
                private _value: string,
                private _items: FormItem[],
        ) {}

        get id(): string {return this._id;}
        set id(id: string) {this._id = id;}

        get type(): string {return this._type;}
        set type(type: string) {this._type = type;}

        get label(): string {return this._label;}
        set label(label: string) {this._label = label;}

        get value(): string {return this._value;}
        set value(value: string) {this._value = value;}

        get items(): FormItem[] {return this._items;}
        set items(items: FormItem[]) {this._items = items;}
        
}

export default FormItem;