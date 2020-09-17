import React, { useEffect, useState, ChangeEvent } from 'react';
import { FormItem } from '../../models'
import * as Controls from '.';

type Props = {
    item: FormItem,
    index: string,
    handleChange: (index: string, event: ChangeEvent<HTMLInputElement>) => void
}

export const JSGroup = (props: Props) => {

    
    useEffect(() => {
    });

    /**
     * Build form
     */
    const formItems = [];
    let indx: number  = 0;
    for (let item of props.item.items) {
      switch(item.type) {
        case "single-text": formItems.push(<Controls.JSTextBox handleChange={props.handleChange} index={props.index + '-' + (indx).toString()} key={(indx).toString()} item={item} ></Controls.JSTextBox>); break;
        case "checkbox": formItems.push(<Controls.JSCheckBox handleChange={props.handleChange} index={props.index + '-' + (indx).toString()} key={(indx).toString()} item={item} ></Controls.JSCheckBox>); break;
        case "group": formItems.push(<Controls.JSGroup handleChange={props.handleChange} index={props.index + '-' + (indx).toString()} key={(indx).toString()} item={item} ></Controls.JSGroup>); break;
      }  
      indx += 1;
    }

    return (
    <div>
        <div>{props.item.label}</div>
       {formItems}
    </div>
    );

}