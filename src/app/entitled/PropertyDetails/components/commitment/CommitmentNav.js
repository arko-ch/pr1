import React, { useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { Library as Icons, FontAwesomeIcon } from '../../../app/icons/Icon';
import classnames from 'classnames';
import styled from 'styled-components';
import ExceptionCommitment from './ExceptionCommitment';
// import EndorsementCommitment from './EndorsementCommitment';
import ReqCommitmentHeader from './ReqCommitmentHeader';
import EndorsementCommitment from './EndorsementCommitment';

const Container = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 8px;
  margin-top: 20px;
  padding: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 45%;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
`;

const Simple = styled.button`
  background: #e3eaf7;
  border-radius: 5px 0px 0px 5px;
  color: #307df6;
  font-weight: 500;
  font-size: 15px;
  border: none;
  align-self: center;
  padding: 5px 10px;
`;

const Complex = styled.button`
  color: #656565;
  font-weight: 500;
  font-size: 15px;
  background: #f6f6f6;
  border-radius: 0px 5px 5px 0px;
  border: none;
  align-self: center;
  padding: 5px 10px;
`;

const CommitmentNav = ({
  dataReqCommitment,
  dataExcsCommitment,
  dataEndorseCommitment
}) => {
  const [activeTab, setActiveTab] = useState('1');
  const [postClose, setPostClose] = useState(false);
  const [postClose2, setPostClose2] = useState(false);

  const togglePostClose = () => setPostClose(!postClose);
  const togglePostClose2 = () => setPostClose2(!postClose2);

  const toggle = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  let tableClass = '';
  let tableClassmegrid = '';

  let postCloseButton;

  if (postClose) {
    tableClass += ' easy';
    tableClassmegrid += ' easy';
    postCloseButton = <Simple onClick={togglePostClose}>Simple</Simple>;
  } else {
    postCloseButton = <Simple onClick={togglePostClose}>Simple</Simple>;
  }

  let postCloseButton2;

  if (postClose2) {
    tableClass += ' detailed';
    tableClassmegrid += ' detailed';
    postCloseButton2 = <Complex onClick={togglePostClose2}>Complex</Complex>;
  } else {
    postCloseButton2 = <Complex onClick={togglePostClose2}>Complex</Complex>;
  }

  return (
    <Container>
      <div>
        <Nav
          style={{
            border: 'none'
          }}
          tabs
        >
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => {
                toggle('1');
              }}
            >
              Requirements(8)
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => {
                toggle('2');
              }}
            >
              Exceptions(20)
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '3' })}
              onClick={() => {
                toggle('3');
              }}
            >
              <FontAwesomeIcon icon={Icons.faStamp} />
              Endorsements
            </NavLink>
          </NavItem>
          <ButtonContainer>
            {postCloseButton}
            {postCloseButton2}
          </ButtonContainer>
        </Nav>

        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <ReqCommitmentHeader
              dataReqCommitment={dataReqCommitment}
              tableClass={tableClass}
            />
          </TabPane>
          <TabPane tabId="2">
            <ExceptionCommitment
              dataExcsCommitment={dataExcsCommitment}
              tableClass={tableClass}
            />
          </TabPane>
          <TabPane tabId="3">
            <EndorsementCommitment
              dataEndorseCommitment={dataEndorseCommitment}
              tableClass={tableClass}
            />
          </TabPane>
        </TabContent>
      </div>
    </Container>
  );
};

export default CommitmentNav;
