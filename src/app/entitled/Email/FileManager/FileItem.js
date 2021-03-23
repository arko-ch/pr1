import React, { useState, Fragment } from 'react';
import {
  UploadIconContainer,
  IconContainer,
  UploadItemsContainer
} from '../EmailStyledComponents';
import { Library as Icons, FontAwesomeIcon } from 'app/icons/Icon';
//import EditableTaskTitle from 'app/property/components/todolist/EditableTaskTitle';
//import Journal from '../todolist/Journal';
//import FileList from './FileList';
import FileList from 'app/property/components/files/FileList';
import { crud } from 'app/services/crud';
import $notify from 'app/services/notify';
//import { $store } from '../../../../index';
import StateHelper from 'app/services/stateHelper';
import { StyledDropZone } from 'react-drop-zone';
import 'react-drop-zone/dist/styles.css';

const fs = new StateHelper();
const $files = crud('files');

const FileItem = props => {
  const [state, setState] = useState({
    ...props.file,
    shareOpen: false,
    showUpload: false,
    showMore: false
  });

  fs.useState(state, setState);

  const fileIcons = {
    xls: {
      icon: Icons.faFileExcel,
      color: 'text-success'
    },
    doc: {
      icon: Icons.faFileAlt
    },
    doc: {
      icon: Icons.faFileAlt
    },
    pdf: {
      icon: Icons.faFilePdf,
      color: 'text-danger'
    },
    img: {
      icon: Icons.faFileImage
    },
    zip: {
      icon: Icons.faFileArchive,
      color: 'text-warning'
    }
  };

  const toggleShare = () => {
    setState({
      ...state,
      shareOpen: !state.shareOpen
    });
  };

  const save = () => {
    $files.save(state).then(() => {
      $notify.notify('File search saved');
    });
    console.log('state', state);
  };

  const del = () => {
    $files.erase(state._id).then(() => {
      $notify.notify('File search Removed');
      //props.fetchFiles()
      console.log('props fileitem', props);
    });
    // console.log('state',state)
  };

  const toggleComplete = () => {
    save();
  };

  const onChange = evt => {
    //  console.log('FileItem onchange EVT',evt)
    setState({
      ...state,
      ...evt.target.value
    });
    // console.log('FileItem onchange EVT',evt.target.value)
    del();
  };

  const onBlur = async () => {
    save();
  };

  const addJournalEntry = () => {
    //let { id, name } = $store.getState().User.user.user;
    setState({
      ...state,
      journal: [
        ...(state.journal || []),
        {
          text: state.journalEntry,
          author: {
            /*  id,
            name */
          },
          date: new Date()
        }
      ],
      journalEntry: ''
    });

    setTimeout(() => {
      save();
    });
  };

  const onUpload = evt => {
    let files = evt.target.value.map(p => {
      return {
        provider: 'local',
        path: p
      };
    });

    // make unique
    let existingPaths = state.paths || [];
    let paths = files.filter(fa => {
      return (
        existingPaths.filter(fb => {
          return fa.path === fb.path;
        }).length === 0
      );
    });

    onChange({
      target: {
        value: {
          showUpload: false,
          paths: [...existingPaths, ...paths]
        }
      }
    });
  };

  const addFile = (file, text) => {
    console.log('add file params file', file);
    let propertyIdFromURL = window.location.href.toString();
    var propertyIdFromURLArray = propertyIdFromURL.split('/');
    propertyIdFromURL =
      propertyIdFromURLArray[propertyIdFromURLArray.length - 1];

    //console.log('file props',props.file.meta.fileCategory)
    //setState({ files: [...state, file] });
    let newbucket = 'b' + props.file.meta.fileCategory; //'5e1581224dbeb25124fcaec3_commitment' //this.props.bucket;
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
      Bucket: newbucket,
      Key: file.name, //.replace(/\s/g, ""),
      Body: file,
      ACL: 'public-read'
    };

    const s = s3.upload(params, function(err, data) {
      if (err) {
        console.log('error in callback');
        console.log(err);
      } else {
        console.log('success in fileitem');
        console.log(data);
        var ext = file.name.substr(file.name.length - 3);
        //let { id, username } = $store.getState().User.user.user
        this.$file = crud('files');
        // let ext = asset.name.slice(((asset.name.lastIndexOf('.') - 1) >>> 0) + 2);
        let sprops = {};
        sprops = s.singlePart.response.request;
        let sprops2 = sprops.response;
        let bucket = sprops2.request.params.Bucket;
        let fn = sprops2.request.params.Key;
        let wasabilocation = `https://${bucket}.s3.wasabisys.com/${fn}`;
        let assetInfo = {
          title: file.name,
          context: {
            propertyId: propertyIdFromURL
          },
          meta: {
            fileName: file.name,
            fileType: ext,
            fileCategory: props.file.meta.fileCategory,
            wasabi: wasabilocation,
            //key: fn,
            bucket: bucket
          },

          draftable: {
            identifier: ' ',
            identifierPath: ' '
          }

          /*  source: username, //this.state.message.sender || this.state.message.from,         
                      paths: [
                                {
                                  provider: 'propertysearchpage',
                                  //assetId: asset.id,
                                  path: propertyIdFromURL + '/' + file.name, //this.state.info.context.propertyId + '/' + asset.name,
                                  fileType: ext,
                                  fileCategory: props.file.meta.fileCategory,
                                  wasabi: wasabilocation,
                                  key: file.name,
                                  bucket:newbucket
                                }
                              ] */
        };
        this.$file.save(assetInfo);
      }
    });
  };

  let source = {
    id: null,
    label: null
  };

  if (state.meta && state.meta.source) {
    source = state.meta.source;
  }

  let ext = state.meta && state.meta.fileType;
  if (ext === 'docx') ext = 'doc';
  let icon = fileIcons[ext] || fileIcons['doc'];
  let popId = `pop-${state._id}`;

  return (
    <UploadItemsContainer>
      <UploadIconContainer>
        <FontAwesomeIcon icon={icon.icon} />
      </UploadIconContainer>

      {/* <EditableTaskTitle {...fs.model('title')} fs={fs} onBlur={onBlur} /> */}

      <div className="float-right upload-file-icons mt-1 mr-2">
        <IconContainer fontSize={16}>
          <span>
            <FontAwesomeIcon icon={Icons.faPencil} />
          </span>
        </IconContainer>
        <IconContainer fontSize={16}>
          <span>
            <FontAwesomeIcon icon={Icons.faCopy} />
          </span>
        </IconContainer>
      </div>
    </UploadItemsContainer>
  );
};

export default FileItem;
