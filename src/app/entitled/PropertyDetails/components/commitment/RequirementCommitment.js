import React, { Fragment, useState, useEffect } from 'react';
import config from 'app/entitled/app/config/config';
import { ObjectId } from 'bson';
import styled from 'styled-components';

const PropertySelect = styled.select`
  background: #f6f6f6;
  border-radius: 5px;
  border: none;
  width: auto;
  padding: 5px 10px;
`;

const Content = styled.input`
  background: #ffffff;
  border: 1px solid #e7e7e7;
  border-radius: 6px;
  width: 100%;
  padding: 3px 0 3px 10px;
`;
const PropertyRow = styled.tr`
  font-weight: 500;
  font-size: 13px;
  color: #393939;
  text-align: center;
`;

const AddDeleteContainer = styled.div`
  display: flex;
`;

const AddButton = styled.button`
  margin-right: 5px;
  background-color: #28a745;
  color: #ffff;
  padding: 4px 8px;
  border-radius: 0.2rem;
`;

const RequirementCommitment = ({ dataReqCommitment }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    setStudents(dataReqCommitment);
  }, [dataReqCommitment]);

  const addRow = async () => {
    const propertyIdFromURL = '5fbcc8d7d3f724062c0c8e77';
    const bsonid = new ObjectId();
    let jsonbody = {};
    jsonbody = {
      _id: bsonid.toString(),
      propertyId: propertyIdFromURL.toString(),
      details: '',
      edit: '',
      code: '',
      instrument: '',
      oplp: '',
      modify: '',
      changes: '',
      note: ''
    };
    console.log(JSON.stringify(jsonbody));
    await fetch(config.returnEnv() + `propertycommitmentreqs`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonbody)
    });
    setStudents([...students, jsonbody]);
    console.log('students state ->', students);
  };

  const renderedData = students.map((data, key) => {
    return (
      <Fragment>
        <PropertyRow
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
          {data.editing ? (
            <td>
              <AddDeleteContainer>
                <AddButton onClick={addRow}>+</AddButton>
                <PropertySelect>
                  <option>One</option>
                  <option>Two</option>
                  <option>Three</option>
                  <option>Four</option>
                </PropertySelect>
              </AddDeleteContainer>
            </td>
          ) : (
            <span>{data.property}</span>
          )}
          <td>
            {data.editing ? (
              <Content type="text" />
            ) : (
              <span>{data.rownum}</span>
            )}
          </td>
          <td>
            {data.editing ? (
              <textarea defaultValue={data.details} />
            ) : (
              <span>{data.details}</span>
            )}
          </td>
          <td>
            {data.editing ? <Content type="text" /> : <span>{data.code}</span>}
          </td>
          <td>
            {data.editing ? (
              <Content type="text" />
            ) : (
              <span>{data.instrument}</span>
            )}
          </td>
          <td>
            {data.editing ? <Content type="text" /> : <span>{data.oplp}</span>}
          </td>
          <td>
            {data.editing ? <Content type="text" /> : <span>{data.note}</span>}
          </td>
        </PropertyRow>
        <tr className={'editing explanation easyTr'}>
          <td className={'easyDesc' ? ' col02' : 'col02'} colSpan="10">
            <span>{data.easyDesc}</span>
          </td>
        </tr>
        <tr className={'editing explanation detailedTr'}>
          <td className={'detailDesc' ? ' col02' : 'col02'} colSpan="10">
            <span>{data.detailDesc}</span>
          </td>
        </tr>
      </Fragment>
    );
  });

  return <Fragment>{renderedData}</Fragment>;
};

export default RequirementCommitment;
