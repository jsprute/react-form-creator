import React, {ReactElement, useEffect, useState} from 'react';
import * as Controls from './controls';
import { FormItem } from '../models';
import { PrimaryButton } from '@fluentui/react';

type Props = {
    message: string,
    clickHandle: () => void
}

export const JSPopup = (props: Props) => {

    useEffect(() => {
        console.log("Form did mount!");
    });

    const [visible, updateVisible] = useState(false);
    let _message: string = props.message;
    const messageLines: ReactElement[] = [];

    if(_message){
        _message.split("\n").forEach((line, i) => {
            messageLines.push(
            <pre key={i}>
                {line}
                <br />
            </pre>
            );
        });
    }
    
    return (
    <div className="cover" >
        <div className="pop-card">
            {messageLines}
            <hr/>
            <PrimaryButton type="button" onClick={() => props.clickHandle()} > OK </PrimaryButton>
        </div>
    </div>
    );

}