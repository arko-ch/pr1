import React, { Fragment } from 'react';
import Table from '../app/components/table/Table';
import ComboBox from '../app/components/form/ComboBox';

import '../assets/_App.css';
import '../Test.scss';

const MyButton = props => {
  return <button className="btn btn-primary">{props.children}</button>;
};
export default { title: 'Table Stories' };

export const table = () => {
  const fields = [
    {
      name: 'no',
      label: '#',
      className: 'bordered-cell'
    },
    {
      name: 'name',
      label: 'Name'
    },
    {
      name: 'name',
      label: 'Button',
      component: MyButton
    },
    'email'
  ];
  const data = [
    {
      no: 1,
      name: 'Jane Doe',
      email: 'jane.doe@email.com'
    },
    {
      no: 2,
      name: 'John Dae',
      email: 'john.dae@email.com'
    }
  ];
  return (
    <Fragment>
      <Table fields={fields} data={data} />
      <hr />
      <Table className="table-dark" fields={fields} data={data} />
    </Fragment>
  );
};

const MyField = props => {
  const state = props.fs.state;
  const setState = props.fs.setState;
  const v = state.data[props.data.$idx][props.field.name];
  return (
    <input
      type="text"
      className="form-control"
      value={v}
      onChange={evt => {
        evt.preventDefault();
        let _d = [...state.data];
        _d[props.data.$idx][props.field.name] = evt.target.value;
        let _s = { ...state, data: _d };
        setState(_s);
      }}
    ></input>
  );
};

const TableForm = props => {
  const [state, setState] = React.useState({
    data: [
      {
        no: 1,
        name: 'Jane Doe',
        email: 'jane.doe@email.com'
      },
      {
        no: 2,
        name: 'John Dae',
        email: 'john.dae@email.com'
      }
    ]
  });

  // too messy
  const fields = [
    {
      name: 'no',
      label: '#',
      className: 'bordered-cell'
    },
    {
      name: 'name',
      label: 'Name',
      component: ComboBox,
      options: [
        {
          label: 'Jane Doe',
          value: 'jane.doe@email.com'
        },
        {
          label: 'John Doe',
          value: 'john.doe@email.com'
        },
        {
          label: 'Jake Doe',
          value: 'jake.doe@email.com'
        }
      ]
    },
    {
      name: 'name',
      label: 'Button',
      component: MyField
    },
    'email'
  ];

  return (
    <div className="p-4">
      <Table
        fields={fields}
        data={state.data}
        fs={{ state: state, setState: setState }}
      />
      <pre>{JSON.stringify(state, null, 4)}</pre>
    </div>
  );
};
export const withState = () => {
  return (
    <div className="p-4">
      <TableForm></TableForm>
    </div>
  );
};

export const withSearch = () => {
  const fields = [
    {
      name: 'no',
      label: '#',
      className: 'bordered-cell'
    },
    {
      name: 'name',
      label: 'Name'
    },
    {
      name: 'name',
      label: 'Button',
      component: MyButton
    },
    'email'
  ];
  const data = [
    {
      no: 1,
      name: 'Jane Doe',
      email: 'jane.doe@email.com'
    },
    {
      no: 2,
      name: 'John Dae',
      email: 'john.dae@email.com'
    }
  ];
  return (
    <div className="p-4">
      <Table fields={fields} data={data} filter={true}></Table>
    </div>
  );
};
