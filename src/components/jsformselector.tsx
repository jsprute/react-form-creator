import React, {ReactElement, useEffect, useState} from 'react';
import { Dropdown, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { PrimaryButton, DefaultButton } from '@fluentui/react';
import { JSTextInputPopUp } from '../components/jstextinputpopup';
import { JSConfirmPopUp } from '../components/jsconfirmpopup';
import { Storage } from '../services/storage.interface';

type Props = {
    storage: Storage,
    handlePushForm: (formId: string) => void
}

export const JSFormSelector = (props: Props) => {

    const dropdownStyles: Partial<IDropdownStyles> = {
        dropdown: { width: 300 }
    };

    useEffect(() => {
        props.storage.ListRecords().then(value => {
            updateFormList(value);
        })
        .catch(error => {
            alert(error);
        });
    });
    
    const [value, updateValue] = useState("");
    const [showRequestInputValue, updateShowRequestInputValue] = useState(false);
    const [showConfirmValue, updateShowConfirmValue] = useState(false);
    const [formList, updateFormList] = useState([] as string[]);
    let popElement: ReactElement | null = null;

    const options: IDropdownOption[] = formList.map(value => ({ key: value, text: value }));
    
    function handleChange(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number):void {
        if(option != null && option != undefined){
            updateValue(option.key.toString());
        }
    }

    /////////////////////////////////
    // Text input functionality
    /////////////////////////////////

    // if new button is pushed, raise flag to open text input pop up
    function newRequestEvent(event: React.MouseEvent<HTMLButtonElement>){
        updateShowRequestInputValue(true);
    } 

    // handle new name submit
    function handleNewFormRequestSubmit(value: string):void {
        if("" !== value.trim()){
            formList.push(value.trim());
            updateFormList(formList);
            props.storage.WriteRecords(formList)
            .then(()=> {})
            .catch((error) => alert(error));
        }
        updateShowRequestInputValue(false);
    }

    // handle new name cancel
    function handleNewFormRequestCancel(): void {
        updateShowRequestInputValue(false);
    }

    // show pop up element for text input
    if(showRequestInputValue){
        popElement = (<JSTextInputPopUp clickHandle={handleNewFormRequestSubmit} cancelHandle={handleNewFormRequestCancel} />);
    }
    /////////////////////////////////
    // END Text input functionality
    /////////////////////////////////
   

    /////////////////////////////////
    // Confirm functionality
    /////////////////////////////////

    // if new button is pushed, raise flag to open text input pop up
    function newDeleteConfirmEvent(event: React.MouseEvent<HTMLButtonElement>){
        updateShowConfirmValue(true);
    } 

    // handle new name submit
    function handleDeleteConfirmSubmit(value: string):void {
        if("" !== value.trim()){
            let newList = formList.filter(item => item !== value);
            updateFormList(newList);
            props.storage.WriteRecords(newList)
            .then(()=> {})
            .catch((error) => alert(error));
        }
        updateShowConfirmValue(false);
    }

    // handle new name cancel
    function handleDeleteConfirmCancel(): void {
        updateShowConfirmValue(false);
    }

    // show pop up element for text input
    if(showConfirmValue){
        popElement = (<JSConfirmPopUp message={"Confirm delete " + value} keyId={value} clickHandle={handleDeleteConfirmSubmit} cancelHandle={handleDeleteConfirmCancel} />);
    }
    /////////////////////////////////
    // END Confirm functionality
    /////////////////////////////////

      
    return (
        <div>
            <div className="float">
                <Dropdown 
                    placeholder="Select a form"
                    options={options}
                    styles={dropdownStyles}
                    onChange={handleChange}
                />
            </div>
            <div className="float"><PrimaryButton  type="button" onClick={() => props.handlePushForm(value)} > Load </PrimaryButton></div>
            <div className="float"><DefaultButton  type="button" onClick={newRequestEvent} > New </DefaultButton></div>
            <div><DefaultButton  type="button" onClick={newDeleteConfirmEvent} > Delete </DefaultButton></div>
            {popElement}
        </div>
    );
}