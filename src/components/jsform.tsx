import React, {ChangeEvent, useEffect} from 'react';
import { JSTextBox } from './controls';
import { FormItem } from '../models';

type Props = {
    label: string,
    items: FormItem[]
}

export const JSForm = (props: Props) => {

    useEffect(() => {
    });

    /**
     * Just a dummy function to show a value
     */
    function handleShow(){
        alert(`String 1: ${props.items[0].value} and String 2: ${props.items[1].value}`);
    }
    
    /**
     * Handles any change event
     * @param index - index of the control (childrent will have multiple indexes)
     * @param event - change event
     */
    function handleChange(index: string, event: ChangeEvent<HTMLInputElement>) {
        console.log("Change event value ", event.target.value, " for index ", index );
        props.items[parseInt(index)].value = event.target.value;
    }


    /**
     * Build form
     */
    const formItems = [];
    let indx: number  = 0;
    for (let item of props.items) {
      formItems.push(<JSTextBox handleChange={handleChange} index={(indx).toString()} key={(indx).toString()} item={item} ></JSTextBox>);
      indx += 1;
    }

    return (
    <div>
        {formItems}
        <button type="button" onClick={() => handleShow()} > Show </button>
    </div>
    );

}