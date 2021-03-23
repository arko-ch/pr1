import React, { Fragment } from 'react';
import {
  Table,
  Column,
  HeaderColumn,
  Header,
  Body,
  Footer
} from '../app/components/table/Table';

import defaultTemplateForTypes, {
  InputCheckbox,
  InputText
} from '../app/components/table/inputTypes';

import '../assets/_App.css';
import '../Test.scss';

import StateHelper from '../app/services/stateHelper';

const columns = [
  {
    name: '$checked',
    label: 'xx'
  },
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
    name: 'description',
    label: 'Description'
  },
  'email',
  '$end'
];

let template = [
  {
    $checked: true,
    no: 0,
    name: 'Jane Doe',
    email: 'jane.doe@email.com',
    description: 'description for jane'
  },
  {
    no: 1,
    name: 'John Dae',
    email: 'john.dae@email.com',
    description: 'description for mr. doe'
  }
];

export default { title: 'Table Stories' };

const fs = new StateHelper();

function TableTest(props) {
  let data = [];
  let iidx = 0;
  for (let i = 0; i < 2; i++) {
    data.push({ ...template[0], no: iidx++ });
    data.push({ ...template[1], no: iidx++ });
  }

  const onRowClick = (evt, props) => {
    evt.stopPropagation();
    console.log('row click');
    console.log(props);
  };

  const onColumnClick = (evt, props) => {
    evt.stopPropagation();
    console.log('column click');
    console.log(props);
  };

  const [state, setState] = React.useState({ data: data });

  fs.useState(state, setState);

  React.useEffect(() => {
    if (state.$allChecked === undefined) {
      return;
    }
    let changes = {};
    fs.state().data.forEach((d, idx) => {
      changes[`data.${idx}.$checked`] = state.$allChecked;
    });
    fs.setState(changes);
  }, [state.$allChecked]);

  let n = [
    <Column field="name" onClick={onColumnClick} key={0}>
      {props => {
        return (
          <input
            className="form-control"
            value={props.value || ''}
            onChange={evt => {
              const fs = props.context;
              fs.setState({
                [`data.${props.row}.name`]: evt.target.value
              });
            }}
          />
        );
      }}
    </Column>
  ];

  return (
    <Fragment>
      <Table
        options={{
          memo: true
        }}
        className="table table-bordered table-hover table-striped"
        columns={columns}
        data={state.data}
        context={fs}
      >
        <Header className="thead-dark">
          <HeaderColumn field="$checked">
            {p => {
              return (
                <input
                  type="checkbox"
                  {...fs.model('$allChecked', { value: 'checked' })}
                />
              );
            }}
          </HeaderColumn>
          <HeaderColumn field="description" onClick={onColumnClick} />
        </Header>
        <Body onClick={onRowClick}>
          <InputCheckbox field="$checked" model="data" />
          {n}
          <Column field="description" onClick={onColumnClick}>
            {props => {
              return (
                <input
                  className="form-control"
                  value={props.value || ''}
                  onChange={evt => {
                    const fs = props.context;
                    fs.setState({
                      [`data.${props.row}.description`]: evt.target.value
                    });
                  }}
                />
              );
            }}
          </Column>
        </Body>
      </Table>
      <pre>{JSON.stringify(columns, null, 4)}</pre>
      <pre>{JSON.stringify(state, null, 4)}</pre>
    </Fragment>
  );
}

export const table = () => {
  return <TableTest />;
};
