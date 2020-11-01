import React, {useEffect} from 'react';
import { PrimaryButton } from '@fluentui/react';

type Props = {
    message: string,
    clickHandle: () => void
}

export const JSPopup = (props: Props) => {

    useEffect(() => {
        console.log("Form did mount!");
    });

    return (
    <div className="cover" >
        <div className="pop-card">
            <pre>{props.message}</pre>
            <hr/>
            <PrimaryButton type="button" onClick={() => props.clickHandle()} > OK </PrimaryButton>
        </div>
    </div>
    );

}