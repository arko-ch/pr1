import React, { Fragment } from 'react';
import styled from 'styled-components';

const Content = styled.select`
  background: #ffffff;
  border: 1px solid #e7e7e7;
  border-radius: 6px;
  /* width: auto; */
  width: ${props => (props.primary ? '110%' : '125%')};
  padding: 3px 0 3px 10px;
  margin: 5px;
`;

const DateContent = styled.input`
  background: #ffffff;
  border: 1px solid #e7e7e7;
  border-radius: 6px;
  width: 90%;
  padding: 3px 0 3px 10px;
  margin: 5px;
`;

const UtilityRow = styled.tr`
  text-align: center;
`;

const UtilityContents = ({ dataUtility }) => {
  const renderedData = dataUtility.map((data, index) => {
    return (
      <UtilityRow key={index}>
        <td>
          <Content size="sm" type="select" primary>
            <option value="" disabled>
              Select Type
            </option>
            <option value="One">{data.property}</option>
            <option value="Two">Two</option>
            <option value="Three">Three</option>
            <option value="Four"> Four </option>
            <option value="Five"> Five </option>
            <option value="Five"> Six </option>
          </Content>
        </td>
        <td>
          <Content size="sm" type="select">
            <option value="" disabled>
              Select Type
            </option>
            <option value="Municipal">{data.water}</option>
            <option value="Unknown">Unknown</option>
            <option value="Private">Private</option>
            <option value="Well"> Well </option>
          </Content>
        </td>
        <td>
          <Content size="sm">
            <option value="" disabled>
              Select Type
            </option>
            <option value="Septic">{data.sewer}</option>
            <option value="Unknown">Unknown</option>
            <option value="Municipal">Municipal</option>
          </Content>
          {/* <Content type='text' size='sm' placeholder='Enter' /> */}
        </td>
        <td>
          <Content size="sm" type="select">
            <option value="" disabled>
              Select Type
            </option>
            <option value="Done">{data.finalreading}</option>
            <option value="Unknown">Unknown</option>
            <option value="Not Required">Not Required</option>
            <option value="Not Scheduled">Not Scheduled</option>
            <option value="Scheduled">Scheduled</option>
          </Content>
          {/* <Content type='text' size='sm' placeholder='Enter' /> */}
        </td>
        <td>
          <Content size="sm" type="select">
            <option value="" disabled>
              Select Type
            </option>
            <option value="Seller">{data.frparty}</option>
            <option value="Seller Realtor">Seller Realtor</option>
            <option value="Seller Attorney">Seller Attorney</option>
            <option value="Agency">Agency</option>
          </Content>
          {/* <Content type='text' size='sm' placeholder='Enter' /> */}
        </td>
        <td>
          <DateContent size="sm" type="date" />
        </td>
      </UtilityRow>
    );
  });

  return <Fragment>{renderedData}</Fragment>;
};

export default UtilityContents;
