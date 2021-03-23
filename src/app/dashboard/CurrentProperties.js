import React, { Component, Fragment } from 'react';
import bg1 from '../../assets/architect/utils/images/dropdown-header/abstract1.jpg';
// import IncomeReport2 from './Components/IncomeReport2';
//route for elasticsearch engine ingestion
import classnames from 'classnames';
import avatar1 from '../../assets/architect/utils/images/avatars/1.jpg';
import avatar2 from '../../assets/architect/utils/images/avatars/2.jpg';
import avatar3 from '../../assets/architect/utils/images/avatars/3.jpg';
import avatar4 from '../../assets/architect/utils/images/avatars/4.jpg';
import avatar5 from '../../assets/architect/utils/images/avatars/5.jpg';
import avatar6 from '../../assets/architect/utils/images/avatars/10.jpg';
import avatar7 from '../../assets/architect/utils/images/avatars/8.jpg';
import avatar8 from '../../assets/architect/utils/images/avatars/9.jpg';
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
} from 'reactstrap';
// import { Sparklines, SparklinesLine } from "./app/components/react-sparklines"; //strapiV3

import PerfectScrollbar from 'react-perfect-scrollbar';
// import Tabs from 'react-responsive-tabs'; //strapiV3
import { makeData } from '../services/mock';

import { Library as Icons, FontAwesomeIcon } from '../icons';

const Sparklines = () => {
  return <Fragment></Fragment>;
};
const SparklinesLine = () => {
  return <Fragment></Fragment>;
};

function randomData(n = 30) {
  return Array.apply(0, Array(n)).map(boxMullerRandom);
}

const sampleData = randomData(10);
const sampleData2 = randomData(8);
const sampleData3 = randomData(12);
const sampleData4 = randomData(14);

function boxMullerRandom() {
  let phase = false,
    x1,
    x2,
    w;

  return (function() {
    if ((phase = !phase)) {
      do {
        x1 = 2.0 * Math.random() - 1.0;
        x2 = 2.0 * Math.random() - 1.0;
        w = x1 * x1 + x2 * x2;
      } while (w >= 1.0);

      w = Math.sqrt((-2.0 * Math.log(w)) / w);
      return x1 * w;
    } else {
      return x2 * w;
    }
  })();
}

export default class CurrentProperties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popoverOpen1: false,
      popoverOpen2: false,
      popoverOpen3: false,
      popoverOpen4: false
    };

    this.togglePop1 = function() {
      this.setState({
        popoverOpen1: !this.state.popoverOpen1
      });
    }.bind(this);
    this.togglePop2 = function() {
      this.setState({
        popoverOpen2: !this.state.popoverOpen2
      });
    }.bind(this);
    this.togglePop3 = function() {
      this.setState({
        popoverOpen3: !this.state.popoverOpen3
      });
    }.bind(this);
    this.togglePop4 = function() {
      this.setState({
        popoverOpen4: !this.state.popoverOpen4
      });
    }.bind(this);
  }

  render() {
    return (
      <Card className="main-card mb-3">
        <CardHeader>
          Current Propertie[s]
          <div className="badge badge-secondary ml-2"> 50 </div>
        </CardHeader>
        <Table
          responsive
          hover
          striped
          borderless
          className="align-middle mb-0"
        >
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th>Address</th>
              <th>Staff</th>
              <th className="text-center">
                Closing Date
                <a href="" className="mr-1 ml-3">
                  <FontAwesomeIcon icon={Icons.faArrowUp} />
                </a>
                <a href="">
                  <FontAwesomeIcon icon={Icons.faArrowDown} />
                </a>
              </th>
              <th className="text-center"> Stage </th>
              <th className="text-center"> Activity </th>
              <th className="text-center"> Transfers </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="text-center text-muted"> NJ - Z9382 </td>
              <td>
                <div className="widget-content p-0">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left flex2">
                      <div className="widget-heading"> 123 Main Street </div>
                      <div className="widget-subheading opacity-7">
                        Appleville, NJ 08518
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div className="widget-content p-0">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left mr-3">
                      <div className="widget-content-left">
                        <img
                          width={40}
                          className="rounded-circle"
                          src={avatar2}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="widget-content-left flex2">
                      <div className="widget-heading"> John Doe </div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="text-center">
                <span className="pr-2 opacity-6">
                  <FontAwesomeIcon icon={Icons.faBusinessTime} />
                </span>
                12 Dec
              </td>
              <td className="text-center">
                <div className="badge badge-warning"> Pending Deal </div>
              </td>
              <td
                className="text-center"
                style={{
                  width: '150px'
                }}
              >
                <Sparklines height={60} data={sampleData}>
                  <SparklinesLine
                    style={{
                      strokeWidth: 3,
                      stroke: 'var(--warning)',
                      fill: 'none'
                    }}
                  />
                </Sparklines>
              </td>
              <td className="text-center">
                <Button
                  bssize="sm"
                  color="primary"
                  id={'PopoverCustomT-1'}
                  onClick={this.togglePop1}
                >
                  View
                </Button>
                <Popover
                  className="popover-custom rm-pointers"
                  placement="auto"
                  isOpen={this.state.popoverOpen1}
                  target={'PopoverCustomT-1'}
                  toggle={this.togglePop1}
                >
                  <PopoverBody>
                    <div className="dropdown-menu-header">
                      <div
                        className={classnames(
                          'dropdown-menu-header-inner bg-focus'
                        )}
                      >
                        <div
                          className="menu-header-image"
                          style={{
                            backgroundImage: 'url(' + bg1 + ')'
                          }}
                        />
                        <div className="menu-header-content">
                          <h5 className="menu-header-title"> Settings </h5>
                          <h6 className="menu-header-subtitle">
                            Manage all of your options
                          </h6>
                        </div>
                      </div>
                    </div>
                    <Nav vertical>
                      <NavItem className="nav-item-header"> Activity </NavItem>
                      <NavItem>
                        <NavLink href="">
                          Chat
                          <div className="ml-auto badge badge-pill badge-info">
                            8
                          </div>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href=""> Recover Password </NavLink>
                      </NavItem>
                      <NavItem className="nav-item-divider" />
                      <NavItem className="nav-item-btn text-center">
                        <Button
                          bssize="sm"
                          className="btn-wide btn-shadow"
                          color="danger"
                        >
                          Cancel
                        </Button>
                      </NavItem>
                    </Nav>
                  </PopoverBody>
                </Popover>
              </td>
            </tr>
            <tr>
              <td className="text-center text-muted"> NJ - A4827 </td>
              <td>
                <div className="widget-content p-0">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left flex2">
                      <div className="widget-heading text-danger">
                        34 Market St.
                      </div>
                      <div className="widget-subheading opacity-7">
                        Jacksonville, NJ 08518
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div className="widget-content p-0">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left mr-3">
                      <div className="widget-content-left">
                        <img
                          width={40}
                          className="rounded-circle"
                          src={avatar1}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="widget-content-left flex2">
                      <div className="widget-heading"> Ruben Tillman </div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="text-center text-warning">
                <span className="pr-2 opacity-6">
                  <FontAwesomeIcon icon={Icons.faBusinessTime} />
                </span>
                02 Feb
              </td>
              <td className="text-center">
                <div className="badge badge-success"> Post Closing </div>
              </td>
              <td
                className="text-center"
                style={{
                  width: '150px'
                }}
              >
                <Sparklines height={60} data={sampleData2}>
                  <SparklinesLine
                    style={{
                      strokeWidth: 3,
                      stroke: 'var(--success)',
                      fill: 'none'
                    }}
                  />
                </Sparklines>
              </td>
              <td className="text-center">
                <Button
                  bssize="sm"
                  color="primary"
                  id={'PopoverCustomT-2'}
                  onClick={this.togglePop2}
                >
                  View
                </Button>
                <Popover
                  className="popover-custom rm-pointers"
                  placement="auto"
                  isOpen={this.state.popoverOpen2}
                  target={'PopoverCustomT-2'}
                  toggle={this.togglePop2}
                >
                  <PopoverBody>
                    <div className="dropdown-menu-header">
                      <div
                        className={classnames(
                          'dropdown-menu-header-inner bg-danger'
                        )}
                      >
                        <div
                          className="menu-header-image"
                          style={{
                            backgroundImage: 'url(' + bg1 + ')'
                          }}
                        />
                        <div className="menu-header-content">
                          <h5 className="menu-header-title"> Settings </h5>
                          <h6 className="menu-header-subtitle">
                            Manage all of your options
                          </h6>
                        </div>
                      </div>
                    </div>
                    <Nav vertical>
                      <NavItem className="nav-item-header"> Activity </NavItem>
                      <NavItem>
                        <NavLink href="">
                          Chat
                          <div className="ml-auto badge badge-pill badge-info">
                            8
                          </div>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href=""> Recover Password </NavLink>
                      </NavItem>
                      <NavItem className="nav-item-divider" />
                      <NavItem className="nav-item-btn text-right">
                        <Button
                          bssize="sm"
                          className="btn-wide btn-shadow"
                          color="success"
                        >
                          Save
                        </Button>
                      </NavItem>
                    </Nav>
                  </PopoverBody>
                </Popover>
              </td>
            </tr>
            <tr>
              <td className="text-center text-muted"> NY - P9348 </td>
              <td>
                <div className="widget-content p-0">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left flex2">
                      <div className="widget-heading"> 558 Maple Street </div>
                      <div className="widget-subheading opacity-7">
                        Mapleville, NY 06784
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div className="widget-content p-0">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left">
                      <div className="widget-content-left">
                        <div className="avatar-wrapper avatar-wrapper-overlap">
                          <div
                            className="avatar-icon-wrapper avatar-icon-sm"
                            id="Avatar-1"
                          >
                            <div className="avatar-icon">
                              <img
                                width={40}
                                className="rounded-circle"
                                src={avatar1}
                                alt=""
                              />
                            </div>
                          </div>
                          <div
                            className="avatar-icon-wrapper avatar-icon-sm"
                            id="Avatar-2"
                          >
                            <div className="avatar-icon border-warning">
                              <img
                                width={40}
                                className="rounded-circle"
                                src={avatar2}
                                alt=""
                              />
                            </div>
                          </div>
                          <div
                            className="avatar-icon-wrapper avatar-icon-sm"
                            id="Avatar-3"
                          >
                            <div className="avatar-icon border-secondary">
                              <img
                                width={40}
                                className="rounded-circle"
                                src={avatar3}
                                alt=""
                              />
                            </div>
                          </div>
                          <div
                            className="avatar-icon-wrapper avatar-icon-sm"
                            id="Avatar-4"
                          >
                            <div className="avatar-icon">
                              <img
                                width={40}
                                className="rounded-circle"
                                src={avatar4}
                                alt=""
                              />
                            </div>
                          </div>
                          <div
                            className="avatar-icon-wrapper avatar-icon-sm"
                            id="Avatar-5"
                          >
                            <div className="avatar-icon border-secondary">
                              <img
                                width={40}
                                className="rounded-circle"
                                src={avatar5}
                                alt=""
                              />
                            </div>
                          </div>
                          <div
                            className="avatar-icon-wrapper avatar-icon-sm"
                            id="Avatar-6"
                          >
                            <div className="avatar-icon">
                              <img
                                width={40}
                                className="rounded-circle"
                                src={avatar6}
                                alt=""
                              />
                            </div>
                          </div>
                          <div
                            className="avatar-icon-wrapper avatar-icon-sm"
                            id="Avatar-7"
                          >
                            <div className="avatar-icon border-success">
                              <img
                                width={40}
                                className="rounded-circle"
                                src={avatar7}
                                alt=""
                              />
                            </div>
                          </div>
                          <div
                            className="avatar-icon-wrapper avatar-icon-sm"
                            id="Avatar-8"
                          >
                            <div className="avatar-icon">
                              <img
                                width={40}
                                className="rounded-circle"
                                src={avatar8}
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <UncontrolledTooltip placement="top" target={'Avatar-1'}>
                  John Doe
                </UncontrolledTooltip>
                <UncontrolledTooltip
                  className="tooltip-warning"
                  placement="top"
                  target={'Avatar-2'}
                >
                  Ruben Tillman
                </UncontrolledTooltip>
                <UncontrolledTooltip
                  className="tooltip-secondary"
                  placement="top"
                  target={'Avatar-3'}
                >
                  Vinnie Wag
                </UncontrolledTooltip>
                <UncontrolledTooltip placement="top" target={'Avatar-4'}>
                  Amy Dealmaker
                </UncontrolledTooltip>
                <UncontrolledTooltip
                  className="tooltip-secondary"
                  placement="top"
                  target={'Avatar-5'}
                >
                  Jessica Doe
                </UncontrolledTooltip>
                <UncontrolledTooltip placement="top" target={'Avatar-6'}>
                  John Doe
                </UncontrolledTooltip>
                <UncontrolledTooltip
                  className="tooltip-success"
                  placement="top"
                  target={'Avatar-7'}
                >
                  Sales Rainmaker
                </UncontrolledTooltip>
                <UncontrolledTooltip placement="top" target={'Avatar-8'}>
                  Robert Maple
                </UncontrolledTooltip>
              </td>
              <td className="text-center">
                <span className="pr-2 opacity-6">
                  <FontAwesomeIcon icon={Icons.faBusinessTime} />
                </span>
                12 Dec
              </td>
              <td className="text-center">
                <div className="badge badge-danger"> Closing Day </div>
              </td>
              <td
                className="text-center"
                style={{
                  width: '150px'
                }}
              >
                <Sparklines height={60} data={sampleData3}>
                  <SparklinesLine
                    style={{
                      strokeWidth: 3,
                      stroke: 'var(--danger)',
                      fill: 'none'
                    }}
                  />
                </Sparklines>
              </td>
              <td className="text-center">
                <Button
                  bssize="sm"
                  color="primary"
                  id={'PopoverCustomT-3'}
                  onClick={this.togglePop3}
                >
                  View
                </Button>
                <Popover
                  className="popover-custom rm-pointers"
                  placement="auto"
                  isOpen={this.state.popoverOpen3}
                  target={'PopoverCustomT-3'}
                  toggle={this.togglePop3}
                >
                  <PopoverBody>
                    <div className="dropdown-menu-header">
                      <div
                        className={classnames(
                          'dropdown-menu-header-inner bg-focus'
                        )}
                      >
                        <div
                          className="menu-header-image"
                          style={{
                            backgroundImage: 'url(' + bg1 + ')'
                          }}
                        />
                        <div className="menu-header-content">
                          <h5 className="menu-header-title"> Settings </h5>
                          <h6 className="menu-header-subtitle">
                            Manage all of your options
                          </h6>
                        </div>
                      </div>
                    </div>
                    <Nav vertical>
                      <NavItem className="nav-item-header"> Activity </NavItem>
                      <NavItem>
                        <NavLink href="">
                          Chat
                          <div className="ml-auto badge badge-pill badge-info">
                            8
                          </div>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href=""> Recover Password </NavLink>
                      </NavItem>
                      <NavItem className="nav-item-divider" />
                      <NavItem className="nav-item-btn text-center">
                        <Button
                          bssize="sm"
                          className="btn-wide btn-shadow"
                          color="danger"
                        >
                          Cancel
                        </Button>
                      </NavItem>
                    </Nav>
                  </PopoverBody>
                </Popover>
              </td>
            </tr>
            <tr>
              <td className="text-center text-muted"> NY - A0391 </td>
              <td>
                <div className="widget-content p-0">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left flex2">
                      <div className="widget-heading"> 197 Main Street </div>
                      <div className="widget-subheading opacity-7">
                        Mapleville, NY 06784
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div className="widget-content p-0">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left mr-3">
                      <div className="widget-content-left">
                        <img
                          width={40}
                          className="rounded-circle"
                          src={avatar4}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="widget-content-left flex2">
                      <div className="widget-heading"> Vinnie Wagstaff </div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="text-center">
                <span className="pr-2 opacity-6">
                  <FontAwesomeIcon icon={Icons.faBusinessTime} />
                </span>
                12 Dec
              </td>
              <td className="text-center">
                <div className="badge badge-info"> Searches Ordered </div>
              </td>
              <td
                className="text-center"
                style={{
                  width: '150px'
                }}
              >
                <Sparklines height={60} data={sampleData4}>
                  <SparklinesLine
                    style={{
                      strokeWidth: 3,
                      stroke: 'var(--info)',
                      fill: 'none'
                    }}
                  />
                </Sparklines>
              </td>
              <td className="text-center">
                <Button
                  bssize="sm"
                  color="primary"
                  id={'PopoverCustomT-4'}
                  onClick={this.togglePop4}
                >
                  View
                </Button>
                <Popover
                  className="popover-custom rm-pointers"
                  placement="auto"
                  isOpen={this.state.popoverOpen4}
                  target={'PopoverCustomT-4'}
                  toggle={this.togglePop4}
                >
                  <PopoverBody>
                    <div className="dropdown-menu-header">
                      <div
                        className={classnames(
                          'dropdown-menu-header-inner bg-focus'
                        )}
                      >
                        <div
                          className="menu-header-image"
                          style={{
                            backgroundImage: 'url(' + bg1 + ')'
                          }}
                        />
                        <div className="menu-header-content">
                          <h5 className="menu-header-title"> Settings </h5>
                          <h6 className="menu-header-subtitle">
                            Manage all of your options
                          </h6>
                        </div>
                      </div>
                    </div>
                    <Nav vertical>
                      <NavItem className="nav-item-header"> Activity </NavItem>
                      <NavItem>
                        <NavLink href="">
                          Chat
                          <div className="ml-auto badge badge-pill badge-info">
                            8
                          </div>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href=""> Recover Password </NavLink>
                      </NavItem>
                      <NavItem className="nav-item-divider" />
                      <NavItem className="nav-item-btn text-center">
                        <Button
                          bssize="sm"
                          className="btn-wide btn-shadow"
                          color="danger"
                        >
                          Cancel
                        </Button>
                      </NavItem>
                    </Nav>
                  </PopoverBody>
                </Popover>
              </td>
            </tr>
          </tbody>
        </Table>
        <CardFooter className="d-flex justify-content-between">
          <div> </div>
          <div className="d-flex align-items-center">
            <Button className="btn-wide" color="primary">
              Show More
            </Button>
            <Form inline className="d-inline-block ml-2">
              <FormGroup className="mb-0">
                <Input
                  type="select"
                  name="select"
                  bssize="sm"
                  id="exampleSelect1"
                >
                  <option> 10 </option> <option> 25 </option>
                  <option> 50 </option> <option> All </option>
                </Input>
              </FormGroup>
            </Form>
          </div>
          <Form inline>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="exampleEmail" className="mr-sm-2">
                Show Only:
              </Label>
              <Input type="select" name="select" id="exampleSelect2">
                <option> All Stages </option>
              </Input>
            </FormGroup>
          </Form>
        </CardFooter>
      </Card>
    );
  }
}
//route for elasticsearch engine ingestion