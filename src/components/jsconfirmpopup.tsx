import React, {ReactElement, useEffect, useState} from 'react';
import { PrimaryButton, DefaultButton } from '@fluentui/react';
import { TextField } from '@fluentui/react';

type Props = {
    message: string,
    keyId: string,
    clickHandle: (value: string) => void,
    cancelHandle: () => void,
}

export const JSConfirmPopUp = (props: Props) => {

    useEffect(() => {
        console.log("JSConfirmPopUp did mount!");
    });

    return (
    <div className="cover" >
        <div className="pop-card">
            <pre>{props.message}</pre>
            <hr/>
            <PrimaryButton type="button" onClick={() => props.clickHandle(props.keyId)} > OK </PrimaryButton>
            <DefaultButton type="button" onClick={() => props.cancelHandle()} > Cancel </DefaultButton>
        </div>
    </div>
    );

}