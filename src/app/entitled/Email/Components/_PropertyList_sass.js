import React, { Fragment, useState } from 'react';
import { Row, Col, Label } from 'reactstrap';
import { crud } from '../../../app/services/crud';
import { AsyncTypeahead } from '../../../app/components/typeahead/Typeahead' 
//'../../../components/typeahead/Typeahead';
import { debounce } from 'throttle-debounce';
//pdftron full capability review - 07/10 // pixel tracker 0881020
//for review and merging 09/23

const PropertyList = props => {
  const { set } = props;
  const $properties = crud('properties');

  const [data, setData] = useState({ properties: [] });
  const [isLoading, setIsLoading] = useState(false);

  const onSearch = async query => {
    setIsLoading(true);   

    let referenceNo;  

    let properties = await $properties.find({
      'or:referenceNo_regex': referenceNo
    });

    let options = [];

    if (set) {
      options = properties.data.map(c => {
        if (c[set]) {
          return {
            id: c._id,
            label: c.referenceNo 
          };
        }
        return '';
      });
    } else {
      options = properties.data.map(c => {
        return {
          id: c._id,
          label: c.referenceNo
        };
      });
    }

    setIsLoading(false);
          // if(data.properties && data.properties.length){
          //   setData({cotacts:[]});
          // }
    setData({ properties: options });
  };

  let val = props.value;
  if (typeof val === 'string') {
    val = null;
  }

  const onChange = evt => {
    return props.onChange({
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
          id={props.id}
          delay={1000}
          multiple
          selected={val}
          onSearch={e => debounce(300,handleOnSearch(e))}
          onChange={e => debounce(300,onChange(e))}
          options={data.properties}
          isLoading={isLoading}
          onInputChange={e =>debounce(300,onSearch(e))}
        />
      </Col>
    </Fragment>
  );
};

export default PropertyList;
