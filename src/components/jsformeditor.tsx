import React, {useState, ReactElement} from 'react';
import { FormItem } from '../models';
import { PrimaryButton, DefaultButton, BaseButton, Button } from '@fluentui/react';

type Props = {
    items: FormItem[],
    handleSave: (values: any) => void
}

export const JSFormEditor = (props: Props) => {

    const [list, updateList] = useState(props.items);
    const itemList: ReactElement[] = [];

    list.forEach((item,i) => {
        itemList.push(
            <div key={i}>
                <span>item.label</span>
                <hr />
            </div>
        );
    });

    function addItem(event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | BaseButton | Button | HTMLSpanElement, MouseEvent>):void {
        updateList(list => [...list, new FormItem("single-text", "Item " + list.length.toString(), "No value", [])]);
        
    }


    return (
    <div>
        {itemList}
        <DefaultButton type="button" onClick={addItem} >Add Item </DefaultButton>
        <PrimaryButton type="button" onClick={() => props.handleSave(list)} > Save </PrimaryButton>
    </div>
    );

}