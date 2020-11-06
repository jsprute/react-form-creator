import React, {useState, ReactElement} from 'react';
import { FormItem } from '../models';
import { PrimaryButton, DefaultButton } from '@fluentui/react';

type Props = {
    items: FormItem[],
    handleSave: (values: any) => void
}

export const JSFormEditItem = (props: Props) => {

    const [list, updateList] = useState(props.items);
    const itemList: ReactElement[] = [];

    props.items.forEach((item,i) => {
        itemList.push(
            <div key={i}>
                <span>item.label</span>
            </div>
        );
    });

    function addItem(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string):void {
        list.push(new FormItem("single-text", "Item " + list.length.toString(), "No value", []));
        updateList(list);
    }


    return (
    <div>
        {itemList}
        <DefaultButton type="button" onClick={() => addItem} >Add Item </DefaultButton>
        <PrimaryButton type="button" onClick={() => props.handleSave(list)} > Save </PrimaryButton>
    </div>
    );

}