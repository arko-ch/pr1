import React, { Fragment } from 'react';

import '../assets/_App.css';
import '../Test.scss';

export default { title: 'Heavy Table Stories' };

const capitalize = s => {
  if (typeof s !== 'string') return '';
  return (
    s
      .toLowerCase()
      .charAt(0)
      .toUpperCase() + s.slice(1)
  );
};

function Row(props) {
  let fields = props.fields.map(field => {
    let fieldName = field.name || field;
    return typeof field === 'object'
      ? field
      : { name: fieldName, label: capitalize(fieldName) };
  });

  let filteredFields = fields.filter(field => !field.hidden);

  let renderMap = {};
  React.Children.toArray(props.children).forEach(child => {
    let fieldName = child.props.field;
    renderMap[fieldName] = child;
  });

  let renderedChildren = filteredFields.map((field, idx) => {
    let element = renderMap[field.name];
    if (React.isValidElement(element)) {
      return React.cloneElement(element, {
        field,
        _row: props._row,
        _col: idx,
        context: props.context
      });
    }

    if (props.defaultCell) {
      return props.defaultCell({
        _row: props._row,
        _col: idx,
        context: props.context
      });
    }

    return <th key={idx}>{/* default cell */}</th>;
  });

  return (
    <tr className="m-2 p-4" style={{ background: '#f0f0f0' }}>
      {renderedChildren}
    </tr>
  );
}

function rowPropsAreEqual(prevProps, nextProps) {
  const fieldsToCheck = ['data'];
  for (let i = 0; i < fieldsToCheck.length; i++) {
    let f = fieldsToCheck[i];
    let prevObj = prevProps[f];
    let nextObj = nextProps[f];

    if (typeof prevObj === 'object') {
      let keys = Object.keys(prevObj);
      for (let j = 0; j < keys.length; j++) {
        if (prevObj[keys[j]] != nextObj[keys[j]]) {
          return false;
        }
      }
      continue;
    }

    if (prevObj != nextObj) {
      return false;
    }
  }
  return true;
}
const RowMemo = React.memo(Row, rowPropsAreEqual);

function Header(props) {
  const defaultCell = props => (
    <th key={props._col}>Header Cell {props._col}</th>
  );
  return <Row {...props} defaultCell={defaultCell} />;
}

function Rows(props) {
  const defaultCell = props => <td key={props._col}>Row Cell {props._col}</td>;
  const rowsRendered = props.data.map((row, idx) => {
    return (
      <RowMemo
        context={props.context}
        key={`row-data-${idx}`}
        _row={idx}
        fields={props.fields}
        defaultCell={defaultCell}
        data={row}
      >
        {props.children}
      </RowMemo>
    );
  });

  return rowsRendered;
}

const TableContext = React.createContext();

function InputCell(props) {
  console.log(`${props._row}-${props._col}`);
  const store = React.useContext(props.context);
  const rowData = store.state[props._row] || {};

  if (typeof props.children === 'function') {
    return props.children({ ...props, store: store });
  }

  return (
    <td>
      <input
        className="form-control"
        placeholder={props.field.label}
        value={rowData[props.field.name] || ''}
        onChange={evt => {
          let _d = [...store.state];
          _d[props._row] = {
            ..._d[props._row],
            [`${props.field.name}`]: evt.target.value
          };
          store.setState(_d);
        }}
      />
    </td>
  );
}

function SampleTable(props) {
  const fields = props.fields;
  const data = props.data;

  const [state, setState] = React.useState(data);
  const value = { state, setState };

  const onClickName = () => {
    let _d = [...state];
    _d[0] = { ..._d[0], name: 'Name is...' };
    setState(_d);
  };

  return (
    <TableContext.Provider value={value}>
      <table className="table">
        <thead>
          <Header fields={fields}>
            <th field="name" onClick={onClickName}>
              Name
            </th>
            <th field="xxx">XXX Field</th>
          </Header>
        </thead>

        <tbody>
          <Rows fields={fields} data={data} context={TableContext}>
            <InputCell field="name">
              {props => {
                const store = props.store;
                const rowData = store.state[props._row] || {};
                return (
                  <td>
                    <input
                      className="form-control"
                      placeholder={props.field.name}
                      value={rowData[props.field.name] || ''}
                      onChange={evt => {
                        let _d = [...store.state];
                        _d[props._row] = {
                          ..._d[props._row],
                          name: evt.target.value
                        };
                        store.setState(_d);
                      }}
                    />
                  </td>
                );
              }}
            </InputCell>

            <InputCell field="description" />
          </Rows>
        </tbody>

        <tbody>
          <tr>
            <td colSpan="20">
              <p>
                <font color="red">
                  SLOW .. renders every row on edit because of context on each
                  cell
                </font>
              </p>
              {JSON.stringify(value.state)}
            </td>
          </tr>
        </tbody>
      </table>
    </TableContext.Provider>
  );
}

export const heavyTable = () => {
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
      name: 'description',
      label: 'Description'
    },
    'email'
  ];

  let template = [
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

  let data = [];
  let iidx = 0;
  for (let i = 0; i < 100; i++) {
    data.push({ ...template[0], no: iidx++ });
    data.push({ ...template[1], no: iidx++ });
  }

  return <SampleTable fields={fields} data={data} />;
};
