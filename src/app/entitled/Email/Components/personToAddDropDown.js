import React, { Component } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  InputGroup,
  InputGroupAddon,
  Row,
  UncontrolledButtonDropdown,
  Form,
  FormGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormText
} from "reactstrap";

import { Library as Icons, FontAwesomeIcon } from '../../../app/icons'

export default class personToAddDropDown extends Component {
  constructor(props) {
    super(props);
    this.updateSearchText = this.updateSearchText.bind(this);
    this.state = {
      searchText: "Add person(s) to email list: "
    };
  }
  updateSearchText(property) {
    if (property === "") {
      this.setState({
        searchText: "Searching within All Properties."
      });
    } else {
      this.setState({
        searchText: "Searching within " + property + "."
      });
    }
  }
  render() {
    return (
      <div>
        <UncontrolledButtonDropdown
          direction="down"
          className="search-dropdown"
          group={false}
        >
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <div className="input-group-text">
                <FontAwesomeIcon icon={Icons.faSearch} />
              </div>
            </InputGroupAddon>
            <Input placeholder={this.state.searchText} />
            <InputGroupAddon addonType="append">
              <DropdownToggle
                tag="div"
                className="input-group-text dropdown-arrow"
              >
                <FontAwesomeIcon icon={Icons.faAngleDown} />
              </DropdownToggle>
            </InputGroupAddon>
          </InputGroup>
          <DropdownMenu>
            <DropdownItem
              tag="div"
              className="blue-item"
              onClick={() => this.updateSearchText("")}
            >
              Show emails on all properties.
            </DropdownItem>
            <DropdownItem
              tag="div"
              onClick={() => this.updateSearchText("NJ 08518")}
            >
              (2)
              <strong className="mr-1 highlighted-address"> NJ - Z9382 </strong>
              123 Main Street Appleville, NJ 08518
              <FontAwesomeIcon icon={Icons.faArrowRight} className="ml-1 mr-1" />
              Bryan Buyer
            </DropdownItem>
            <DropdownItem
              tag="div"
              onClick={() => this.updateSearchText("NJ 08518")}
            >
              (1)
              <strong className="mr-1 highlighted-address"> NJ - A4827 </strong>
              34 Market St. Jacksonville, NJ 08518
              <FontAwesomeIcon icon={Icons.faArrowRight} className="ml-1 mr-1" />
              Jessica Chi
            </DropdownItem>
            <DropdownItem
              tag="div"
              onClick={() => this.updateSearchText("NY 06784")}
            >
              <strong className="mr-1 highlighted-address"> NY - P9348 </strong>
              558 Maple Street Mapleville, NY 06784
              <FontAwesomeIcon icon={Icons.faArrowRight} className="ml-1 mr-1" /> Rick
              Moq
            </DropdownItem>
            <DropdownItem
              tag="div"
              onClick={() => this.updateSearchText("NJ 08518")}
            >
              <strong className="mr-1 highlighted-address"> NJ - Z9382 </strong>
              123 Main Street Appleville, NJ 08518
              <FontAwesomeIcon icon={Icons.faArrowRight} className="ml-1 mr-1" /> Amy
              Dealmaker
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledButtonDropdown>
      </div>
    );
  }
}

