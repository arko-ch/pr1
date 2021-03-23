import React, { Component } from 'react';
import { Button } from 'reactstrap';
//import download from '../Components/download';
import FileItem from './FileItems';
import { Library as Icons, FontAwesomeIcon } from 'app/icons' //'../../../app/icons';
//pdftron full capability review - 07/10
export default class FileInd extends Component {
  constructor(props) {
    super(props);
    this.getFile = this.getFile.bind(this);
    this.state = {
      fileName: this.props.fileName,
      fileType: this.props.fileType
    };
    this.icon = this.icon.bind(this);
    this.color = this.color.bind(this);
  }

  icon() {
    //  console.log("filename filename", this.props.fileName.toString());
    if (this.props.fileName.toString().includes('xls')) {
      return Icons.faFileExcel;
    }
    if (this.props.fileName.toString().includes('pdf')) {
      return Icons.faFilePdf;
    }
    if (this.props.fileName.toString().includes('doc')) {
      return Icons.faFileAlt;
    }
    if (this.props.fileName.toString().includes('zip')) {
      return Icons.faFileArchive;
    }
    return Icons.faFileAlt;
  }

  color() {
    if (this.props.fileName.toString().includes('pdf')) {
      return 'text-danger';
    }
    if (this.props.fileName.toString().includes('doc')) {
      return 'text-primary';
    }
    if (this.props.fileName.toString().includes('zip')) {
      return 'text-warning';
    }
    if (this.props.fileName.toString().includes('xls')) {
      return 'text-success';
    }
  }

  getFile() {
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
      Bucket: this.props.bucket,
      Key: this.props.fileName
    };
    let fName = this.state.fileName,
      fType = this.state.fileType;

    console.log('file type', fType);
    s3.getObject(params, function(err, data) {
      let downloadBlob = function(data, fileName, mimeType) {
        var blob, url;
        blob = new Blob([data], {
          type: mimeType
        });
        url = window.URL.createObjectURL(blob);
        downloadURL(url, fileName);
        setTimeout(function() {
          return window.URL.revokeObjectURL(url);
        }, 1000);
      };

      let downloadURL = function(data, fileName) {
        var a;
        a = document.createElement('a');
        a.href = data;
        a.download = fileName;
        document.body.appendChild(a);
        a.style = 'display: none';
        a.click();
        a.remove();
      };

      if (!err) {
        console.log('getFile() function', data);
        downloadBlob(data.Body, fName, 'application/octet-stream');
      } else {
        console.log(err); // an error occurred
      }
    });
  }

  render() {
    console.log('indexingzzzz', this.props.myindex);
    return (
      
      <div
        onClick={() => {
          this.getFile();
          this.props.toggleFile();
        }}
      >
        <FileItem
          fileId={10000 + parseInt(this.props.myindex)}
          toggleFile={this.props.toggleFile}
          ready={true}
          icon={this.icon()}
          fileName={this.props.fileName}
          title={this.props.fileName}
          color={this.color()}
          opacity={'opacity-6'}
        />
      </div>
    );
  }
}
