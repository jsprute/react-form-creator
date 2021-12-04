import React, {ReactElement} from 'react';
import { JSFormEditor } from '../components/jsformeditor';
import { JSFormSelector} from '../components/jsformselector';
import { Storage } from '../services/storage.interface';
import { JSTextInputPopUp } from '../components/jstextinputpopup';
import { JSConfirmPopUp } from '../components/jsconfirmpopup';
import { FormItem } from '../models/formitem';
import { DefaultButton, PrimaryButton } from '@fluentui/react';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';


  type Props = {
    storage: Storage,
  }

  type State = {
    popUp: Boolean,
    message: string,
    showNewFormRequestValue: Boolean,
    showLoadFormRequestValue: Boolean,
    showDeleteFormRequestValue: Boolean,
    formName: string,
    items: FormItem[]
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
      formName: "",
      items: []
    }
  }

  handleGetForm(val: string) :void {
    this.props.storage.GetForm(val).then(items => 
    this.setState({
      showLoadFormRequestValue:false,
      formName: val,
      items: items 
    }));
  }

  handleSaveForm(val: string) :void {
    if(this.state.formName.length === 0){
      this.setState({showNewFormRequestValue:true})
    }
    else {
      this.handleNewFormRequestSubmit(val, false);
    }
  }

  messageClicked = () => {
    this.setState({popUp: false});
  }

  // handle new name submit
  handleNewFormRequestSubmit(value: string, existCheck: boolean = true):void {
      let _value = value.trim();
      if("" !== _value){
        this.props.storage.ListRecords().then(list => {
          if(list.filter(item => item === _value).length === 0){
            list.push(_value);
            this.props.storage.WriteRecords(list);
            this.props.storage.SaveForm(_value, this.state.items);
          }
          else if(existCheck){
            alert("This form name already exists");
          }
          else {
            this.props.storage.SaveForm(_value, this.state.items);
          }
        })
        .catch(error => {
            console.error(error);
            alert("Failed to save the form.")}
          );
      }
      this.setState({showNewFormRequestValue:false});
  }

  // handle confirm
  handleDeleteConfirmSubmit(value: string):void {
    let _value = value.trim();
      if("" !== _value){
        this.props.storage.ListRecords().then(list => {
          alert(list);
          if(list.filter(item => item === _value).length > 0){
            this.props.storage.WriteRecords(list.filter(item => item !== _value));
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
      popElement = (<JSConfirmPopUp message={"Confirm delete " + this.state.formName} keyId={this.state.formName} 
      clickHandle={this.handleDeleteConfirmSubmit.bind(this)} 
      cancelHandle={() => this.setState({showDeleteFormRequestValue:false})} />);
    }

    if(this.state.showLoadFormRequestValue){
      popElement = (<JSFormSelector message={"Load form for edit."} storage={this.props.storage}  
      clickSelect={this.handleGetForm.bind(this)} 
      clickCancel={() => this.setState({showLoadFormRequestValue:false})} />);
    }


    console.log(`Item length: ${this.state.items.length}`);

    return (
        <div>
            <h1>Form Editor</h1>
            <h3>{this.state.formName}</h3>
            <div>
              <div className="float">
                <DefaultButton  type="button" onClick={() => this.setState({showNewFormRequestValue:true})} > 
                New </DefaultButton></div>
              <div className="float">
                <DefaultButton  type="button" onClick={() => this.setState({showLoadFormRequestValue: true})} > 
                Load </DefaultButton></div>
              <div>
                <DefaultButton  type="button" 
                  onClick={() => this.setState({showDeleteFormRequestValue:true})} > 
                  Delete </DefaultButton>
               </div>
               <div hidden={this.state.formName.length === 0}>
                <Link to={`/formdisplay/${this.state.formName}`}>Test</Link>
               </div>
            </div>
            <JSFormEditor items={this.state.items} updateParent={(items)=> this.setState({items})} />
            <PrimaryButton type="button" onClick={() => this.handleSaveForm(this.state.formName)} > Save </PrimaryButton>
            {popElement}
        </div>
    );
  }
}
