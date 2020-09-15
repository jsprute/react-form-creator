import React, {ChangeEvent, useEffect} from 'react';
import { JSTextBox, JSCheckBox } from './controls';
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
        let values: string = "";
        props.items.forEach(item => {
            values += `${item.label} : ${item.value}\n`;
        })
        
        alert(values);
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
      switch(item.type) {
        case "single-text": formItems.push(<JSTextBox handleChange={handleChange} index={(indx).toString()} key={(indx).toString()} item={item} ></JSTextBox>); break;
        case "checkbox": formItems.push(<JSCheckBox handleChange={handleChange} index={(indx).toString()} key={(indx).toString()} item={item} ></JSCheckBox>); break;
      }  
      indx += 1;
    }

    return (
    <div>
        {formItems}
        <button type="button" onClick={() => handleShow()} > Show </button>
    </div>
    );

}