import React, {ChangeEvent, useEffect} from 'react';
import { JSTextBox } from './controls';
import { FormItem } from '../models/formitem';

type Props = {
    label: string,
    items: FormItem[]
}

export const JSForm = (props: Props) => {

    useEffect(() => {
    });

    function handleShow(){
        alert(props.items[0].value);
    }
    
    
    const formItems = [];

    for (let item of props.items) {
      formItems.push(<JSTextBox key={item.id} item={item} ></JSTextBox>);
    }

    return (
    <div>
        {formItems}
        <button type="button" onClick={() => handleShow()} > Show </button>
    </div>
    );

}