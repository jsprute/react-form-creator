import React, { useEffect, useState, ChangeEvent } from 'react';
import { FormItem } from '../../models'

type Props = {
    item: FormItem,
    index: string,
    handleChange: (index: string, event: ChangeEvent<HTMLInputElement>) => void
}

export const JSCheckBox = (props: Props) => {

    
    useEffect(() => {
    });

    const [value, updateValue] = useState(false);


    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        let _value = event.target.checked;
        updateValue(_value);
        props.handleChange(props.index, event)
    }

    return (
    <div>
            {props.item.label}
        <input
            type="checkbox"
            placeholder={props.item.label}
            checked={value}
            onChange={handleChange}
        />
    </div>
    );

}