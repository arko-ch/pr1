import React, { Component, Fragment } from "react";

import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";

import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Button,
  Card,
  CardFooter,
  UncontrolledButtonDropdown,
  DropdownToggle,
  CardHeader
} from "reactstrap";
//route for elasticsearch engine ingestion
import { Library as Icons, FontAwesomeIcon, Ionicon } from "../icons";


class Activity extends Component {

  render() {
    return (
      <Card className="card-hover-shadow-2x mb-3">
        <CardHeader>
          <div> Recent Activity </div>
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
        <div
          className="scroll-area-md"
          style={{
            height: "318px"
          }}
        >
          <PerfectScrollbar>
            <div className="p-3">
              <VerticalTimeline
                layout="1-column"
                className="vertical-without-time"
              >
                <VerticalTimelineElement
                  className="vertical-timeline-item"
                  icon={
                    <i className="badge badge-dot badge-dot-xl badge-success"></i>
                  }
                >
                  <h4 className="timeline-title"> All Hands Meeting </h4>
                  <p>
                    Lorem ipsum dolor sic amet, today at
                    <a href=""> 12: 00 PM </a>
                  </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="vertical-timeline-item"
                  icon={
                    <i className="badge badge-dot badge-dot-xl badge-warning"></i>
                  }
                >
                  <p>
                    Another meeting today, at
                    <b className="text-danger"> 12: 00 PM </b>
                  </p>
                  <p>
                    Yet another one, at
                    <span className="text-success"> 15: 00 PM </span>
                  </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="vertical-timeline-item"
                  icon={
                    <i className="badge badge-dot badge-dot-xl badge-danger"></i>
                  }
                >
                  <h4 className="timeline-title">
                    Build the production release
                  </h4>
                  <p>
                    Lorem ipsum dolor sit amit, consectetur eiusmdd tempor
                    incididunt ut labore et dolore magna elit enim at minim
                    veniam quis nostrud
                  </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="vertical-timeline-item"
                  icon={
                    <i className="badge badge-dot badge-dot-xl badge-primary"></i>
                  }
                >
                  <h4 className="timeline-title text-success">
                    Something not important
                  </h4>
                  <p>
                    Lorem ipsum dolor sit amit, consectetur elit enim at minim
                    veniam quis nostrud
                  </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="vertical-timeline-item"
                  icon={
                    <i className="badge badge-dot badge-dot-xl badge-success"></i>
                  }
                >
                  <h4 className="timeline-title"> All Hands Meeting </h4>
                  <p>
                    Lorem ipsum dolor sic amet, today at
                    <a href=""> 12: 00 PM </a>
                  </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="vertical-timeline-item"
                  icon={
                    <i className="badge badge-dot badge-dot-xl badge-warning"></i>
                  }
                >
                  <p>
                    Another meeting today, at
                    <b className="text-danger"> 12: 00 PM </b>
                  </p>
                  <p>
                    Yet another one, at
                    <span className="text-success"> 15: 00 PM </span>
                  </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="vertical-timeline-item"
                  icon={
                    <i className="badge badge-dot badge-dot-xl badge-danger"></i>
                  }
                >
                  <h4 className="timeline-title">
                    Build the production release
                  </h4>
                  <p>
                    Lorem ipsum dolor sit amit, consectetur eiusmdd tempor
                    incididunt ut labore et dolore magna elit enim at minim
                    veniam quis nostrud
                  </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="vertical-timeline-item"
                  icon={
                    <i className="badge badge-dot badge-dot-xl badge-primary"></i>
                  }
                >
                  <h4 className="timeline-title text-success">
                    Something not important
                  </h4>
                  <p>
                    Lorem ipsum dolor sit amit, consectetur elit enim at minim
                    veniam quis nostrud
                  </p>
                </VerticalTimelineElement>
              </VerticalTimeline>
            </div>
          </PerfectScrollbar>
        </div>
        <CardFooter className="d-block text-center">
          <Button className="btn-shadow btn-wide btn-pill" color="focus">
            <div className="badge badge-dot badge-dot-lg badge-warning badge-pulse">
              Badge
            </div>
            View All Activity
          </Button>
        </CardFooter>
      </Card>
    );
  }
}

export default Activity;
//route for elasticsearch engine ingestion
//possible placeholder for reactivesearch
