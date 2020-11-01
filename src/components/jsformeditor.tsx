import React, {useEffect, useState} from 'react';
import { TextField } from '@fluentui/react';
import { FormItem } from '../models';
import { PrimaryButton } from '@fluentui/react';

type Props = {
    items: FormItem[],
    handleSave: (values: any) => void
}

export const JSFormEditor = (props: Props) => {

    const [vals, updateValue] = useState("");
    
    useEffect(() => {
        console.log("Form did mount!");
    });

    function handleChange(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string):void {
        if(newValue != null){
            updateValue(newValue);
        }
    }


    return (
    <div>
        <TextField multiline rows={20} onChange={handleChange} />
        <PrimaryButton type="button" onClick={() => props.handleSave(vals)} > Show </PrimaryButton>
    </div>
    );

}