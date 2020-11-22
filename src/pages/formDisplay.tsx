import React from 'react';
import {JSForm} from '../components/jsform';
import {FormItem} from '../models/formitem';
import {JSPopup} from '../components/jspopup';
import {Storage} from '../services/storage.interface';


type Props = {
  storage: Storage,
  match: any
}

type State = {
  popUp: Boolean,
  message: string,
  form: FormItem[]
}

export class FormDisplay extends React.Component<Props, State> {

  
  constructor(props: Props) {
    super(props);
    
    this.state = {
      popUp: false,
      message: "",
      form: []
    }

  }

  componentDidMount() {
    if(this.props.match?.params?.form){
        let name = this.props.match.params.form;
        this.props.storage.GetForm(name).then((items) => {
          this.setState({form: items});
      });
    }
  }

  handleShow = (vals: any) => {
    let result: string = JSON.stringify(vals, null, 4);
    this.setState({popUp: true, message: result });
  }

  messageClicked = () => {
    this.setState({popUp: false});
  }

  render() {
    
    if(this.state.popUp) {
      return (
        <div>
          <JSPopup message={this.state.message} clickHandle={this.messageClicked}/>
        </div>
      );
    }
    else {
    return (
        <div>
          <JSForm label="My Form" items={this.state.form}  handleSubmit={this.handleShow}/>
        </div>
      );
    }

  }
}
