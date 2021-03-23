import React, { Fragment } from 'react';

const MortgageContent = ({ dataMortgage }) => {
  const renderedData = dataMortgage.map((data, index) => (
    <tr key={index}>
      <td>{data.property}</td>
      <td>{data.salePrice}</td>
      <td>{data.ownerInsurance}</td>
      <td>{data.loanNumber}</td>
      <td>{data.policy}</td>
    </tr>
  ));

  return <Fragment>{renderedData}</Fragment>;
};

export default MortgageContent;
