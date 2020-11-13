import React, {useState, ReactElement} from 'react';
import { FormItem } from '../models';
import { PrimaryButton, DefaultButton, BaseButton, Button } from '@fluentui/react';
import {JSFormEditItem} from './jsformedititem';
type Props = {
    items: FormItem[],
    handleSave: (values: any) => void
}

export const JSFormEditor = (props: Props) => {

    const [list, updateList] = useState(props.items);
    const itemList: ReactElement[] = [];
    const [_id, updateNextId] = useState(1);

    function addItem(event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | BaseButton | Button | HTMLSpanElement, MouseEvent>):void {
        updateList(list => [...list, new FormItem(_id.toString(),"single-text", "Item " + list.length.toString(), "No value", [])]);
        updateNextId(_id+1);
    }

    function updateItem(formItem: FormItem):void {
        let tempList = list.map(item => {if(formItem.id !== item.id) return item; else return formItem;});
        updateList(tempList);
    }

    // will need to create item update!
    function deleteItem(id: string):void {
        console.log(`Deleting item id: ${id}`)
        let tempList = list
            .filter(item => item.id !== id);
        updateList(tempList);
    }

    list.forEach((item,i) => {
        itemList.push(
            <div key={item.id}>
                <JSFormEditItem item={item} updateItem={updateItem} deleteItem={deleteItem}/>
            </div>
        );
    });

    console.log(list);
    return (
    <div>
        {itemList}
        <DefaultButton type="button" onClick={addItem} >Add Item </DefaultButton>
        <PrimaryButton type="button" onClick={() => props.handleSave(list)} > Save </PrimaryButton>
    </div>
    );

}