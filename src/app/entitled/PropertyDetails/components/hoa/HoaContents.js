import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';

const Content = styled.input`
  background: #ffffff;
  border: 1px solid #e7e7e7;
  border-radius: 6px;
  width: 100%;
  padding: 3px 0 3px 10px;
`;

const PropertyDropdown = styled.select`
  background: #ffffff;
  border: 1px solid #e7e7e7;
  border-radius: 6px;
  width: auto;
  padding: 3px 0 3px 10px;
`;

const HoaRow = styled.tr`
  text-align: center;
`;

const HoaContents = ({ dataHoa }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    setStudents(dataHoa);
  }, [dataHoa]);

  const renderedData = students.map((data, key) => {
    return (
      <HoaRow
        key={key}
        className={data.editing ? 'editing' : ''}
        onClick={() => {
          const student = students.map(item => ({
            ...item,
            editing: data.editing && item === data
          }));
          student[key].editing = true;

          setStudents(student);
        }}
      >
        <td>
          {data.editing ? (
            <PropertyDropdown>
              <option value="" disabled>
                Select Type
              </option>
              <option value="One">One</option>
              <option value="Two">Two</option>
              <option value="Three">Three</option>
              <option value="Four"> Four </option>
              <option value="Five"> Five </option>
              <option value="Five"> Six </option>
            </PropertyDropdown>
          ) : (
            <span>{data.property}</span>
          )}
        </td>
        <td>
          {data.editing ? (
            <Content type="number" size="sm" placeholder="Enter" />
          ) : (
            <span>{data.startupFees}</span>
          )}
        </td>
        <td>
          {data.editing ? (
            <Content type="number" size="sm" placeholder="Enter" />
          ) : (
            <span>{data.regularDues}</span>
          )}
        </td>
        <td>
          {data.editing ? (
            <Content type="number" size="sm" placeholder="Enter" />
          ) : (
            <span>{data.transferFees}</span>
          )}
        </td>

        <td>
          {data.editing ? (
            <Content type="number" size="sm" placeholder="Enter" />
          ) : (
            <span>{data.documentFees}</span>
          )}
        </td>
        <td>
          {data.editing ? (
            <Content type="number" size="sm" placeholder="Enter" />
          ) : (
            <span>{data.processingFees}</span>
          )}
        </td>
        <td>
          <Content type="number" size="sm" placeholder="0" />
        </td>
      </HoaRow>
    );
  });

  return <Fragment>{renderedData}</Fragment>;
};

export default HoaContents;
