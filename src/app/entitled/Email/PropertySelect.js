import React, { Fragment, PureComponent } from 'react';
import { Input, Button, Card, CardBody, Row, Col } from 'reactstrap';
import { Library as Icons, FontAwesomeIcon } from '../../../app/icons/Icon';
import debounce from 'debounce';

import StateHelper from '../../../app/services/stateHelper';
import { crud } from '../../../app/services/crud';
// strapiV3
/**
	react-dropdown-list theme css
	this file controls the appearance of the dropdown - please edit to suit your needs
*/
const fs = new StateHelper();

//class Search extends Component { => functional arrow changes
export default class PropertySelect extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      items: [],
      selected: null
    };
    this.$property = crud('properties');

    this._onSearch = this.onSearch;
    this.onSearch = debounce(evt => {
      this._onSearch(evt);
    }, 500);
  }

  _setState(newState) {
    this.setState(newState);
    //console.log('newSTate->',newState)
    this.onSearch();
  }

  async searchProperty() {
    let res = await this.$property.find({
      'or:referenceNo_regex': this.state.search,
      'or:properties.address_regex': this.state.search,
      _project: [
        'referenceNo',
        'properties',
        'transactionType',
        'buyer',
        'manager',
        'processor',
        'examiner',
        'closer',
        'postCloser',
        'backOffice'
      ],
      _limit: 10
    });

    if (res && res.data) {
      this.setState({
        items: res.data
      });
    }
  }

  onSearch(evt) {
    //console.log('property select onSearch',evt);
    this.searchProperty();
  }

  render() {
    fs.useState(this.state, this._setState.bind(this));

    // let items = this.state.items.map((item, idx) => {
    //   let acls =
    //     this.state.selected && item._id == this.state.selected._id
    //       ? 'active'
    //       : '';
    //   return (
    //     <li
    //       className={'list-group-item ' + acls}
    //       key={`property-${idx}`}
    //       onClick={() => {
    //         this.setState({
    //           selected: item,
    //           result: item
    //         });
    //         if (this.props.onChange) {
    //           this.props.onChange({
    //             target: {
    //               attributes: {
    //                 model: {
    //                   value: 'modal.result'
    //                 }
    //               },
    //               value: item
    //             }
    //           });
    //         }
    //       }}
    //     >

    //     </li>
    //   );
    // });

    let items = this.state.items.map((item, idx) => {
      let acls =
        this.state.selected && item._id == this.state.selected._id
          ? 'active'
          : '';

      return (
        <Card
          className={'mb-2 list-group-item ' + acls}
          style={{ cursor: 'pointer' }}
          key={`property-${idx}`}
          onClick={() => {
            this.setState({
              selected: item,
              result: item
            });
            if (this.props.onChange) {
              this.props.onChange({
                target: {
                  attributes: {
                    model: {
                      value: 'modal.result'
                    }
                  },
                  value: item
                }
              });
            }
          }}
        >
          <CardBody>
            <Row>
              <Col>
                {item.referenceNo} - {item.properties[0].address}{' '}
                {/* {item.properties[0].state} {item.properties[0].zip} */}
              </Col>
            </Row>
            <Row>
              <Col>Transaction Type: {item.transactionType}</Col>
            </Row>
          </CardBody>
        </Card>
      );
    });

    return (
      <Fragment>
        <Card className="mb-4">
          <CardBody>
            <Input {...fs.model('search')} />
            <span>
              <em> Search by reference no.or by address </em>
            </span>
            <ul className="list-group">{items}</ul>
          </CardBody>
        </Card>
      </Fragment>
    );
  }
}