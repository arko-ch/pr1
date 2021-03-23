import React, { Fragment } from 'react';
import Page from 'app/ui/Page';
import cx from 'classnames';
import { crud } from 'app/services/crud';
import { Store as UIStore } from 'app/ui/store';
import { withRouter } from 'react-router-dom';
import $modal from 'app/services/modal';
import notify from 'app/services/notify';
import { schema, CustomView } from './custom';

import ComponentRegistry from 'app/components/registry';
import FormLayout from 'app/components/form/FormLayout';

import StateHelper from 'app/services/stateHelper';
import defaultTemplatesForType from 'app/components/form/inputTypes';

const fs = new StateHelper();

function Detail(props) {
  const ${{model}} = crud('{{models}}');
  const uiStore = React.useContext(UIStore);

  const {{modelId}} = props.match.params.id || '';

  const [state, setState] = React.useState({
    {{model}}: {}
  });

  fs.useState(state, setState);

  const fetchDetail = async () => {
    if ({{modelId}} === 'new') {
      return;
    }

    let res = null;
    try {
      res = await ${{model}}.findOne({{modelId}});
    } catch (err) {
      console.log(err);
    }

    if (res) {
      setState({
        ...state,
        {{model}}: res.data
      });
    }
  };

  const save = () => {
    let {{model}} = fs.state().{{model}};

    ${{model}}
      .save({{model}})
      .then(res => {
        notify.notify('Saved', { type: 'success' });

        if ({{modelId}} === 'new') {
          setTimeout(() => {
            props.history.push('/settings/{{models}}');
          }, 250);
        }

      })
      .catch(err => {
        notify.notify('Error saving', { type: 'error' });
      });
  };

  const confirmErase = () => {
    $modal.confirm({
      title: 'Really?',
      message: 'Delete this?',
      actions: [{ title: 'yes', action: erase }]
    });
  };

  const erase = async () => {
    let {{model}} = fs.state().{{model}};
    ${{model}}
      .erase({{model}}._id)
      .then(res => {
        notify.notify('Deleted', { type: 'success' });
        
        setTimeout(() => {
          props.history.push('/settings/{{models}}');
        }, 250);
        
      })
      .catch(err => {
        notify.notify('Error deleting', { type: 'error' });
      });
  };

  React.useEffect(() => {
    //----------------
    // on mount
    //----------------

    fetchDetail();
    
    const originalItems = [...uiStore.state.toolbar.items];

    uiStore.dispatch(
      uiStore.setState({
        'toolbar.items': [
          ...uiStore.state.toolbar.items,
          {
            label: '',
            icon: 'faArrowLeft',
            className: 'property-menu mr-3',
            action: () => {
              props.history.push('/settings/{{models}}');
            }
          },
          {
            label: 'Save',
            icon: 'save',
            className: 'property-menu',
            action: () => {
              save();
            }
          },
          {
            label: 'Delete',
            icon: 'trash',
            className: 'property-menu',
            action: confirmErase
          }
        ]
      })
    );

    return () => {
      //----------------
      // on unmount
      //----------------

      uiStore.dispatch(
        uiStore.setState({
          'toolbar.items': originalItems
        })
      );
    };
  }, []);

  const fieldsRendered = schema.layouts.edit.map((row, idx) => {
    return row.map((field, idx) => {
      let meta = schema.metadatas[field.name].edit;
      let attributes = schema.attributes[field.name] || { type: 'string' };
      let rendered;

      // render group component
      let GroupComponent = meta.groupComponent;
      if (typeof GroupComponent === 'string') {
        GroupComponent = ComponentRegistry[GroupComponent] || GroupComponent;
      }

      if (GroupComponent) {
        rendered = <GroupComponent
                  key={idx}
                  {...meta}
                  {...fs.model('{{model}}.' + field.name)}
                  options={meta.options || attributes.enum}
                  fs={fs}/>
      }

      // render input component
      while (!rendered) {
        let component = meta.component;
        if (typeof component === 'string') {
          component = ComponentRegistry[component] || component;
        }

        // meta component
        if (component) {
          let Component = component;
          rendered = <div key={field.name} className={cx('form-group', 'row', meta.groupClassName || '')}>
            <label className={cx('form-group-label', meta.labelClassName || 'col-sm-3')}>{meta.label}</label>
            <div className={cx('form-group-input', meta.inputContainerClassName || 'col-sm-9')}>
            <Component
              className={cx('form-control', meta.inputClassName || '')}
              {...meta}
              {...fs.model(`{{model}}.${field.name}`)}
              options={meta.options || attributes.enum}
            />
            </div>
          </div>
          break;
        }

        let InputComponent = defaultTemplatesForType[attributes.type] || defaultTemplatesForType['string'];

        rendered = <Fragment key={idx}>
            <InputComponent
              model={`{{model}}.${field.name}`}
              field={meta}
              options={meta.options || attributes.enum}
              context={fs}/>
          </Fragment>
        break;
      }

      return {
        name: field,
        label: meta.label || field,
        size: field.size,
        rendered: rendered
      };
    });
  });

  const page = {
    icon: 'pe-7s-note',
    welcome: {
      title: '{{title}}',
      message: ''
    },
    crumbs: [
      { title: '{{title}}', href: `/#/settings/{{models}}` },
      { title: 'Detail' }
    ]
  }

  return (
    <Page {...page}>
    <div className="card">
    <div className="card-body">
      <form role="form">
      <FormLayout items={fieldsRendered}/>
      <CustomView fs={fs}/>
      {<pre>{JSON.stringify(state.{{model}}, null, 4)}</pre>}
      </form>
       <div className="clearfix"></div>
    </div>
    </div>
    </Page>
  );
}

export default withRouter(Detail);
