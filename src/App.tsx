import React from 'react';
import './App.css';
import {JSForm} from './components/jsform';
import {FormItem} from './models/formitem';

function App() {

  const form: FormItem[] = [
    new FormItem("single-text","First Name","",[]),
    new FormItem("single-text","Middle Name","",[]),
    new FormItem("single-text","Third Name","",[])
  ];

  return (
    <div className="App">
      <JSForm label="My Form" items={form} />
    </div>
  );
}

export default App;
