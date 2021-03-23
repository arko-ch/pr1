import React from 'react';
import clx from 'classnames';

import '../assets/_App.css';
import '../Test.scss';

import { FontAwesomeIcon, Library } from 'app/icons';
import { SelectStatusIcons } from 'app/components/selectStatus/SelectStatus';

export default { title: 'Status Icon Stories' };

const ColorTypes = {
  light: 'Normal',
  primary: 'Important',
  success: 'Success',
  warning: 'Warning',
  danger: 'Danger',
  gray: 'Gray',
  dark: 'Dark',
  info: 'Info'
};

const ColorTypeMetas = {
  light: { className: 'text-secondary' },
  primary: { className: 'text-primary' },
  success: { className: 'text-success' },
  warning: { className: 'text-warning' },
  danger: { className: 'text-danger' },
  gray: { className: 'text-muted' },
  dark: { className: 'text-dark' },
  info: { className: 'text-info' }
};

const StatusIconsSelectContainer = props => {
  const [state, setState] = React.useState();

  const onChange = value => {
    setState(value);
  };

  const options = Object.keys(ColorTypes).map(k => {
    return {
      value: k,
      label: ColorTypes[k],
      icon: 'faFlagCheckered',
      ...ColorTypeMetas[k]
    };
  });

  return (
    <div className="p-4">
      <SelectStatusIcons options={options} value={state} onChange={onChange} />
    </div>
  );
};

export const statusIcons = () => {
  return <StatusIconsSelectContainer />;
};
