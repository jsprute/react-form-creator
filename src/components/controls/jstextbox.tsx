import React, { useEffect, useState, ChangeEvent } from 'react';
import { TextField } from '@fluentui/react';
import { FormItem } from '../../models'

type Props = {
    item: FormItem,
    index: string,
    handleChange: (index: string, event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void
}

export const JSTextBox = (props: Props) => {

    useEffect(() => {
    });

    const [value, updateValue] = useState("");

    function handleChange(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string):void {
        if(newValue != null){
            updateValue(newValue);
            props.handleChange(props.index, event, newValue);
        }
    }

    return (
    <div>
            {props.item.label}
        <TextField
            type="text"
            //placeholder={props.item.label}
            value={value}
            onChange={handleChange}
        />
    </div>
    );

}