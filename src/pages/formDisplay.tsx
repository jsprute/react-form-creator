import React, {ChangeEvent, useEffect, useState} from 'react';
import {JSForm} from '../components/jsform';
import {FormItem} from '../models/formitem';
import {JSPopup} from '../components/jspopup';

type Props = {
  label: string,
  items: FormItem[]
}

type State = {
  popUp: Boolean,
  message: string
}

export class FormDisplay extends React.Component<Props, State> {

  
  constructor(props: Props) {
    super(props);
    this.state = {
      popUp: false,
      message: ""
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
    //alert(JSON.stringify(vals));
    let result: string = JSON.stringify(vals, null, 4);
    this.setState({popUp: true, message: result });
  }

  messageClicked = () => {
    this.setState({popUp: false});
  }

  render() {

    const form: FormItem[] = [
      new FormItem("single-text","First Name","",[]),
      new FormItem("single-text","Middle Name","",[]),
      new FormItem("single-text","Third Name","",[]),
      new FormItem("checkbox","Enabled",true,[]),
      new FormItem("group","My Group","",[
        new FormItem("single-text","City","",[]),
        new FormItem("single-text","State","",[]),
        new FormItem("group","My Sub-Group","",[
          new FormItem("single-text","Zip","",[]),
          new FormItem("single-text","Code","",[])
        ])
      ])
    ];

    if(this.state.popUp) {
      return (
        <div>
          <JSForm label="My Form" items={form}  handleSubmit={this.handleShow}/>
          <JSPopup message={this.state.message} clickHandle={this.messageClicked}/>
        </div>
      );
    }
    else {
    return (
        <div>
          <JSForm label="My Form" items={form}  handleSubmit={this.handleShow}/>
        </div>
      );
    }
  }
}
