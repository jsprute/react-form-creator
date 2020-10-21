import { Popup } from '@fluentui/react';
import React from 'react';
import { JSFormEditor } from '../components/jsformeditor';
import { JSFormSelector } from '../components/jsformselector';
import { Storage } from '../services/storage.interface';

  type Props = {
    storage: Storage,
  }

  type State = {
    popUp: Boolean,
    message: string,
    storage: Storage
  }
  

export class FormList extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      popUp: false,
      message: "",
      storage: props.storage
    }
  }

  componentDidMount() {
    console.log("FormDisplay Did Mount");
  }

  componentShouldUpdate() {
    console.log("FormDisplay Should Update");
  }

  componentWillUnmount() {
    console.log("FormDisplay Will UnMount");
  }

  handleShow = (vals: any) => {
    let result: string = JSON.stringify(vals, null, 4);
    this.setState({popUp: true, message: result });
  }

  messageClicked = () => {
    this.setState({popUp: false});
  }

  render() {
      if(this.state.popUp){
        return (
            <div>
                <h1>Form Editor</h1>
                <JSFormSelector handlePushForm={val => alert(val)} storage={this.props.storage}/>
                <JSFormEditor items={[]} handleSave={(values)=>{}} />
            </div>
        );
    }
    else {
        return (
            <div>
                <h1>Form Editor</h1>
                <JSFormSelector handlePushForm={val => alert(val)} storage={this.props.storage}/>
                <JSFormEditor items={[]} handleSave={(values)=>{}}/>
            </div>
        );
    }
  }
}
