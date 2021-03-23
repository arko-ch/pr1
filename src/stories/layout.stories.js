import React from 'react';
import FormLayout from '../app/components/form/FormLayout';

import '../assets/_App.css';
import '../Test.scss';
import './layout.scss';

export default { title: 'Layout Stories' };

export const layout = () => {
  const sections = [
    {
      name: 'first',
      label: 'First'
    },
    {
      label: 'Second'
    }
  ];

  const fields = [
    {
      label: 'Name',
      description: '',
      type: 'string',
      disabled: false,
      name: 'name',
      sortable: true,
      searchable: true
    },
    {
      label: 'Description',
      description: '',
      type: 'text',
      disabled: false,
      name: 'description',
      sortable: true,
      searchable: true
    },
    {
      label: 'State',
      description: '',
      type: 'string',
      disabled: false,
      name: 'state',
      sortable: true,
      searchable: true
    },
    {
      label: 'Type',
      description: '',
      type: 'string',
      disabled: false,
      name: 'type',
      sortable: true,
      searchable: true
    },
    {
      label: 'Code',
      description: '',
      type: 'string',
      disabled: false,
      name: 'code',
      sortable: true,
      searchable: true
    },
    {
      label: 'ShortDescription',
      description: '',
      type: 'string',
      disabled: false,
      name: 'shortDescription',
      sortable: true,
      searchable: true
    },
    {
      label: 'Variations',
      description: '',
      type: 'json',
      disabled: false,
      name: 'variations',
      sortable: false,
      searchable: false
    }
  ];

  fields.forEach((f, idx) => {
    f.section = f.section || 0;
    f.column = f.column || 0;
    f.rendered = <div key={`${idx}-${f.section}-${f.column}`}>{f.name}</div>;
  });

  return (
    <div className="p-4">
      <FormLayout items={[fields]} />
    </div>
  );
};
