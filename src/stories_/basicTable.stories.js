import React, { Fragment } from 'react';
import StateHelper from '../app/services/stateHelper';
import ComboBox from '../app/components/form/ComboBox';
import {
  Table,
  Row,
  Cell,
  Header,
  Footer
} from '../app/components/simpleTable/Table';

import '../assets/_App.css';
import '../Test.scss';

export default { title: 'Basic Table Stories' };

const Search = props => {
  /* Pass function that sets the search string eg: setState / setFilterData(useState) */
  return (
    <div className="d-flex">
      <div className="col-1"></div>
      <div className="col-10">
        <div className="input-group">
          <input
            className="form-control border-0 bg-light"
            type="search"
            placeholder="Search..."
            onChange={e => {
              props.onChange(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="col-1"></div>
    </div>
  );
};

function TableWithState(props) {
  let _setState = () => {};
  let _getState = () => {};

  const fields = [
    {
      name: 'name',
      label: 'Name',
      header: props => {
        return <th>{props.field.label}</th>;
      },
      cell: props => {
        return <td>{props.data.name}</td>;
      }
    },
    {
      name: 'email',
      label: 'Email'
    },
    {
      name: 'address',
      cell: props => {
        return (
          <td>
            <input
              className="form-control"
              type="text"
              value={props.data.address}
              onChange={evt => {
                let _s = _getState();
                let _d = _s.data;
                _d[props.data.$idx].address = evt.target.value;
                _setState({
                  ..._s,
                  data: _d
                });
              }}
            />
            <pre>{JSON.stringify(props.data, null, 4)}</pre>
          </td>
        );
      },
      footer: props => <th>Footer Cell</th>
    }
  ];

  const data = [
    {
      name: 'Jane Doe',
      email: 'jane.doe@email.com'
    },
    {
      name: 'John Dae',
      email: 'john.dae@email.com',
      address: 'xxx'
    }
  ];

  const [state, setState] = React.useState({
    data: data.map((d, idx) => ({ ...d, $idx: idx })) // important add original data index
  });

  _setState = setState;
  _getState = () => ({ ...state });

  return (
    <div className="p-4">
      <form>
        <Table fields={fields} data={state.data} />
      </form>
      <pre>{JSON.stringify(state, null, 4)}</pre>/
    </div>
  );
}

export const table = () => {
  return <TableWithState />;
};

const fs = new StateHelper();

const fields = [
  {
    name: 'name',
    label: 'Name',
    header: props => {
      return <th>{props.field.label}</th>;
    },
    cell: props => {
      return <td>{props.data.name}</td>;
    }
  },
  {
    name: 'email',
    label: 'Email'
  },
  {
    name: 'address',
    cell: props => {
      return (
        <td>
          <input
            className="form-control"
            type="text"
            {...fs.model(`data.${props.data.$idx}.address`)}
          />
          <pre>{JSON.stringify(props.data, null, 4)}</pre>
        </td>
      );
    }
  },
  {
    name: 'combo',
    cell: props => {
      return (
        <td>
          <ComboBox
            options={[
              { label: 'abc 123', value: 123 },
              { label: 'def', value: 456 }
            ]}
            // {...fs.model(`data.${props.data.$idx}.combo`)}
            onChange={evt => {
              fs.setState({
                [`data.${props.data.$idx}.combo`]: evt.target.value
              });
            }}
          />
        </td>
      );
    }
  }
];

function TableWithStateHelper(props) {
  const data = [
    {
      name: 'Jane Doe',
      email: 'jane.doe@email.com'
    },
    {
      name: 'John Dae',
      email: 'john.dae@email.com',
      address: 'xxx'
    }
  ];

  const [state, setState] = React.useState({
    fields,
    data: data.map((d, idx) => ({
      ...d,
      $idx: idx,
      $checked: d.$checked || false
    })) // important add original data index
  });

  fs.useState(state, setState);

  return (
    <div className="p-4">
      <form>
        <Table fields={state.fields} data={state.data} />
      </form>
      <pre>{JSON.stringify(state, null, 4)}</pre>
    </div>
  );
}

export const tableWithStateHelper = () => {
  return <TableWithStateHelper />;
};

export const TableWithSearch = () => {
  let _setState = () => {};
  let _getState = () => {};

  const fields = [
    {
      name: 'name',
      label: 'Name',
      header: props => {
        return <th>{props.field.label}</th>;
      },
      cell: props => {
        return <td>{props.data.name}</td>;
      }
    },
    {
      name: 'email',
      label: 'Email'
    },
    {
      name: 'address',
      cell: props => {
        return (
          <td>
            <input
              className="form-control"
              type="text"
              value={props.data.address}
              onChange={evt => {
                let _s = _getState();
                let _d = _s.data;
                _d[props.data.$idx].address = evt.target.value;
                _setState({
                  ..._s,
                  data: _d
                });
              }}
            />
          </td>
        );
      }
    }
  ];

  const data = [
    {
      name: 'Jane Doe',
      email: 'jane.doe@email.com'
    },
    {
      name: 'John Dae',
      email: 'john.dae@email.com',
      address: 'xxx'
    }
  ];

  const [filterStr, setfilterStr] = React.useState('');

  const [state, setState] = React.useState({
    fields,
    data: data.map((d, idx) => ({ ...d, $idx: idx })) // important add original data index
  });

  let renderFilteredRows = [];
  if (filterStr) {
    state.data.map((r, idx) => {
      if (r.name.includes(filterStr)) {
        return renderFilteredRows.push(r);
      }
    });
  }

  _setState = setState;
  _getState = () => ({ ...state });

  return (
    <div className="p-4">
      <Search onChange={setfilterStr} />
      <Table
        fields={state.fields}
        data={renderFilteredRows.length > 0 ? renderFilteredRows : state.data}
      />
      <pre>{JSON.stringify(state, null, 4)}</pre>
    </div>
  );
};

export const TableWithCheckbox = () => {
  let _setState = () => {};
  let _getState = () => {};

  const fields = [
    {
      name: '$checked',
      label: '',
      header: props => (
        <th>
          <input
            className="form-control_"
            checked={props.state.allChecked || false}
            type="checkbox"
            onChange={evt => {
              let _s = _getState();
              let checked = !props.state.allChecked;
              let newData = _s.data.map(r => {
                return {
                  ...r,
                  $checked: checked
                };
              });

              _setState({
                ..._s,
                state: {
                  ..._s.state,
                  allChecked: checked
                },
                data: newData
              });
            }}
          />
        </th>
      ),
      cell: props => (
        <th>
          <input
            className="form-control_"
            type="checkbox"
            checked={props.data.$checked || false}
            onChange={evt => {
              let _s = _getState();
              let _d = _s.data;
              _d[props.data.$idx].$checked = !props.data.$checked;
              _setState({
                ..._s,
                state: {
                  ..._s.state,
                  allChecked: false
                },
                data: [..._d]
              });
            }}
          />
        </th>
      )
    },
    {
      name: 'name',
      label: 'Name',
      cell: props => (
        <th>
          <input
            className="form-control"
            value={props.data.name || ''}
            onChange={evt => {
              let _s = _getState();
              let _d = _s.data;
              _d[props.data.$idx].name = evt.target.value;
              _setState({
                ..._s,
                data: [..._d]
              });
            }}
          />
        </th>
      )
    },
    {
      name: 'email',
      label: 'Email'
    },
    {
      name: 'address',
      label: 'Address'
    }
  ];

  const data = [
    {
      name: 'Jane Doe',
      email: 'jane.doe@email.com'
    },
    {
      name: 'John Dae',
      email: 'john.dae@email.com',
      address: 'xxx'
    }
  ];

  const [state, setState] = React.useState({
    state: { allChecked: false },
    fields,
    data: data.map((d, idx) => ({
      ...d,
      $idx: idx,
      $checked: d.$checked || false
    })) // important add original data index
  });

  _setState = setState;
  _getState = () => ({ ...state });

  return (
    <div className="p-4">
      <Table
        state={state.state} // table state
        fields={state.fields}
        data={state.data}
      />
      <pre>Table State : {JSON.stringify(state.state, null, 4)}</pre>
      <pre>Checked Rows : {JSON.stringify(state.data, null, 4)}</pre>
    </div>
  );
};
