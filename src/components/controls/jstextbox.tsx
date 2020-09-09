import React, { useEffect, useState, ChangeEvent } from 'react';
import { FormItem } from '../../models'

type Props = {
    item: FormItem,
    index: string,
    handleChange: (index: string, event: ChangeEvent<HTMLInputElement>) => void
}

export const JSTextBox = (props: Props) => {

    
    useEffect(() => {
    });

    const [value, updateValue] = useState("");


    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        let _value = event.target.value;
        updateValue(_value);
        props.handleChange(props.index, event)
    }

    return (
    <div>
        <div>
            {props.item.label}
        </div>
        <div>
        <input
            type="text"
            placeholder={props.item.label}
            value={value}
            onChange={handleChange}
        />
        </div>
    </div>
    );

}