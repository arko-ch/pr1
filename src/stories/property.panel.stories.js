import React from 'react';
import {
  Table,
  Column,
  HeaderColumn,
  Header,
  Body,
  Footer
} from '../app/components/table/Table';
import {
  InputText,
  InputDate,
  InputCheckbox
} from '../app/components/table/inputTypes';

import StateHelper from '../app/services/stateHelper';

import '../assets/_App.css';
import '../Test.scss';

export default { title: 'Panel Stories' };

const fs = new StateHelper();

const PropertyPanel = props => {
  const [state, setState] = React.useState({
    edit: true,
    data: [
      {
        paymentDate: new Date('11/11/2019'),
        when: true,
        description: 'some description'
      }
    ]
  });

  const columns = [
    {
      name: 'paymentDate',
      label: 'Date'
    },
    {
      name: 'description',
      label: 'Description'
    },
    {
      name: 'when',
      label: 'when'
    },
    {
      name: 'payor',
      label: 'Payor'
    },
    {
      name: 'payee',
      label: 'Payee'
    },
    {
      name: 'escrowAgent',
      label: 'escrowAgent'
    },
    {
      name: 'escrow',
      label: 'escrow'
    },
    {
      name: 'paymentType',
      label: 'paymentType'
    },
    {
      name: 'paymentMode',
      label: 'paymentMode'
    },
    {
      name: 'status',
      label: 'status'
    },
    {
      name: '$actions',
      label: 'Actions'
    }
  ];

  fs.useState(state, setState);

  const addItem = () => {
    fs.setState({
      data: { $push: {} }
    });
  };

  const toggleEditMode = () => {
    fs.setState({
      edit: !state.edit
    });
  };

  const onDelete = (evt, props) => {
    // console.log (props);
    fs.setState({
      [`data.${props.row}`]: { $splice: 1 }
    });
  };

  const data = state.data;

  return (
    <div className="p-4">
      <button className="btn btn-primary mb-4" onClick={toggleEditMode}>
        {state.edit ? 'Edit Mode' : 'View Only'}
      </button>
      <Table className="table" columns={columns} data={data} context={fs}>
        <Header />
        {state.edit && (
          <Body model="data">
            <InputText field="description" />
            <InputDate field="paymentDate" />
            <InputCheckbox field="when" />
            <Column field="$actions">
              {props => (
                <button
                  className="btn btn-link"
                  onClick={evt => {
                    onDelete(evt, props);
                  }}
                >
                  Delete
                </button>
              )}
            </Column>
          </Body>
        )}
        {!state.edit && <Body />}
      </Table>
      {state.edit && (
        <button className="btn btn-primary ml-1 mb-4" onClick={addItem}>
          Add
        </button>
      )}
      <pre>{JSON.stringify(state, null, 4)}</pre>
    </div>
  );
};

export const panel = () => {
  return <PropertyPanel />;
};
