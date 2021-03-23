import React from 'react';
import Page from 'app/ui/Page';
import { crud } from 'app/services/crud';
import { Store as UIStore } from 'app/ui/store';
import { withRouter } from 'react-router-dom';
import { schema } from './custom';

import { Library as Icons, FontAwesomeIcon } from 'app/icons';
import { Table, Header, Body, Column } from 'app/components/table/Table';

import registry from 'app/components/registry';

function List(props) {
  const fields = schema.layouts.list;
  const ${{model}} = crud('{{models}}');
  const uiStore = React.useContext(UIStore);
  const [state, setState] = React.useState({data:[]});

  const filterSearch = uiStore.state.search.text;

  const fetchList = async () => {
    let params = {}

    if (filterSearch) {
      fields.forEach(f => {
        let meta = schema.metadatas[f].list;
        if (meta.searchable) {
          params[`or:${f}_regex`] = filterSearch;
        }
      });
    }

    let res = null;
    try {
      res = await ${{model}}.find(params);
    } catch (err) {
      console.log(err);
    }

    if (res) {
      setState({...state, data:res.data});
    }
  };

  React.useEffect(() => {

    uiStore.dispatch(
      uiStore.setState({
        'search.show': true
      })
    );

    return () => {
      uiStore.dispatch(
        uiStore.setState({
          'search.show': false,
          'search.text': ''
        })
      );
    };
    
  }, []);

  React.useEffect(() => {
    fetchList();
  }, [ filterSearch ]);

  let listFields = [];
  fields.forEach(field => {
    if (typeof field === 'object') {
      listFields.push(field);
      return;  
    }
    let meta = schema.metadatas[field].list;
    listFields.push({
      name: field,
      ...meta
    });
  })

  const onCreateNew = () => {
    props.history.push('/settings/{{models}}/new');
  }

  const onRowClick = (evt, p) => {
    props.history.push(`/settings/{{models}}/${p.data._id}`);
  }

  const onSearch = () => {
    uiStore.dispatch(
        uiStore.setState({
          'search.active': true,
          'search.text': ''
        })
      );
  }

  const page = {
    icon: 'pe-7s-note',
    welcome: {
      title: '{{title}}',
      message: ''
    },
    crumbs: [
      { title: '{{title}}', href: `/#/settings/{{models}}` }
    ]
  };

  return (
    <Page {...page}>
      <div className="card">
        <div className="card-header">
          <div className="float-right">
            <button
              className={'btn btn-primary mr-1'}
              onClick={onSearch}>
              Search
            </button>
            <button
              className={'btn btn-primary'}
              onClick={onCreateNew}>
              Add
            </button>
          </div>
        </div>
        <Table className="table table-hover" columns={listFields} data={state.data}>
          <Header/>
          <Body onClick={onRowClick}>
            <Column field='$actions'>
            </Column>
          </Body>
        </Table>
      </div>
    </Page>
  );
}

export default withRouter(List);
