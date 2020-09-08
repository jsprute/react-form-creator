import React from 'react';
import './App.css';
import {JSForm} from './components/jsform';
import {FormItem} from './models/formitem';

// need to track on index of controls
// create a different object dedicated for values (outside of template)
// parent form should track template


function App() {

  const form: FormItem[] = [
    new FormItem("1","single-text","First Name","",[]),
    new FormItem("2","single-text","Second Name","",[])
  ];

  return (
    <div className="App">
      <JSForm label="My Form" items={form} />
    </div>
  );
}

export default App;
