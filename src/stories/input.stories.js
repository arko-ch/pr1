import React from 'react';
import ComboBox from '../app/components/form/ComboBox';
import {
  AsyncTypeahead,
  Typeahead
} from '../app/components/typeahead/Typeahead';

import '../assets/_App.css';
import '../Test.scss';

export default { title: 'Input Stories' };

export const comboBox = () => {
  const options = [
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
  ];

  return (
    <div className="p-4">
      <ComboBox options={options} />
    </div>
  );
};

export const typeahead = () => {
  const options = [
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
  ];

  const val = ['Jane'];

  const onSearch = evt => {};

  const onChange = evt => {};

  return (
    <div className="p-4">
      <AsyncTypeahead
        id="type-1"
        multiple
        selected={val}
        onSearch={query => onSearch(query)}
        onChange={e => onChange(e)}
        options={options}
        isLoading={false}
      />
    </div>
  );
};
