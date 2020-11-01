import React, { useEffect, useState } from 'react';
import { Checkbox } from '@fluentui/react';
import { FormItem } from '../../models'

type Props = {
    item: FormItem,
    index: string,
    handleChange: (index: string, event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, value?: any) => void

}

export const JSCheckBox = (props: Props) => {

    
    useEffect(() => {
    });

    const [value, updateValue] = useState(false);


    function handleChange(ev?: React.FormEvent<HTMLInputElement | HTMLElement> | undefined, checked?: boolean | undefined) {
        if(checked != null && ev !== null && ev !== undefined){
            updateValue(checked);
            props.handleChange(props.index, ev as React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, checked);
        }
    }

    return (
    <div>
            {props.item.label}
        <Checkbox
            placeholder={props.item.label}
            checked={value}
            onChange={handleChange}
        />
    </div>
    );

}