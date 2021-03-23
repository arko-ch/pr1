import React, { Fragment } from 'react';
import StateHelper from '../app/services/stateHelper';
import { FontAwesomeIcon, Library as Icons } from '../app/icons';
import { isRequired, isEmail } from '../app/services/validator';
import debounce from 'debounce';
import cx from 'classnames';

import '../assets/_App.css';
import '../Test.scss';

export default { title: 'StateHelper Table Stories' };

const fs = new StateHelper();

const capitalize = s => {
  if (typeof s !== 'string') return '';
  return (
    s
      .toLowerCase()
      .charAt(0)
      .toUpperCase() + s.slice(1)
  );
};

function SomeDetailComponent(props) {
  let _fs = props.context;
  let model = `data.${props._row}.name`;
  return (
    <div>
      <p>Detais..</p>
      <input
        className="form-control"
        model={model}
        placeholder="Name"
        value={_fs.getState(model) || ''}
        onChange={evt => {
          /*
          _fs.setState({
            [model]: evt.target.value
          });
          */
          _fs._onChange(evt);
        }}
      />
    </div>
  );
}

function RowDetail(props) {
  return <Fragment>{props.children}</Fragment>;
}

function Row(props) {
  let { context, options, data, _row } = props;

  let fields = props.fields.map(field => {
    let name = field.name || field;
    let label = capitalize(name);
    if (/(\$start|\$end)/.exec(label)) {
      label = '';
    }
    return typeof field === 'object' ? field : { name: name, label: label };
  });

  let filteredFields = fields.filter(field => !field.hidden);

  let renderMap = {};
  React.Children.toArray(props.children).forEach(child => {
    let name = child.props.field;
    renderMap[name] = child;
  });

  // --------------------
  // render cells
  // --------------------
  let renderedChildren = filteredFields.map((field, idx) => {
    let element = renderMap[field.name];
    let cellProps = {
      context,
      options,
      data,
      _row,
      _col: idx,
      field
    };

    if (React.isValidElement(element)) {
      return React.cloneElement(element, cellProps);
    }

    if (props.defaultCell) {
      return props.defaultCell(cellProps);
    }

    return <td key={idx}>{/* default cell */}</td>;
  });

  // --------------------
  // render collapsible detail
  // --------------------
  let detailRow = <Fragment></Fragment>;
  let detailElement = React.Children.toArray(props.children).filter(
    child => child.type && child.type.name === 'RowDetail'
  )[0];
  if (React.isValidElement(detailElement)) {
    let detailProps = {
      fields: props.fields,
      data: props.data, // row data
      _row: props._row,
      context: props.context
    };

    let detailChildren = '';

    if (typeof detailElement.props.children === 'function') {
      detailChildren = detailElement.props.children(detailProps);
    }

    if (!detailChildren) {
      detailChildren = React.Children.toArray(detailElement.props.children)
        .filter(child => React.isValidElement(child))
        .map(child => React.cloneElement(child, detailProps));
    }

    detailRow = (
      <Fragment>
        <tr style={{ display: 'none' }}>
          <td></td>
          {/* so striped continues to work correctly */}
        </tr>
        <tr className={cx(['collapse', { show: props.data.$detailShow }])}>
          <td colSpan="100%">{detailChildren}</td>
        </tr>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <tr>{renderedChildren}</tr>
      {detailRow}
    </Fragment>
  );
}

function rowPropsAreEqual(prevProps, nextProps) {
  const fieldsToCheck = ['data'];
  for (let i = 0; i < fieldsToCheck.length; i++) {
    let f = fieldsToCheck[i];
    let prevObj = prevProps[f];
    let nextObj = nextProps[f];

    /*
    if (typeof(prevObj) === 'object') {
      let keys = Object.keys(prevObj);
      for(let j=0; j<keys.length; j++) {
        if (prevObj[keys[j]] != nextObj[keys[j]]) {
          return false;
        }
      }
      continue;
    }
    */

    if (prevObj != nextObj) {
      return false;
    }
  }
  return true;
}
const RowMemo = React.memo(Row, rowPropsAreEqual);

function Header(props) {
  const defaultCell = props => <th key={props._col}>{props.field.label}</th>;
  return <Row {...props} defaultCell={defaultCell} />;
}

function Rows(props) {
  const defaultCell = props => (
    <td key={props._col}>{/*Row Cell {props._col}*/}</td>
  );
  const rowsRendered = props.data.map((row, idx) => {
    const Row_ = (props.options || {}).memo ? RowMemo : Row;
    return (
      <Row_
        {...props}
        key={`row-data-${idx}`}
        _row={idx}
        defaultCell={defaultCell}
        data={row}
      >
        {props.children}
      </Row_>
    );
  });

  return rowsRendered;
}

function Cell(props) {
  let _fs = props.context;
  if (typeof props.children === 'function') {
    return props.children({ ...props });
  }
  return <td>Cell accepts only a render function as the only child.</td>;
}

function InputCell(props) {
  console.log(`${props._row}-${props._col}`);

  let _fs = props.context;

  let rowData = _fs.getState(`data.${props._row}`) || {};

  let model = `data.${props._row}.${props.field.name}`;
  return (
    <td>
      {model}
      <input
        className="form-control"
        model={model}
        placeholder={props.field.label}
        value={_fs.getState(model) || ''}
        onChange={evt => {
          /*
          _fs.setState({
            [model]: evt.target.value
          });
          */
          _fs._onChange(evt);
        }}
      />
    </td>
  );
}

function SampleTable(props) {
  const fields = props.fields;
  const data = props.data;

  const [state, setState] = React.useState({ data });

  const onClickName = () => {};

  const selectedRows = state.data.filter(r => r.$checked);

  fs.useValidator({
    data: {
      name: { isRequired },
      email: isEmail
    }
  });
  fs.useState(state, setState);

  const toggleRowDetail = (row, data) => {
    let model = `data.${row}.$detailShow`;
    let value = fs.getState(model);
    fs.setState({
      [model]: !value
    });
  };

  const toggleAllCheck = checked => {
    let d = (fs.getState('data') || []).map(row => {
      row.$checked = checked;
      return { ...row };
    });

    fs.setState({
      data: d
    });
  };

  const deleteSelectedRows = () => {
    let d = (fs.getState('data') || []).filter(row => {
      return !row.$checked;
    });

    fs.setState({
      data: d
    });
  };

  const options = { memo: true };

  return (
    <Fragment>
      <div className="p-4">
        {selectedRows.length > 0 && (
          <div className="d-flex btn-link" onClick={deleteSelectedRows}>
            <div className="pl-2 pr-2">
              <FontAwesomeIcon icon={Icons.faTrash} />
            </div>
            <div>
              Delete {selectedRows.length} selected row
              {selectedRows.length > 1 ? 's' : ''}.
            </div>
          </div>
        )}
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <Header fields={fields} context={fs} options={options}>
            <Cell field="$start">
              {props => {
                let _fs = props.context;
                let allSelected = _fs.getState('$allSelected');
                return (
                  <th>
                    <input
                      type="checkbox"
                      checked={allSelected || false}
                      onChange={evt => {
                        _fs.setState({ $allSelected: !allSelected });
                        setTimeout(() => {
                          toggleAllCheck(!allSelected);
                        }, 50);
                      }}
                    />
                  </th>
                );
                // return <th>{JSON.stringify(props.field)}</th>;
              }}
            </Cell>
            <th field="name" onClick={onClickName}>
              Name
            </th>
            <th field="xxx">
              XXX Field - this will be ignored (not attached to any field)
            </th>
          </Header>
        </thead>

        <tbody>
          <Rows
            fields={fields}
            data={state.data}
            context={fs}
            options={options}
          >
            <Cell field="$start">
              {props => {
                let _fs = props.context;
                let rowData = _fs.getState(`data.${props._row}`) || {};
                let model = `data.${props._row}.$checked`;
                return (
                  <td width="5%">
                    <div className="d-flex">
                      <div className="pl-3 pr-3">
                        <input
                          type="checkbox"
                          {..._fs.model(model, { value: 'checked' })}
                        />
                      </div>
                      <div
                        onClick={evt => {
                          toggleRowDetail(props._row, props.data);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={
                            props.data.$detailShow
                              ? Icons.faArrowUp
                              : Icons.faArrowDown
                          }
                        />
                      </div>
                    </div>
                  </td>
                );
              }}
            </Cell>
            <Cell field="name">
              {props => {
                let _fs = props.context;
                let rowData = _fs.getState(`data.${props._row}`) || {};
                let model = `data.${props._row}.${props.field.name}`;
                return (
                  <td>
                    <input
                      className="form-control"
                      placeholder={props.field.label}
                      {..._fs.model(model)}
                      /*
                    value={rowData[props.field.name] || ''}
                    onChange={evt => {
                      _fs.setState({
                        [model]: evt.target.value
                      });
                    }}
                    */
                    />
                  </td>
                );
              }}
            </Cell>

            <InputCell field="email" />

            <RowDetail>
              <SomeDetailComponent />
              {/*(props => JSON.stringify(props)*/}
            </RowDetail>

            <Cell field="$end">
              {props => {
                let _fs = props.context;
                let rowData = _fs.getState(`data.${props._row}`) || {};
                let model = `data.${props._row}`;
                return (
                  <td>
                    <div
                      onClick={evt => {
                        _fs.setState({
                          [model]: { $splice: 1 }
                        });
                      }}
                    >
                      <FontAwesomeIcon icon={Icons.faTrash} />
                    </div>
                  </td>
                );
              }}
            </Cell>
          </Rows>
        </tbody>

        <tbody>
          <tr>
            <td colSpan="20">
              <pre>{JSON.stringify(state, null, 4)}</pre>
            </td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
}

const fields = [
  '$start',
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
    no: 1,
    name: 'Jane Doe',
    email: 'jane.doe@email.com',
    description: 'description for jane'
  },
  {
    no: 2,
    name: 'John Dae',
    email: 'john.dae@email.com',
    description: 'description for mr. doe'
  }
];

export const stateHelperTables = () => {
  let data = [];
  let iidx = 0;
  for (let i = 0; i < 2; i++) {
    data.push({ ...template[0], no: iidx++ });
    data.push({ ...template[1], no: iidx++ });
  }
  return <SampleTable fields={fields} data={data} />;
};

export const tablesWith100Items = () => {
  let data = [];
  let iidx = 0;
  for (let i = 0; i < 50; i++) {
    data.push({ ...template[0], no: iidx++ });
    data.push({ ...template[1], no: iidx++ });
  }
  return <SampleTable fields={fields} data={data} />;
};
