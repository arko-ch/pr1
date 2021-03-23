import React, { Component, Fragment } from 'react';
import { Row, Col, Collapse, CardBody, Card } from 'reactstrap';
import { StyledDropZone } from 'react-drop-zone';
import 'react-drop-zone/dist/styles.css';
//pdftron full capability review - 07/10
export default class FileListWasabi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUrl: '',
      isFilesHidden: false,
      coley: false,
      files: [
        {
          name: 'state.xls',
          type: 'state.xls'
        },
        {
          name: 'state.xls',
          type: 'state.xls'
        }
      ]
    };
    this.refreshData = this.refreshData.bind(this);
    this.addFile = this.addFile.bind(this);
    this.updateURL = this.updateURL.bind(this);
  }

  componentDidMount() {
    this.refreshData();
  }

  getURL() {
    return this.state.fileUrl;
  }

  updateURL() {
    this.setState({
      fileUrl:
        'https://s3.wasabisys.com/faxobjects/' +
        this.state.files[this.state.files.length - 1].name
    });
  }

  refreshData() {
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

  /*   var createbucketName = 'faxobjects';
    s3.createBucket({ Bucket: createbucketName }, function(err, data) {
      if (!err) {
        console.log('create bucket for fax', data); // successfull response
      } else {
        console.log('create bucket for fax', err); // an error occurred
      }
    }); */

    var params = {
      Bucket: 'faxobjects'
    };
    let filesNew = [];
    s3.listObjectsV2(params, function(err, data) {
      if (!err) {
        data.Contents.forEach(function(element) {
          console.log('fax object list', element);

          filesNew.push({
            name: element.Key,
            type: element.Key.slice(-3)
          });
        });
      } else {
        console.log('element of get error', err); // an error ocurred
      }
    });
    this.setState({
      files: filesNew
    });
  }

  addFile(file, text) {
    this.setState({ files: [...this.state.files, file] });
    let newbucket = this.props.bucket;
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
      Bucket: 'faxobjects',
      Key: file.name.replace(/\s/g, ""),
      Body: file,
      ACL: 'public-read'
    };
    let LocationURL = '';
    s3.upload(params, function(err, data) {
      if (err) {
        console.log('error in fax', data);
      }
      console.log('success in fax', data.Location);
      // this.setState({
      //   fileUrl : data.Location
      // })
    });

    this.updateURL();

    this.props.fileListUpdate(this.getURL());
  }

  render() {
    console.log('props of fax file list', this.props);
    console.log('file URL state', this.state);
    const getUploadParams = () => {
      return { url: 'https://httpbin.org/post' };
    };

    const handleChangeStatus = ({ meta }, status) => {
      console.log(status, meta);
    };

    const handleSubmit = (files, allFiles) => {
      console.log(files.map(f => f.meta));
      allFiles.forEach(f => f.remove());
    };

    console.log('uploadbtn', this.props.uploadBtn);
    return (
      <Fragment>
        <div>
          <Card>
            <CardBody>
              <StyledDropZone hidden={this.state.coley} onDrop={this.addFile} />
            </CardBody>
          </Card>

          {/* <Row hidden={this.state.isFilesHidden}>
            {this.state.files.map((file, index) => (
              <Col md={3}>
                <FileInd
                  toggleFile={this.props.toggleFile}
                  myindex={index}
                  bucket={this.props.bucket}
                  fileName={file.name}
                  fileType={file.type}
                />
              </Col>
            ))}
          </Row> */}
        </div>
      </Fragment>
    );
  }
}
