import React from 'react';
import { Row, Col } from 'reactstrap';
import {
  TabPanel,
  StyledTabs,
  a11yProps,
  StyledTab,
  useStyles
} from './TabStyles';
import profileOne from '../../../assets/images/profileOne.svg';
import profileTwo from '../../../assets/images/profileTwo.svg';
import profileThree from '../../../assets/images/profileThree.svg';

//import EmailTabs from "./EmailTabs"

export default function AssignEmailAreaRightPan() {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <div className="container_right">
        <Row>
          <Col md="9">
            <div>
              <div className="ticket_name">
                St. Utica, Pennsylvania 578673517 W. Gray
              </div>
              <div className="ticket_address">
                42 Main Street, New York, NY, 46 Main Street, New York, NY{' '}
                <span className="right_address_count">+2</span>
              </div>
            </div>
          </Col>
          <Col md="3">
            <div class="avatars">
              <span class="avatar">
                <img src={profileOne} />
              </span>
              <span class="avatar">
                <img src={profileTwo} />
              </span>
              <span class="avatar">
                <img src={profileThree} />
              </span>
              <span class="avatar">
                <div class="text_circle">+2</div>
              </span>
            </div>
          </Col>
        </Row>
      </div>
      <div className="tab_container_right">
        <Row>
          <Col>
            {/* <EmailTabs value={value} setValue={setValue}/> */}
            <div className={classes.root}>
              <div className={classes.emailRighttab}>
                <StyledTabs
                  value={value}
                  onChange={handleChange}
                  aria-label="styled tabs"
                >
                  <StyledTab
                    label="Overview"
                    className={classes.width_right}
                    {...a11yProps(0)}
                  />
                  <StyledTab
                    label="Commitment"
                    className={classes.width_right}
                    {...a11yProps(1)}
                  />
                  <StyledTab
                    label="Recording"
                    className={classes.width_right}
                    {...a11yProps(2)}
                  />
                  <StyledTab
                    label="Policy"
                    className={classes.width_right}
                    {...a11yProps(3)}
                  />
                </StyledTabs>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="right_line"></div>
          </Col>
        </Row>
      </div>

      <Row>
        <Col>
          <TabPanel value={value} index={0}>
            Overview Content
          </TabPanel>
          <TabPanel value={value} index={1}>
            Commitment Content
          </TabPanel>
          <TabPanel value={value} index={2}>
            Recording Content
          </TabPanel>
          <TabPanel value={value} index={3}>
            Policy Content
          </TabPanel>
        </Col>
      </Row>
    </div>
  );
}
