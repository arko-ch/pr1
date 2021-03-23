import React, { Component } from 'react';
import AsyncSelect from 'react-select/async'
import { crud } from '../../../app/services/crud';

const $properties = crud('properties');

class PropertyListAsync extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        selectedOption: {}
    }
  }

fetchData = (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
    } else {
        setTimeout(() => {
            let referenceNo;
            let properties = await $properties.find({
                'or:referenceNo_regex': referenceNo
              })
  .then((resp) => {
    return resp.json()
  }) 
  .then((data) => {
      const tempArray = [];
     data.forEach((element) => {
            tempArray.push({ label: `${element.referenceNo}`, value: element._id });
     });
     callback(tempArray);            
  })
  .catch((error) => {
    console.log(error, "catch the hoop")
  });
});
}
}

 onSearchChange = (selectedOption) => {
    if (selectedOption) {

    this.setState({
        selectedOption
       });
    }
  };
  render() {
      return ( <div>
           <AsyncSelect
                value={this.state.selectedOption}
                loadOptions={this.fetchData}
                placeholder="Admin Name"
                onChange={(e) => {
                    this.onSearchChange(e);
                }}
                defaultOptions={false}
            />
      </div>)
  }

}

export default PropertyListAsync;