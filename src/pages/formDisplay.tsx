import React, {ChangeEvent, useEffect, useState} from 'react';
import {JSForm} from '../components/jsform';
import {FormItem} from '../models/formitem';

type Props = {}

export const FormDisplay = (props: Props) => {

const form: FormItem[] = [
    new FormItem("single-text","First Name","",[]),
    new FormItem("single-text","Middle Name","",[]),
    new FormItem("single-text","Third Name","",[]),
    new FormItem("checkbox","Enabled",true,[]),
    new FormItem("group","My Group","",[
      new FormItem("single-text","City","",[]),
      new FormItem("single-text","State","",[])
    ])
  ];

    return (
        <div>
            <JSForm label="My Form" items={form} />
        </div>
    );
}