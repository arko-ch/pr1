import React, { Fragment, useState, useEffect } from 'react';
import PropertyAvatar from './PropertyAvatar';
import avatar1 from '../../../../../assets/architect/utils/images/avatars/1.jpg';
import avatar2 from '../../../../../assets/architect/utils/images/avatars/2.jpg';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Address = styled.h5`
  flex: 4;
`;

const ShowAddress = styled.span`
  color: #393939;
  font-weight: 600;
  font-size: 15px;
`;

const AddressButton = styled.button`
  color: #8e8c8c;
  font-size: 13px;
  background: #f3f3f3;
  border-radius: 6px;
  border: none;
  margin-left: 10px;
  padding: 5px;
`;

const PropertyAddress = ({ dataOverview }) => {
  const [splitAddress, setSplitAddress] = useState(false);

  const toggle = () => setSplitAddress(!splitAddress);

  let propertyaddress;
  propertyaddress = dataOverview.properties;
  const propertiesRendered = (propertyaddress || []).map(
    (dataOverview, idx) => {
      return (
        <Fragment key={idx}>
          <Container>
            <Address>{dataOverview.address}</Address>
            <PropertyAvatar avatar={avatar1} />
            <PropertyAvatar avatar={avatar2} />
          </Container>
          {splitAddress ? (
            <ShowAddress>{dataOverview.address.slice(0, 20)}</ShowAddress>
          ) : (
            <ShowAddress>{dataOverview.address}</ShowAddress>
          )}
          <AddressButton onClick={toggle}>Show Less</AddressButton>
        </Fragment>
      );
    }
  );

  return <Fragment>{propertiesRendered}</Fragment>;
};

export default PropertyAddress;
