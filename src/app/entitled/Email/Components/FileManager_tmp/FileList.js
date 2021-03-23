import React, { Fragment, Component } from 'react';
import config from '../../../../../src/config/config'  //  '../../config/config';
import { crud } from '../../../../../src/app/services/crud' //'../../../app/services/crud';
import { StyledDropZone } from 'react-drop-zone';
import Swal from 'sweetalert2'
import PdfViewer from '../../../../app/property/components/files/PdfViewer';
//pdftron - prep 05/23
const $files = crud('files');

class FileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attachmentId:this.props.id,
      files: [...(this.props.files || [])],
      showUpload: false      
    };

    
    this.$config = config;        
    
  }

  componentDidMount(){
  
  }
  remove(idx) {
    let files = [...this.state.files];
    let file = files[idx];
    files.splice(idx, 1);
    this.setState({
      files: files
    });
  //  this.$storage.remove({ files: [file.path] });

    setTimeout(() => {
      if (this.props.onChange) {
        this.props.onChange({
          target: {
            value: this.state
          }
        });
      }
    });
  }

 
  getFile(b,f,t) {
    var pbucket=b;
    var pfname=f;
    var pftype=t;

    console.log(b,f,t)
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
      Bucket: pbucket, //his.props.bucket,
      Key: pfname.replace(/\s/g, "") //this.props.fileName
    };
    let fName = pfname, //this.state.fileName,
      fType = pftype //this.state.fileType;

    //console.log('file type', fType);
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
      //  console.log('getFile() function', data);
        downloadBlob(data.Body, fName, 'application/octet-stream');
      } else {
        console.log(err); // an error occurred
      }
    });
  }

  render() {
    const  addFile = (file, text) => {
      //console.log('add file params file',this.props.files[0])
        let wasabi_left_url = this.props.files[0].wasabi
        let wasabi_left_display_name = this.props.files[0].key
        let wasabi_left_extn = this.props.files[0].key.slice(((this.props.files[0].key.lastIndexOf('.') - 1) >>> 0) + 2) 
        let fileId= this.props.id._id
        //console.log('add file params file',this.props.files[0],this.props.id._id)
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
        console.log('filname befor params',file.name)
        var params = {
          Bucket: 'draftable',
          Key: file.name.replace(/\s/g, ""),
          Body: file,
          ACL: 'public-read'
        };
    
        const s= s3.upload(params, function(err, data) {
          if (err) {
            console.log('error in callback');
            console.log(err);
          }
          else{
            console.log('success in FILELIST next source_urlchecking');
            console.log(data); 
            let wasabidatalocation = data.Location.replace(/\s/g, "")
            let wasabidatakey= data.Key
            const requestOptions = {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                'Authorization': "Token fa025b7dc66b54c007c02f1db71ce2a6"      
              },
              body: JSON.stringify({ 
              //  identifier: "example-identifier",          
              public:true,
                left: {
                  source_url: wasabi_left_url,
                  display_name: wasabi_left_display_name,
                  file_type:wasabi_left_extn
                },
                right: {

                  source_url: data.Location.replace(/\s/g, ""),
                  display_name:  data.Key,
                  file_type: data.Key.slice(((data.Key.lastIndexOf('.') - 1) >>> 0) + 2) 
                }
              
              })
              
          
          };

          fetch("https://api.draftable.com/v1/comparisons",requestOptions)         
          .then(response => response.json())        
  
           .then(data => 
            {              
              //console.log('data na and state files',filesId)
              let draftable = {
                _id: fileId, 
               
                draftable:{
                  left: {
                    source_url: wasabi_left_url,
                    display_name: wasabi_left_display_name,
                    file_type:wasabi_left_extn
                  },
                  right: {
                    source_url:  wasabidatalocation.replace(/\s/g, ""), 
                    display_name: wasabidatakey,
                    file_type:"pdf"
                  },
                  identifier: data.identifier,
                  identifierPath: `https://api.draftable.com/v1/comparisons/viewer/hNkPix-test/${data.identifier}`
                }             
      
               };
               //console.log('fileSave',draftable,data.identifier)
               this.$file = crud('files');    
               this.$file.save(draftable)
              let viewid=data.identifier
               Swal.fire({
                title: '<strong>Document <u>Successfully processed</u></strong>',
                icon: 'info',
                html:                                
                  `<a target='_blank' href="//api.draftable.com/v1/comparisons/viewer/hNkPix-test/${viewid}">View</a>`,
                showCloseButton: true,
               // showCancelButton: true,
                focusConfirm: false,
                confirmButtonText:
                  '<i class="fa fa-thumbs-up"></i> Exit',              
              })
            });     

          }      
        });
      };
      let bucketname;
    
    let files = this.state.files.map((f, idx) => {
      console.log('files schema and this. props',f,this.props);      
      let draftableIdentifier= this.props.id.draftable.identifierPath
      return (
        
        <li key={`file-${idx}`}>
          {f.path}
          <button
            className="btn btn-link"
            onClick={() => {
              this.remove(idx);
            }}
          >
            delete
          </button>
        {/*   <button
            className="btn btn-link"
            onClick={() => {
             // this.view(idx);
             this.getFile(f.bucket,f.key,f.filetype)
            }}
          >
            view
          </button>        "https://docs.google.com/viewerng/viewer?url=" "http://docs.google.com/gview?url=" */}
         {/*   <a target='_blank' href={"https://drive.google.com/viewerng/viewer?embedded=false&url=" + f.wasabi}> view</a>  */}
       
         
         {/*  <input  
          type="file"
          onChange={ (e) => this.handleCompare(f,e,filesId) }          
          />      */}
        
        {
            (f.fileType === 'pdf') ? 
            <PdfViewer wasabi={f.wasabi}/>
            :            
             <button className="btn btn-link"  
             onClick={() => { this.getFile(f.bucket,f.key,f.filetype)}} 
           >
             view
           </button> 

          }          
          <div>
          <StyledDropZone
                  //hidden={this.state.coley}
                  onDrop={addFile} 
                  wasabibucket={f.bucket}                 
                  label={'Click or Drop a file here to compare'}
                />

          </div>
           
        {/*   <ImportFromFileBodyComponent/> */}
         

         {draftableIdentifier === 'undefined' ? null :
          <span style={{ color: '#1e8bff' }}>
          
          <a target='_blank' href={draftableIdentifier}> View Comparison</a>
          </span> } 

        </li>
      );
    });
    return (
      <Fragment>
        <ul>{files}</ul>
      </Fragment>
    );
  }
}
export default FileList;