import React, { useState } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Collapse,
  Col
} from 'reactstrap';
import classnames from 'classnames';
import {
  TemplatesContainer,
  TemplateItemsContainer
} from '../StyledComponents';
import { Library as Icons, FontAwesomeIcon } from '../../app/icons';

const Templates = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [isOpen, setIsOpen] = useState(false);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <TemplatesContainer>
      <Nav tabs className="template-nav-tabs">
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
            }}
          >
            All
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2');
            }}
          >
            Commitment
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => {
              toggle('1');
            }}
          >
            Closing
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => {
              toggle('1');
            }}
          >
            Recording
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '5' })}
            onClick={() => {
              toggle('1');
            }}
          >
            Policy
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <TemplateItemsContainer>
            <Col className="p-0" md={6}>
              {!isOpen && (
                <>
                  <div className="template-name">Template name 1</div>
                  <div className="template-description">
                    Thank you for your title order, please see link below to
                    fill out our forms and complete your order
                  </div>
                </>
              )}
            </Col>
            <Col className="p-0 align-right" md={6}>
              <FontAwesomeIcon
                icon={Icons.faPaperclip}
                className="template-icons"
              />
              <FontAwesomeIcon
                icon={Icons.faListAlt}
                className="template-icons"
              />
              {!isOpen && (
                <FontAwesomeIcon
                  onClick={() => setIsOpen(true)}
                  icon={Icons.faAngleDown}
                  className="template-icons"
                />
              )}
              {isOpen && (
                <FontAwesomeIcon
                  onClick={() => setIsOpen(false)}
                  icon={Icons.faAngleUp}
                  className="template-icons"
                />
              )}
            </Col>
            <Collapse isOpen={isOpen}>
              <div className="template-name">Template name 1</div>
              <div className="template-description-open">
                Thank you for your title order, please see link below to fill
                out our forms and complete your order
              </div>
            </Collapse>
          </TemplateItemsContainer>
          <TemplateItemsContainer>
            <Col className="p-0" md={6}>
              {!isOpen && (
                <>
                  <div className="template-name">Template name 1</div>
                  <div className="template-description"> Hi %username%</div>
                  <div className="template-description">
                    Newhouse encouraged the audience of entrepreneurs to stay
                    determined and disciplined, and to choose one thing to focus
                    on each day.
                  </div>
                </>
              )}
            </Col>
            <Col className="p-0 align-right" md={6}>
              <FontAwesomeIcon
                icon={Icons.faPaperclip}
                className="template-icons"
              />
              <FontAwesomeIcon
                icon={Icons.faListAlt}
                className="template-icons"
              />
              {!isOpen && (
                <FontAwesomeIcon
                  onClick={() => setIsOpen(true)}
                  icon={Icons.faAngleDown}
                  className="template-icons"
                />
              )}
              {isOpen && (
                <FontAwesomeIcon
                  onClick={() => setIsOpen(false)}
                  icon={Icons.faAngleUp}
                  className="template-icons"
                />
              )}
            </Col>
            <Collapse isOpen={isOpen}>
              <div className="template-name">Template name 1</div>
              <div className="template-description-open"> Hi %username%</div>
              <div className="template-description-open">
                Newhouse encouraged the audience of entrepreneurs to stay
                determined and disciplined, and to choose one thing to focus on
                each day.
              </div>
            </Collapse>
          </TemplateItemsContainer>
          <TemplateItemsContainer>
            <Col className="p-0" md={6}>
              {!isOpen && (
                <>
                  <div className="template-name">Template name 3</div>
                  <div className="template-description">
                    Thank you for your title order, please see link below to
                    fill out our forms and complete your order
                  </div>
                </>
              )}
            </Col>
            <Col className="p-0 align-right" md={6}>
              <FontAwesomeIcon
                icon={Icons.faPaperclip}
                className="template-icons"
              />
              <FontAwesomeIcon
                icon={Icons.faListAlt}
                className="template-icons"
              />
              {!isOpen && (
                <FontAwesomeIcon
                  onClick={() => setIsOpen(true)}
                  icon={Icons.faAngleDown}
                  className="template-icons"
                />
              )}
              {isOpen && (
                <FontAwesomeIcon
                  onClick={() => setIsOpen(false)}
                  icon={Icons.faAngleUp}
                  className="template-icons"
                />
              )}
            </Col>
            <Collapse isOpen={isOpen}>
              <div className="template-name">Template name 3</div>
              <div className="template-description-open">
                Thank you for your title order, please see link below to fill
                out our forms and complete your order
              </div>
            </Collapse>
          </TemplateItemsContainer>
        </TabPane>
        <TabPane tabId="2">Create templates for commitment</TabPane>
      </TabContent>
    </TemplatesContainer>
  );
};

export default Templates;
