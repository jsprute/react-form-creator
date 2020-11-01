import React  from 'react';
import { FormItem } from '../../models'
import * as Controls from '.';

type Props = {
    item: FormItem,
    index: string,
    handleChange: (index: string, event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void
}

export const JSGroup = (props: Props) => {

    /**
     * Build form
     */
    const formItems = [];
    let indx: number  = 0;
    for (let item of props.item.items) {
      switch(item.type) {
        case "single-text": formItems.push(<div><Controls.JSTextBox handleChange={props.handleChange} index={props.index + '-' + (indx).toString()} key={(indx).toString()} item={item} ></Controls.JSTextBox><h1/></div>); break;
        case "checkbox": formItems.push(<div><Controls.JSCheckBox handleChange={props.handleChange} index={props.index + '-' + (indx).toString()} key={(indx).toString()} item={item} ></Controls.JSCheckBox><h1/></div>); break;
        case "group": formItems.push(<div><Controls.JSGroup handleChange={props.handleChange} index={props.index + '-' + (indx).toString()} key={(indx).toString()} item={item} ></Controls.JSGroup><h1/></div>); break;
      }  
      indx += 1;
    }

    return (
    <div className="form-group">
        <div><h3>{props.item.label}</h3></div>
       {formItems}
    </div>
    );

}