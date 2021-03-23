import React, { Fragment } from 'react';

import '../assets/_App.css';
import '../Test.scss';

export default { title: 'Render Props Stories' };

const capitalize = s => {
  if (typeof s !== 'string') return '';
  return (
    s
      .toLowerCase()
      .charAt(0)
      .toUpperCase() + s.slice(1)
  );
};

function DeeperChildComponent(props) {
  return (
    <div>
      Deep
      <pre>{JSON.stringify(props.field, null, 4)}</pre>
      {props.children('xxx')}
    </div>
  );
}

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

    return <div key={idx}>{/* default cell */}</div>;
  });

  return (
    <div className="m-2 p-4" style={{ background: '#f0f0f0' }}>
      <p>Child Component</p>
      {renderedChildren}
    </div>
  );
}

function Header(props) {
  const defaultCell = props => <p key={props._col}>Header Cell {props._col}</p>;
  return <Row {...props} defaultCell={defaultCell} />;
}

function Rows(props) {
  const defaultCell = props => <p key={props._col}>Row Cell {props._col}</p>;
  const rowsRendered = props.data.map((row, idx) => {
    return (
      <Row
        context={props.context}
        key={`row-data-${idx}`}
        _row={idx}
        fields={props.fields}
        defaultCell={defaultCell}
      >
        {props.children}
      </Row>
    );
  });

  return rowsRendered;
}

const TableContext = React.createContext();

function InputCell(props) {
  const store = React.useContext(props.context);
  const rowData = store.state[props._row] || {};

  if (typeof props.children === 'function') {
    return props.children({ ...props, store });
  }

  return (
    <div>
      <input
        className="form-control"
        placeholder={'xx'}
        value={rowData['description'] || ''}
        onChange={evt => {
          let _d = [...store.state];
          _d[props._row] = { ..._d[props._row], description: evt.target.value };
          store.setState(_d);
        }}
      />
    </div>
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
      <div className="p-4">
        <Header fields={fields}>
          <div field="name" onClick={onClickName}>
            Name
          </div>
          <div field="xxx">XXX Field</div>
          <DeeperChildComponent field="email" xx="xx">
            {value => <p>{value}</p>}
          </DeeperChildComponent>
          <DeeperChildComponent field="description">
            {value => <p>{value}</p>}
          </DeeperChildComponent>
        </Header>

        {JSON.stringify(value.state)}

        <Rows fields={fields} data={data} context={TableContext}>
          <InputCell field="name">
            {props => {
              const store = props.store;
              const rowData = store.state[props._row] || {};
              return (
                <div>
                  {rowData[props.field.name]}
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
                </div>
              );
            }}
          </InputCell>

          <InputCell field="description" />
        </Rows>
      </div>
    </TableContext.Provider>
  );
}

export const renderProps = () => {
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

  return <SampleTable fields={fields} data={data} />;
};
