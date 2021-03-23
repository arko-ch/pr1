import React, { Component, Fragment, lazy } from "react";

import {
  Card,
  CardBody,
  CardHeader,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  UncontrolledButtonDropdown
} from "reactstrap";

import PerfectScrollbar from "react-perfect-scrollbar";

import { Library as Icons, FontAwesomeIcon } from "../icons";

import bg1 from "../../assets/architect/utils/images/dropdown-header/abstract2.jpg";

const Chart = lazy(() => import('react-apexcharts'));

export default class TransferStageAnalysis extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          stacked: true
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        stroke: {
          width: 1,
          colors: ["#fff"]
        },
        xaxis: {
          categories: [
            "NJ-Z9382",
            "NY-P9348",
            "NJ-A4827",
            "NJ-Z9382",
            "NY-P9348",
            "NJ-A4827"
          ],
          labels: {
            formatter: function(val) {
              return val + " days";
            }
          }
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return val + " days";
            }
          },
          x: {
            formatter: function(val) {
              return val;
            }
          }
        },
        fill: {
          opacity: 1
        },

        legend: {
          position: "top",
          horizontalAlign: "left",
          offsetX: 40,
          offsetY: 25
        }
      },
      series: [
        {
          name: "Searches Ordered",
          data: [44, 55, 41, 37, 22, 43]
        },
        {
          name: "Post-Closing",
          data: [53, 32, 33, 52, 13, 43]
        },
        {
          name: "Pending Deal",
          data: [12, 17, 11, 9, 15, 11]
        },
        {
          name: "Closing Day",
          data: [9, 7, 5, 8, 6, 9]
        }
      ]
    };
  }

  render() {
    return (
      <Card className="mb-3">
        <CardHeader className="rm-border">
          <div>
            <h5 className="menu-header-title text-capitalize text-primary">
              Transfer Stage Analysis
            </h5>
          </div>
          <div className="btn-actions-pane-right text-capitalize">
            <UncontrolledButtonDropdown>
              <DropdownToggle
                className="btn-wide mr-1"
                size="sm"
                outline
                color="focus"
              >
                Sort By & nbsp; <FontAwesomeIcon icon={Icons.faBars} />
              </DropdownToggle>
              <DropdownMenu right className="dropdown-menu-lg rm-pointers">
                <div className="dropdown-menu-header">
                  <div className="dropdown-menu-header-inner bg-primary">
                    <div
                      className="menu-header-image"
                      style={{
                        backgroundImage: "url(" + bg1 + ")"
                      }}
                    />
                    <div className="menu-header-content">
                      <div>
                        <h5 className="menu-header-title"> Settings </h5>
                        <h6 className="menu-header-subtitle">
                          Example Dropdown Menu
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="scroll-area-xs">
                  <PerfectScrollbar>
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
                      <NavItem className="nav-item-header">
                        My Account
                      </NavItem>
                      <NavItem>
                        <NavLink href="">
                          Settings
                          <div className="ml-auto badge badge-success">
                            New
                          </div>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="">
                          Messages
                          <div className="ml-auto badge badge-warning">
                            512
                          </div>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href=""> Logs </NavLink>
                      </NavItem>
                    </Nav>
                  </PerfectScrollbar>
                </div>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          </div>
        </CardHeader>
        <CardBody className="p-0">
          <div className="widget-chart-wrapper widget-chart-wrapper-lg opacity-10 m-0">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              height="350"
            />
          </div>
        </CardBody>
      </Card>
    );
  }
}

