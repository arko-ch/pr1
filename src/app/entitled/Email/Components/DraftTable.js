import React, { Component } from 'react';
import AsyncSelect from 'react-select/async'
import { crud } from '../../../app/services/crud';
//07/09 deployment pre full capability //pixel tracker 08/1020
const $properties = crud('properties');

/* const client = require('@draftable/compare-api').client('hNkPix-test', 'fa025b7dc66b54c007c02f1db71ce2a6');
client.comparisons.create({
    left: {
        source: 'https://api.draftable.com/static/test-documents/code-of-conduct/left.pdf',
        fileType: 'pdf',
    },
    right: {
        source: 'https://api.draftable.com/static/test-documents/code-of-conduct/right.rtf',
        fileType: 'rtf',
    },
}).then(function(comparison) {
   console.log("Comparison created:", comparison);
   console.log("Viewer comparison at:", client.comparisons.signedViewerURL(comparison.identifier));
}); */

class PropertyListAsync extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        selectedOptionPropertyId: {}
    }
  }

fetchData = (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
    } else {
        setTimeout(() => {
            //let referenceNo;
            let properties = await $properties.find({
                'or:referenceNo_regex': inputValue
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

 onSearchChange = (selectedOptionPropertyId) => {
    if (selectedOptionPropertyId) {

    this.setState({
        selectedOptionPropertyId
       });
    }
  };
  render() {
      return ( <div>
           <AsyncSelect
                value={this.state.selectedOptionPropertyId}
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