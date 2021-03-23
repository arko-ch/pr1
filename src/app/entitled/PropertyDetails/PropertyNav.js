import React, { useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import styled from 'styled-components';
import classnames from 'classnames';
import { Library as Icons, FontAwesomeIcon } from './../app/icons/Icon';
import PropertyAddress from './components/address/PropertyAddress';
import PropertyOverview from './PropertyOverview';
import CommitmentNav from './components/commitment/CommitmentNav';

const Container = styled.div`
  background: #ffeae7;
  border: 1px solid #ffd0c8;
  box-sizing: border-box;
  border-radius: 6px;
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const NavContainer = styled.div`
  background: #fff;
  border: none;
`;

const Status = styled.div`
  padding: 10px;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 133%;
  color: #393939;
`;

const PropertyNav = ({
  dataOverview,
  dataUnderwriter,
  dataReqCommitment,
  dataUtility,
  dataHoa,
  dataMortgage,
  dataTransaction,
  dataExcsCommitment,
  dataEndorseCommitment
}) => {
  const [activeTab, setActiveTab] = useState('1');
  const [showDescription, setShowDescription] = useState(false);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const showToggle = () => setShowDescription(!showDescription);

  return (
    <>
      <PropertyAddress dataOverview={dataOverview} />
      <Container>
        <Status>
          <FontAwesomeIcon
            style={{ color: 'red', marginRight: '3px' }}
            icon={Icons.faEngineWarning}
          />
          This is a <b>City of Newark</b> file, you may have issues retrieving
          the tax data in a timely manner."
        </Status>
      </Container>

      <NavContainer>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => {
                toggle('1');
              }}
            >
              Overview
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
              style={
                showDescription ? { color: '#307DF6' } : { color: '#999999' }
              }
              className={classnames({ active: activeTab === '3' })}
              onClick={() => {
                toggle('3');
                showToggle();
              }}
            >
              Closing{' '}
              <FontAwesomeIcon
                icon={showDescription ? Icons.faEye : Icons.faEyeSlash}
              />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '4' })}
              onClick={() => {
                toggle('4');
              }}
            >
              Recording
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '5' })}
              onClick={() => {
                toggle('5');
              }}
            >
              Policy
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <PropertyOverview
              dataOverview={dataOverview}
              dataUnderwriter={dataUnderwriter}
              dataUtility={dataUtility}
              dataHoa={dataHoa}
              dataMortgage={dataMortgage}
              dataTransaction={dataTransaction}
            />
          </TabPane>
          <TabPane tabId="2">
            <CommitmentNav
              dataReqCommitment={dataReqCommitment}
              dataExcsCommitment={dataExcsCommitment}
              dataEndorseCommitment={dataEndorseCommitment}
            />
          </TabPane>
          <TabPane tabId="3">Closing</TabPane>
          <TabPane tabId="4">Recording</TabPane>
          <TabPane tabId="5">Policy</TabPane>
        </TabContent>
      </NavContainer>
    </>
  );
};

export default PropertyNav;
