import React, {useState} from 'react';
import { DefaultButton, PrimaryButton } from '@fluentui/react';
import { Storage } from '../services/storage.interface';
import { Dropdown, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

type Props = {
    message: string,
    clickSelect: (value: string) => void,
    clickCancel: () => void,
    storage: Storage,
}

const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 300 }
};

export const JSFormSelector = (props: Props) => {
    const [pull, updatePull] = useState(true);
    const [list, updateList] = useState([] as string[]);
    const [value, updateValue] = useState(undefined as unknown as IDropdownOption);

    if(pull){
        props.storage.ListRecords().then(value => {
            let list = value.filter(item => item != null && item !== '');
            updatePull(false);
            updateList(list);
            console.log(`Pulled ${list.length} records.`)
        });
    }
    
    function handleDropDownChange(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number):void {
        console.log("in change!!");
        if(option !== null && option !== undefined){
            console.log(`Selected option: ${option.key.toString()}`)
            updateValue(option);
        }
    }
        
    let _options = list.map(item => ({key:item, text:item}));

    return (
        <div className="cover" >
            <div className="pop-card">
                <span>{props.message}</span>
                <hr/>
                <div>
                    <Dropdown 
                        placeholder="Select a form"
                        options={_options}
                        styles={dropdownStyles}
                        onChange={handleDropDownChange}
                    />
                </div>
                <hr/>
                <PrimaryButton type="button" onClick={() => props.clickSelect(value.key.toString())} > Ok </PrimaryButton>
                <DefaultButton type="button" onClick={() => props.clickCancel()} > Cancel </DefaultButton>
            </div>
        </div>
    );
}