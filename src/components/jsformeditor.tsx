import React, {useState, ReactElement} from 'react';
import { FormItem } from '../models';
import { PrimaryButton, DefaultButton, BaseButton, Button } from '@fluentui/react';
import {JSFormEditItem} from './jsformedititem';
type Props = {
    items: FormItem[],
    updateParent?: (formItems: FormItem[]) => void
}

export const JSFormEditor = (props: Props) => {

    let list = props.items;
    const itemList: ReactElement[] = [];
    const [_id, updateNextId] = useState(1);

    function addItem(event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | BaseButton | Button | HTMLSpanElement, MouseEvent>):void {
        let items = [...list, new FormItem(_id.toString(),"single-text", "Item " + list.length.toString(), "No value", [])];
        updateNextId(_id+1);
        if(props.updateParent){
            props.updateParent(items);
        }
    }

    function updateItem(formItem: FormItem):void {
        let items = list.map(item => {if(formItem.id !== item.id) return item; else return formItem;});
        if(props.updateParent){
            props.updateParent(items);
        }

    }

    // will need to create item update!
    function deleteItem(id: string):void {
        console.log(`Deleting item id: ${id}`)
        let items = list
            .filter(item => item.id !== id);
        if(props.updateParent){
            props.updateParent(items);
        }
    }

    list.forEach((item,i) => {
        console.log(item.type);
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
    </div>
    );

}