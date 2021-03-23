import React, { useState, useEffect,Fragment } from 'react';
import { Input, Label, Row, Col } from 'reactstrap';
import { FileTypes, FileCategories } from './FileCat';
import StateHelper from '../../../../../app/services/stateHelper';
//import { $store } from '../../../../index';
import { crud } from '../../../../../app/services/crud'
import $modal from '../../../../../app/services/modal';
import { StyledDropZone } from 'react-drop-zone';
import 'react-drop-zone/dist/styles.css';
//pdftron full capability review - 07/10 //post scan - components review 0818
const $files = crud('files');

const fileTypes = {
  '?': 'Select',
  ...FileTypes
};

const fileCategories = {
  '?': 'Select',
  ...FileCategories,
  '.': 'Unsorted'
};

const fs = new StateHelper();
const addFileWasabi = (file) => {
  let propertyIdFromURL = window.location.href.toString();
  var propertyIdFromURLArray = propertyIdFromURL.split('/');
  propertyIdFromURL =
    propertyIdFromURLArray[propertyIdFromURLArray.length - 1];
  
  let newbucket=sessionStorage.getItem('filefilter') //'bucketname' //this.props.bucket;
  let propid=sessionStorage.getItem('propId')
  let convid=sessionStorage.getItem('convId') 
  console.log('addFileWasabi bucketname',newbucket)
  var AWS = require('aws-sdk');
  var fs = require('fs');

  var accessKeyId = 'L26GKMZJINHR3RW5UHU3';
  var secretAccessKey = 'aBAsUDjceQzM5hmRetzJYSddhdvZWoANQoRaESNO';

  var wasabiEndpoint = new AWS.Endpoint('s3.wasabisys.com');
  var s3 = new AWS.S3({
    endpoint: wasabiEndpoint,
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
  });
  var params = {
    Bucket: 'b'+newbucket,
    Key: file.name.replace(/\s/g, ""),
    Body: file,
    ACL: 'public-read'
  };
 // console.log('addFileWasabi params',params)
  s3.upload(params, function(err, data) {
    if (err) {
      console.log('error in fax', data);
    }

    console.log('success');
    console.log(data);
    var ext = file.name.substr(file.name.length - 3);
   // let { id, username } = $store.getState().User.user.user
      this.$file = crud('files');
      // let ext = asset.name.slice(((asset.name.lastIndexOf('.') - 1) >>> 0) + 2);    
      
      let bucket=params.Bucket
      let fn = params.Key       
      let wasabilocation = `https://${bucket}.s3.wasabisys.com/${fn}`  
       let assetInfo = {
        
        title: file.name,  
        context: {             
          propertyId: propid,
          conversationId:convid          
        }, 
        meta: {
          fileName: file.name,
          fileType: ext,
          fileCategory: newbucket,
          wasabi: wasabilocation,
          //key: fn,
          bucket:bucket
        },

        draftable:{
          "identifier": " ",
          "identifierPath": " "
        },

         /* source: username, //this.state.message.sender || this.state.message.from,          */
                  paths: [ {
                              provider: 'mailfilemanager',
                              //assetId: asset.id,
                              path: propid + '/' + file.name, //this.state.info.context.propertyId + '/' + asset.name,
                              fileType: ext,
                              fileCategory: newbucket,
                              wasabi: wasabilocation,
                              key: file.name,
                              bucket:'b'+newbucket
                            }
                  ] 
       };
       this.$file.save(assetInfo)

   
  });  

}
const AddFileModal = props => {  

  const [state, setState] = useState({ fileName: 'New File',bucketname:props.bucketname,propertyId:props.propertyId,conversationId:props.conversationId,messageId:props.messageId });
  //const [bucketname, SetBucketname] = useState({...state,bucketname:props.bucketname});
  fs.useState(state, setState);  
  //console.log('AddFileModal props bucketname',state.bucketname,state.propertyId,state.conversationId)
  
  useEffect(() => {
    sessionStorage.setItem('filefilter', state.bucketname);
    sessionStorage.setItem('propId',state.propertyId)
    sessionStorage.setItem('convId',state.conversationId)
    sessionStorage.setItem('messageId',state.messageId)
    //console.log(JSON.parse(sessionStorage.getItem('filefilter')))
  });

  return (
    <Fragment>
      <div className="p-4">
        <Row className="mb-2">
          <Label for="filename" md={3} className={'text-left'}>
            Filename:
          </Label>
          <Col md={9}>
           {/*  <Input
              placeholder="File name"
              type="text"
              {...fs.model('fileName')}
            /> 
            onClick={() => {
                  props.addFile();
                }}
            */}
            <StyledDropZone 
            onDrop={addFileWasabi} 
           
            />
          </Col>
        </Row>

       {/*  <Row className={'mb-2'}>
          <Label for="type" md={3} className={'text-left'}>
            Type:
          </Label>
          <Col md={9}>
            <Input type="select" {...fs.model('fileType')}>
              {Object.keys(fileTypes).map(k => {
                return (
                  <option key={k} value={k === '?' ? '' : k}>
                    {fileTypes[k]}
                  </option>
                );
              })}
            </Input>
          </Col>
        </Row>

        <Row className="mb-2">
          <Label for="category" md={3} className={'text-left'}>
            Category:
          </Label>
          <Col md={9}>
            <Input type="select" {...fs.model('fileCategory')}>
              {Object.keys(fileCategories).map(k => {
                return (
                  <option key={k} value={k === '?' ? '' : k}>
                    {fileCategories[k]}
                  </option>
                );
              })}
            </Input>
          </Col>
        </Row>

        <Row className="mb-2">
          <Label for="source" md={3} className={'text-left'}>
            Source Person:
          </Label>
          <Col md={9} className="p-0">
            <PersonList {...fs.model('source')} />
          </Col>
        </Row> */}

        <Row className="mb-2">
          <Col md={12} className="text-right">
            <Col md={2} className="d-inline-flex justify-content-end">
              <button
                className="btn btn-primary"
                onClick={() => {
                  props.addFile();
                }}
              >
                {' '}
                Add File{' '}
              </button>
            </Col>
            <Col md={1} className="d-inline-flex">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  $modal.hideModal();
                }}
              >
                {' '}
                Cancel{' '}
              </button>
            </Col>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default AddFileModal;
