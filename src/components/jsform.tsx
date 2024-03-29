import React, {useEffect, useState} from 'react';
import * as Controls from './controls';
import { FormItem } from '../models';
import { PrimaryButton } from '@fluentui/react';

type Props = {
    label: string,
    items: FormItem[],
    handleSubmit: (values: any) => void
}

export const JSForm = (props: Props) => {

    let _formItems = buildTree({}, props.items);
    
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

    /**
     * Handles any change event
     * @param index - index of the control (childrent will have multiple indexes)
     * @param event - change event
     */
    // will need to state the values 
    function handleChange(index: string, event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: any):void {
        console.log(`Handle change for index: ${index}`)
        let indexes: string[] = index.split('-');
        let temp:any = updateBranch(_formItems, props.items, indexes, event.target);
    }

    function updateBranch(vals: any, items: FormItem[], indexes: string[], value: any) {
        const [index, ...otherindexes] = indexes;
        if(otherindexes.length > 0){
            vals[items[parseInt(index)].label] = updateBranch(vals[items[parseInt(index)].label], items[parseInt(index)].items, otherindexes, value);
        }
        else {
            if(items[parseInt(index)].type === 'checkbox')
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
        case "single-text": formItems.push(<div><Controls.JSTextBox handleChange={handleChange} index={(indx).toString()} key={(indx).toString()} item={item} ></Controls.JSTextBox><hr/></div>); break;
        case "checkbox": formItems.push(<div><Controls.JSCheckBox handleChange={handleChange} index={(indx).toString()} key={(indx).toString()} item={item} ></Controls.JSCheckBox><hr/></div>); break;
        case "group": formItems.push(<div><Controls.JSGroup handleChange={handleChange} index={(indx).toString()} key={(indx).toString()} item={item} ></Controls.JSGroup><hr/></div>); break;
      }  
      indx += 1;
    }

    return (
    <div>
        {formItems}
        <PrimaryButton type="button" onClick={() => props.handleSubmit(_formItems)} > Submit </PrimaryButton>
   </div>
    );

}