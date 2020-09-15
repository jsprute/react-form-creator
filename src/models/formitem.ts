
export class FormItem {

        constructor(
                private _type: string,
                private _label: string,
                private _value: string | boolean,
                private _items: FormItem[],
        ) {}

        get type(): string {return this._type;}
        set type(type: string) {this._type = type;}

        get label(): string {return this._label;}
        set label(label: string) {this._label = label;}

        get value(): string | boolean {return this._value;}
        set value(value: string | boolean) {this._value = value;}

        get items(): FormItem[] {return this._items;}
        set items(items: FormItem[]) {this._items = items;}
        
}

export default FormItem;