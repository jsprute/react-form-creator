import React, {ReactElement} from 'react';
import { JSFormEditor } from '../components/jsformeditor';
import { JSFormSelector} from '../components/jsformselector';
import { Storage } from '../services/storage.interface';
import { JSTextInputPopUp } from '../components/jstextinputpopup';
import { JSConfirmPopUp } from '../components/jsconfirmpopup';
import { FormItem } from '../models/formitem';
import { DefaultButton } from '@fluentui/react';

  type Props = {
    storage: Storage,
  }

  type State = {
    popUp: Boolean,
    message: string,
    showNewFormRequestValue: Boolean,
    showLoadFormRequestValue: Boolean,
    showDeleteFormRequestValue: Boolean,
    deleteValue: string,
  }

  
export class FormList extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      popUp: false,
      message: "",
      showNewFormRequestValue: false,
      showLoadFormRequestValue: false,
      showDeleteFormRequestValue: false,
      deleteValue: ""
    }
  }

  handleShow = (vals: any) => {
    let result: string = JSON.stringify(vals, null, 4);
    this.setState({popUp: true, message: result });
  }

  handleGetForm(val: string) :void {
    alert(val);
    this.setState({showLoadFormRequestValue:false});
    //this.props.storage.GetForm(val);
  }

  messageClicked = () => {
    this.setState({popUp: false});
  }

  // handle new name submit
  handleNewFormRequestSubmit(value: string):void {
      let _value = value.trim();
      if("" !== _value){
        this.props.storage.ListRecords().then(list => {
          if(list.filter(item => item === _value).length == 0){
            list.push(_value);
            this.props.storage.WriteRecords(list);
            this.props.storage.SaveForm(_value, [] as FormItem[]);
          }
          else {
            alert("This form name already exists");
          }
        })
        .catch(error => alert(error));
      }
      this.setState({showNewFormRequestValue:false});
  }

  // handle confirm
  handleDeleteConfirmSubmit(value: string):void {
    let _value = value.trim();
      if("" !== _value){
        this.props.storage.ListRecords().then(list => {
          if(list.filter(item => item === _value).length > 0){
            this.props.storage.WriteRecords(list.filter(item => item === _value));
            this.props.storage.DeleteForm(_value);
          }
          else {
            alert("This form name does not exist");
          }
        })
        .catch(error => alert(error));
      }
      this.setState({showDeleteFormRequestValue:false});
  }
  
  render() {

    
    let popElement: ReactElement | null = null;

    if(this.state.showNewFormRequestValue){
      popElement = (<JSTextInputPopUp message="New name for form" 
      clickHandle={this.handleNewFormRequestSubmit.bind(this)} 
      cancelHandle={() => this.setState({showNewFormRequestValue:false})} />);
    }

    if(this.state.showDeleteFormRequestValue){
      popElement = (<JSConfirmPopUp message={"Confirm delete " + this.state.deleteValue} keyId={this.state.deleteValue} 
      clickHandle={this.handleDeleteConfirmSubmit.bind(this)} 
      cancelHandle={() => this.setState({showDeleteFormRequestValue:false})} />);
    }

    if(this.state.showLoadFormRequestValue){
      popElement = (<JSFormSelector message={"Load form for edit."} storage={this.props.storage}  
      clickSelect={this.handleGetForm.bind(this)} 
      clickCancel={() => this.setState({showLoadFormRequestValue:false})} />);
    }

    return (
        <div>
            <h1>Form Editor</h1>
            <div>
              <div className="float">
                <DefaultButton  type="button" onClick={() => this.setState({showNewFormRequestValue:true})} > 
                New </DefaultButton></div>
              <div className="float">
                <DefaultButton  type="button" onClick={() => this.setState({showLoadFormRequestValue: true})} > 
                Load </DefaultButton></div>
              <div>
                <DefaultButton  type="button" 
                  onClick={() => this.setState({showDeleteFormRequestValue:true, deleteValue: this.state.deleteValue})} > 
                  Delete </DefaultButton>
               </div>
            </div>
            <JSFormEditor items={[]} handleSave={(values)=>{}} />
            {popElement}
        </div>
    );
  }
}
