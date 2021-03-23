import React, { Fragment, useEffect, useState } from 'react';
import { Library as Icons, FontAwesomeIcon } from '../../../app/icons/Icon';
import styled from 'styled-components';
import { Table } from 'reactstrap';

const Container = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  margin-top: 20px;
  padding-left: 20px;
  padding-top: 10px;
`;

const Header = styled.tr`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #8a8a8a;
`;

const Content = styled.tr`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #393939;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const DetailButton = styled.select`
  background: #ffffff;
  border: none;
  margin-bottom: 10px;
  margin-right: 10px;
  padding: 0;
`;

const AddUserButton = styled.button`
  background: #ffffff;
  border: none;
  margin-bottom: 10px;
  margin-right: 10px;
  padding: 0;
`;

const Parties = ({ dataOverview }) => {
  const generalData = (dataOverview.general || []).map(data => (
    <td key={data.label}>{data.label}</td>
  ));

  const generalAttorneyData = (dataOverview.generalAttorney || []).map(data => (
    <td key={data.label}>{data.label}</td>
  ));

  const generalRealtorData = (dataOverview.generalRealtor || []).map(data => (
    <td key={data.label}>{data.label}</td>
  ));

  const generalSurveyorData = (dataOverview.generalSurveyor || []).map(data => (
    <td key={data.label}>{data.label}</td>
  ));

  const buyerData = (dataOverview.buyer || []).map(data => (
    <td key={data.id}>{data.label}</td>
  ));

  const buyerAttorneyData = (dataOverview.buyerAttorney || []).map(data => (
    <td key={data.id}>{data.label}</td>
  ));

  const buyerRealtorData = (dataOverview.buyerRealtor || []).map(data => (
    <td key={data.id}>{data.label}</td>
  ));

  const buyerSurveyorData = (dataOverview.buyerSurveyor || []).map(data => (
    <td key={data.id}>{data.label}</td>
  ));

  const sellerData = (dataOverview.seller || []).map(data => (
    <td key={data.id}>{data.label}</td>
  ));

  const sellerAttorneyData = (dataOverview.sellerAttorney || []).map(data => (
    <td key={data.id}>{data.label}</td>
  ));

  const sellerRealtorData = (dataOverview.sellerRealtor || []).map(data => (
    <td key={data.id}>{data.label}</td>
  ));

  const sellerSurveyorData = (dataOverview.sellerSurveyor || []).map(data => (
    <td key={data.id}>{data.label}</td>
  ));

  return (
    <Fragment>
      <Container>
        <Table borderless responsive>
          <tbody>
            <Header>
              <th>General</th>
              <th>Buyer</th>
              <th>Seller</th>
            </Header>
            <Content>
              {generalData}
              {buyerData}
              {sellerData}
            </Content>
          </tbody>
          <tbody>
            <Header>
              <th>Attorney</th>
              <th>Attorney</th>
              <th>Attorney</th>
            </Header>
            <Content>
              {generalAttorneyData}
              {buyerAttorneyData}
              {sellerAttorneyData}
            </Content>
          </tbody>
          <tbody>
            <Header>
              <th>Realtor</th>
              <th>Realtor</th>
              <th>Realtor</th>
            </Header>
            <Content>
              {generalRealtorData}
              {buyerRealtorData}
              {sellerRealtorData}
            </Content>
          </tbody>
          <tbody>
            <Header>
              <th>Surveyor</th>
              <th>Surveyor</th>
              <th>Surveyor</th>
            </Header>
            <Content>
              {generalSurveyorData}
              {buyerSurveyorData}
              {sellerSurveyorData}
            </Content>
          </tbody>
        </Table>
        <ButtonContainer>
          <AddUserButton>
            <FontAwesomeIcon icon={Icons.faUserPlus} />
          </AddUserButton>
          <DetailButton>
            <option>test</option>
            <option></option>
          </DetailButton>
        </ButtonContainer>
      </Container>
    </Fragment>
  );
};

export default Parties;
