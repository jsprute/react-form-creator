import React, {useEffect, useState} from 'react';
import { PrimaryButton, DefaultButton } from '@fluentui/react';
import { TextField } from '@fluentui/react';

type Props = {
    clickHandle: (value: string) => void,
    cancelHandle: () => void,
    message: string
}

export const JSTextInputPopUp = (props: Props) => {

    const [value, updateValue] = useState("");

    function handleChange(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string):void {
        if(newValue != null){
            updateValue(newValue);
        }
    }
    
    return (
    <div className="cover" >
        <div className="pop-card">
        <span>{props.message}</span>
        <TextField type="text" value={value} onChange={handleChange} />
            <hr/>
            <PrimaryButton type="button" onClick={() => props.clickHandle(value)} > OK </PrimaryButton>
            <DefaultButton type="button" onClick={() => props.cancelHandle()} > Cancel </DefaultButton>
        </div>
    </div>
    );

}