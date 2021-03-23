import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  CustomInput,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  ListGroup,
  ListGroupItem,
  Nav,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
  Row,
  Table,
  UncontrolledButtonDropdown,
  UncontrolledTooltip
} from "reactstrap";
//strapiV3
import { Library as Icons, FontAwesomeIcon, Ionicon } from "../icons";

export default function TodoList() {
  let state = {};
  const toggleList = () => {};
  const toggle = () => {};
  const onMouseEnter = () => {};
  const onMouseLeave = () => {};

  return (
    <Card className="card-hover-shadow-2x mb-3">
      <CardHeader>
        <div> To - Do List(All Properties) </div>
        <div className="btn-actions-pane-right actions-icon-btn">
          <UncontrolledButtonDropdown>
            <DropdownToggle className="btn-icon btn-icon-only" color="link">
              <div className="btn-icon-wrapper">
                <Ionicon icon="ios-resize"/>
              </div>
            </DropdownToggle>
          </UncontrolledButtonDropdown>
        </div>
      </CardHeader>
      <div className="scroll-area-lg">
        <PerfectScrollbar>
          <ListGroup className="todo-list-wrapper" flush>
            <ListGroupItem>
              <div className="todo-indicator bg-success" />
              <div className="widget-content p-0">
                <div className="widget-content-wrapper">
                  <div className="widget-content-left mr-2">
                    <CustomInput
                      type="checkbox"
                      id="exampleCustomCheckbox12"
                      label="&nbsp;"
                      readOnly
                    />
                  </div>
                  <div className="widget-content-left">
                    <div className="widget-heading">
                      Respond to Miss Realtor 's urgent email now
                      <div className="badge badge-danger ml-2"> Urgent </div>
                    </div>
                    <div className="widget-subheading">
                      <i> Added by </i> Bryan Hewitt
                    </div>
                  </div>
                  <div className="widget-content-right">
                    <Button
                      className="border-0 btn-transition"
                      onClick={toggleList}
                      outline
                      color="primary"
                    >
                      <FontAwesomeIcon icon={Icons.faAngleDown} />
                    </Button>
                  </div>
                </div>
              </div>
              <Collapse isOpen={state.collapse}>
                <Card className="no-shadow border ml-5 mt-3">
                  <CardBody className="p-2">
                    Followed up, have to call again in 2 days
                  </CardBody>
                </Card>
              </Collapse>
            </ListGroupItem>
            <ListGroupItem className="itemDone">
              <div className="todo-indicator bg-warning" />
              <div className="widget-content p-0">
                <div className="widget-content-wrapper">
                  <div className="widget-content-left mr-2">
                    <CustomInput
                      type="checkbox"
                      id="exampleCustomCheckbox1"
                      label="&nbsp;"
                      checked
                      readOnly
                    />
                  </div>
                  <div className="widget-content-left">
                    <div className="widget-heading">
                      Task with hover dropdown menu
                    </div>
                    <div className="widget-subheading">
                      <div>
                        <i> Added by </i> Bryan Hewitt, <i>assigned to</i> Emily
                        Radell
                      </div>
                    </div>
                  </div>
                  <div className="widget-content-right widget-content-actions">
                    <Dropdown
                      className="d-inline-block rm-pointers"
                      onMouseOver={onMouseEnter}
                      onMouseLeave={onMouseLeave}
                      isOpen={state.dropdownOpen}
                      toggle={toggle}
                    >
                      <DropdownToggle
                        color="link"
                        className="border-0 btn-transition"
                      >
                        <FontAwesomeIcon icon={Icons.faEllipsisH} />
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem disabled> Action </DropdownItem>
                        <DropdownItem> Another Action </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              </div>
            </ListGroupItem>
          </ListGroup>
        </PerfectScrollbar>
      </div>
      <CardFooter className="d-block text-right">
        <Form>
          <InputGroup>
            <Input type="text" placeholder="Enter task text here" />
            <InputGroupAddon addonType="append">
              <Button color="primary"> Add Task </Button>
            </InputGroupAddon>
          </InputGroup>
        </Form>
      </CardFooter>
    </Card>
  );
}

