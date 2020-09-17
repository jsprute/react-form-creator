import React, {ChangeEvent, useEffect, useState} from 'react';
import * as Controls from './controls';
import { FormItem } from '../models';
import { Console } from 'console';

type Props = {
    label: string,
    items: FormItem[]
}

export const JSForm = (props: Props) => {

    const [vals, updateVals] = useState(buildTree({}, props.items));
    
    useEffect(() => {
        console.log("Form did mount!");
    });

    function buildTree(vals: any, items: FormItem[]): any {
        items.forEach(item => {
            if(item.items.length > 0){
                vals[item.label] = buildTree({},item.items);
            }
            else {
                vals[item.label] = item.value;
            }
        });
        return vals;
    }

    function handleShow(){
        alert(JSON.stringify(vals));
    }
    
    /**
     * Handles any change event
     * @param index - index of the control (childrent will have multiple indexes)
     * @param event - change event
     */
    // will need to state the values 
    function handleChange(index: string, event: ChangeEvent<HTMLInputElement>) {
        let indexes: string[] = index.split('-');

        let temp:any = updateBranch(vals, props.items, indexes, event.target);
        updateVals(temp);
    }

    function updateBranch(vals: any, items: FormItem[], indexes: string[], value: any) {
        const [index, ...otherindexes] = indexes;
        if(otherindexes.length > 0){
            vals[items[parseInt(index)].label] = updateBranch(vals[items[parseInt(index)].label], items[parseInt(index)].items, otherindexes, value);
        }
        else {
            if(items[parseInt(index)].type == "checkbox")
                vals[items[parseInt(index)].label] = value.checked;
            else
                vals[items[parseInt(index)].label] = value.value;
        }
        return vals;
    }


    /**
     * Build form
     */
    const formItems = [];
    let indx: number  = 0;
    for (let item of props.items) {
      switch(item.type) {
        case "single-text": formItems.push(<Controls.JSTextBox handleChange={handleChange} index={(indx).toString()} key={(indx).toString()} item={item} ></Controls.JSTextBox>); break;
        case "checkbox": formItems.push(<Controls.JSCheckBox handleChange={handleChange} index={(indx).toString()} key={(indx).toString()} item={item} ></Controls.JSCheckBox>); break;
        case "group": formItems.push(<Controls.JSGroup handleChange={handleChange} index={(indx).toString()} key={(indx).toString()} item={item} ></Controls.JSGroup>); break;
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