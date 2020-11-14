import React from 'react';
import { FormItem } from '../models';
import { DefaultButton } from '@fluentui/react';
import { TextField } from '@fluentui/react';
import { Dropdown, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import {JSFormEditor} from './jsformeditor';

type Props = {
    item: FormItem,
    updateItem: (formItem: FormItem) => void,
    deleteItem: (id: string) => void,
}

const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 300 }
};

            
const options: IDropdownOption[] = [
    { key: 'single-text', text: 'single-text' },
    { key: 'checkbox', text: 'checkbox' },
    { key: 'group', text: 'group' },
];

export const JSFormEditItem = (props: Props) => {

    function handleLabelChange(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string):void {
        if(newValue != null){
            let formItem: FormItem = props.item;
            formItem.label = newValue;
            let _temp: FormItem = new FormItem(formItem.id, formItem.type, formItem.label, formItem.value, formItem.items); 
            props.updateItem(_temp);
        }
    }

    function handleTypeChange(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number):void {
        if(option !== null && option !== undefined){
            let formItem: FormItem = props.item;
            formItem.type = option.key.toString();
            let _temp: FormItem = new FormItem(formItem.id, formItem.type, formItem.label, formItem.value, formItem.items); 
            props.updateItem(_temp);
        }
    }

    return (
    <div>
        <hr/>
        <Dropdown
            placeholder="Select an option"
            options={options}
            styles={dropdownStyles}
            defaultSelectedKey={props.item.type}
            onChange={handleTypeChange}
            id={props.item.id}
        />
        <TextField type="text" value={props.item.label} onChange={handleLabelChange} />
        <div hidden={props.item.type != "group"}>
            <JSFormEditor items={props.item.items}></JSFormEditor>
        </div>
        <DefaultButton type="button" onClick={() => props.deleteItem(props.item.id)} >Delete </DefaultButton>
        <hr/>
    </div>
    );

}