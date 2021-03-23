import React, { Fragment, useState } from 'react';
import { Row, Col, Label } from 'reactstrap';
import { crud } from './crud'; //'../../../services/crud';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import StateHelper from './stateHelper';
import { debounce } from 'throttle-debounce';

const fs = new StateHelper();

const PersonList = props => {
  const { set } = props;
  const $contacts = crud('contacts');
  const [data, setData] = useState({ contacts: [] });
  const [isLoading, setIsLoading] = useState(false);

  const onSearch = async query => {
    setIsLoading(true);

    var parts = query.split(' ');

    let firstName;
    let lastName;

    if (parts.length > 1) {
      firstName = query
        .split(' ')
        .slice(0, -1)
        .join(' ');
      lastName = query
        .split(' ')
        .slice(-1)
        .join(' ');
    } else {
      firstName = query;
      lastName = query;
    }

    let contacts = await $contacts.find({
      'or:firstName_regex': firstName,
      'or:lastName_regex': lastName
    });

    let options = [];

    if (set) {
      options = contacts.data.map(c => {
        if (c[set]) {
          return {
            id: c._id,
            label: c.email //c.firstName + ' ' + c.lastName,
            // profilepic: c.profilePic,
          };
        }
        return '';
      });
    } else {
      options = contacts.data.map(c => {
        return {
          id: c._id,
          label: c.email //c.firstName + ' ' + c.lastName,
          // profilepic: c.profilePic,
        };
      });
    }

    setIsLoading(false);
    // if(data.contacts && data.contacts.length){
    //   setData({cotacts:[]});

    // }
    setData({ contacts: options });

    // props.emailData(data.contacts);
  };

  let val = props.value;
  if (typeof val === 'string') {
    val = null;
  }

  const onChange = evt => {
    props.emailData(evt);
    return fs._onChange({
      target: {
        attributes: {
          model: {
            value: props.model
          }
        },
        value: evt
      }
    });
  };

  const handleOnSearch = e => {
    // console.log('Searching for', e);
  };

  return (
    <Fragment>
      {props.label && (
        <Label for={props.id} md={props.label ? 2 : 0} className={'text-left'}>
          {props.label}
        </Label>
      )}
      <Col md={props.label ? 10 : 12}>
        <AsyncTypeahead
          id="email-id"
          delay={1000}
          allowNew
          multiple
          selected={val}
          onSearch={e => debounce(300, handleOnSearch(e))}
          onChange={e => debounce(300, onChange(e))}
          options={data.contacts}
          isLoading={isLoading}
          onInputChange={e => debounce(300, onSearch(e))}
          placeholder="To"
          newSelectionPrefix="Email Address: "
        />
      </Col>
    </Fragment>
  );
};

export default PersonList;
