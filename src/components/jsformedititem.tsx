import React, {useState, ReactElement} from 'react';
import { FormItem } from '../models';
import { PrimaryButton, DefaultButton } from '@fluentui/react';
import { TextField } from '@fluentui/react';
import { Dropdown, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

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

    const [formItem, updateFormItem] = useState(props.item);
    //const [value, updateValue] = useState(undefined as unknown as IDropdownOption);

    function handleLabelChange(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string):void {
        if(newValue != null){
            formItem.label = newValue;
            updateFormItem(new FormItem(formItem.id, formItem.type, formItem.label, formItem.value, formItem.items));
        }
    }

    function handleTypeChange(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number):void {
        //if(option !== null && option !== undefined){
        //    updateValue(option);
        //}
    }

    return (
    <div>
        <hr/>
        <Dropdown
            placeholder="Select an option"
            options={options}
            styles={dropdownStyles}
            defaultSelectedKey={formItem.type}
            onChange={handleTypeChange}
        />
        <TextField type="text" value={formItem.label} onChange={handleLabelChange} />
        <DefaultButton type="button" onClick={() => props.deleteItem(formItem.id)} >Delete </DefaultButton>
        <hr/>
    </div>
    );

}