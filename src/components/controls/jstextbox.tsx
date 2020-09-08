import React, { useEffect, useState, ChangeEvent } from 'react';
import { isTemplateExpression } from 'typescript';
import FormItem from '../../models/formitem'

type Props = {
    item: FormItem
}

export const JSTextBox = (props: Props) => {

    const [value, updateValue] = useState(props.item);

    useEffect(() => {
    });

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        value.value = event.target.value;
        updateValue(value);
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
            value={props.item.value}
            onChange={handleChange}
        />
        </div>
    </div>
    );

}