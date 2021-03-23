import React, { Fragment, useState, useEffect } from 'react';
import { Library as Icons, FontAwesomeIcon } from '../app/icons/Icon';
import styled from 'styled-components';
import { crud } from '../services/crud';
import config from '../app/config/config';
import PropertyNav from './PropertyNav';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Header = styled.h5`
  color: #656565;
`;

const Tools = styled.div`
  display: flex;
  flex-direction: flex-end;
  flex-wrap: wrap;
`;

const Highlighter = styled.div`
  margin-right: 10px;
`;

const Audit = styled(Highlighter)``;

const ToolName = styled.h5`
  color: ${props => (props.primary ? '#F64E30' : '#8C9FFF')};
`;

const $property = crud('properties');

const PropertyIndex = () => {
  const [propertyOverviewData, setPropertyOverviewData] = useState([]);
  const [underwriterData, setUnderWriterData] = useState([]);
  const [reqCommitmentData, setReqCommitmentData] = useState([]);
  const [excsCommitmentData, setExcsCommitmentData] = useState([]);
  const [endorseCommitmentData, setEndorseCommitmentData] = useState([]);
  const [utilitityInfoData, setUtilitityInfoData] = useState([]);
  const [hoaData, setHoaData] = useState([]);
  const [mortgageData, setMortgageData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);

  const fetchOverviewData = async () => {
    const res = await $property.findOne(`5fbcc8d7d3f724062c0c8e77`);

    return res.data;
  };

  const fetchUnderwriterData = () => {
    fetch(
      config.returnEnv() + `underwriters?propertyId=5fbcc8d7d3f724062c0c8e77`
    )
      .then(res => res.json())
      .then(dataUnderwriter => setUnderWriterData(dataUnderwriter));
  };

  const fetchCommitmentRequirementData = () => {
    fetch(
      config.returnEnv() +
        `propertycommitmentreqs?propertyId=5fbcc8d7d3f724062c0c8e77`
    )
      .then(res => res.json())
      .then(dataReqCommitment => setReqCommitmentData(dataReqCommitment));
  };

  const fetchCommitmentExceptionData = () => {
    fetch(
      config.returnEnv() +
        `propertycommitmentexcs?propertyId=5fbcc8d7d3f724062c0c8e77`
    )
      .then(res => res.json())
      .then(dataExcsCommitment => setExcsCommitmentData(dataExcsCommitment));
  };

  const fetchCommitmentEndorsementData = () => {
    fetch(
      config.returnEnv() +
        `propertycommitmentends?propertyId=5fbcc8d7d3f724062c0c8e77`
    )
      .then(res => res.json())
      .then(dataEndorseCommitment =>
        setEndorseCommitmentData(dataEndorseCommitment)
      );
  };

  const fetchUtilityData = () => {
    fetch(
      config.returnEnv() +
        `propertyutilinfos?propertyId=5fbcc8d7d3f724062c0c8e77`
    )
      .then(res => res.json())
      .then(dataUtility => setUtilitityInfoData(dataUtility));
  };

  const fetchHoaData = () => {
    fetch(
      config.returnEnv() + `propertyhoas?propertyId=5fbcc8d7d3f724062c0c8e77`
    )
      .then(res => res.json())
      .then(dataHoa => setHoaData(dataHoa));
  };
  const fetchMortgageData = () => {
    fetch(
      config.returnEnv() +
        `propertymortgages?propertyId=5fbcc8d7d3f724062c0c8e77`
    )
      .then(res => res.json())
      .then(dataMortgage => setMortgageData(dataMortgage));
  };

  const fetchTransactionData = () => {
    fetch(
      config.returnEnv() +
        `propertypaymentinstruments?propertyId=5fbcc8d7d3f724062c0c8e77`
    )
      .then(res => res.json())
      .then(dataTransaction => setTransactionData(dataTransaction));
  };

  useEffect(() => {
    fetchUnderwriterData();
    fetchCommitmentRequirementData();
    fetchCommitmentExceptionData();
    fetchCommitmentEndorsementData();
    fetchUtilityData();
    fetchHoaData();
    fetchMortgageData();
    fetchTransactionData();
    const addressData = fetchOverviewData();

    addressData.then(data => setPropertyOverviewData(data));
  }, []);

  return (
    <Fragment>
      <Container>
        <Header primary>Property Details</Header>
        <Tools>
          <ToolName primary>
            <Highlighter>
              <FontAwesomeIcon icon={Icons.faHighlighter} />
              Highlight
            </Highlighter>
          </ToolName>
          <ToolName>
            <Audit>
              <FontAwesomeIcon icon={Icons.faUserSecret} />
              Audit
            </Audit>
          </ToolName>
          <FontAwesomeIcon icon={Icons.faCommentAltLines} />
        </Tools>
      </Container>
      <PropertyNav
        dataOverview={propertyOverviewData}
        dataUnderwriter={underwriterData}
        dataReqCommitment={reqCommitmentData}
        dataExcsCommitment={excsCommitmentData}
        dataEndorseCommitment={endorseCommitmentData}
        dataUtility={utilitityInfoData}
        dataHoa={hoaData}
        dataMortgage={mortgageData}
        dataTransaction={transactionData}
      />
    </Fragment>
  );
};

export default PropertyIndex;
