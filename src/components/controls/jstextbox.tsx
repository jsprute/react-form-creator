import React, { FormEvent, useEffect, useState, ChangeEvent } from 'react';

type Props = {
    label: string;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

export const JSTextBox = (props: Props) => {

    useEffect(() => {
    });

    return (
    <div>
        <div>
            {props.label}
        </div>
        <div>
        <input
            type="text"
            placeholder={props.label}
            value={props.value}
            onChange={props.handleChange}
        />
        </div>
    </div>
    );

}