import React, { FormEvent, useEffect, useState } from 'react';

type Props = {
    label: string;
}

export const JSTextBox = (props: Props) => {
    const [value, updateText] = useState('');

    useEffect(() => {
        console.log('Search: component rendered');
    });

    const inputChange = (event: any): void => {
        updateText(event.target.value as string || '');
    };
    
    return (
    <div>
        <div>
            {props.label}
        </div>
        <div>
        <input
            type="text"
            placeholder={props.label}
            value={value}
            onChange={inputChange}
        />
        </div>
    </div>
    );

}