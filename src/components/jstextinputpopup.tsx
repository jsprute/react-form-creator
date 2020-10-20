import React, {ReactElement, useEffect, useState} from 'react';
import { PrimaryButton, DefaultButton } from '@fluentui/react';
import { TextField } from '@fluentui/react';

type Props = {
    clickHandle: (value: string) => void,
    cancelHandle: () => void,
}

export const JSTextInputPopUp = (props: Props) => {

    useEffect(() => {
        console.log("JSTextInputPopUp did mount!");
    });

    const [value, updateValue] = useState("");

    function handleChange(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string):void {
        if(newValue != null){
            updateValue(newValue);
        }
    }
    
    return (
    <div className="cover" >
        <div className="pop-card">
        <TextField type="text" value={value} onChange={handleChange} />
            <hr/>
            <PrimaryButton type="button" onClick={() => props.clickHandle(value)} > OK </PrimaryButton>
            <DefaultButton type="button" onClick={() => props.cancelHandle()} > Cancel </DefaultButton>
        </div>
    </div>
    );

}