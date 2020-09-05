import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {JSTextBox} from './components/controls/jstextbox';

function App() {

  const [value, updateValue] = useState("");

  function handleShow(){
    alert(value);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    updateValue(event.target.value);
  }

  return (
    <div className="App">
      <button type="button" onClick={() => handleShow()} > Show </button>
        <JSTextBox label="Test" handleChange={handleChange} value={value} ></JSTextBox>
    </div>
  );
}

export default App;
