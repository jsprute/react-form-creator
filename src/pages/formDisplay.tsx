import React from 'react';
import {JSForm} from '../components/jsform';
import {FormItem} from '../models/formitem';
import {JSPopup} from '../components/jspopup';
import {Storage} from '../services/storage.interface';

type Props = {
  storage: Storage,
}

type State = {
  popUp: Boolean,
  message: string,
  storage: Storage
}

export class FormDisplay extends React.Component<Props, State> {

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

    const form: FormItem[] = this.state.storage.GetForm("NameDoesNotMatterRightNow");

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
