import React, { useState, useEffect, Fragment } from 'react';
import { ListGroup } from 'reactstrap';
import { crud } from '../../../../../app/services/crud';
import { FileCategories } from './FileCat';
import FilterBar from './FilterBar';
import FileItem from './FileItem';
import AddFileModal from './AddFileModal';
import $modal from '../../../../../app/services/modal';
import StateHelper from '../../../../../app/services/stateHelper';
import $notify from '../../../../../app/services/notify';
//pdftron - prep 05/23; //07/09 deployment pre full capability
const $files = crud('files');
const fs = new StateHelper();

const Files = props => {
  const [state, setState] = useState({
    files: [],
    filter: 'unsorted',
    fileMeta: {}
  });
  const { fileMeta, files, filter } = state;
  // console.log('Files state', state);
  let newFileMeta;

  fs.useState(state, setState);

  const fileCategories = {
    ...FileCategories
    /* '.': 'Unsorted', */
    /* '*': 'All Files' */
  };

  const fetchFiles = async () => {
    let files = await $files.find({
      'or:context.conversationId': props.context,
      'or:context.propertyId': props.contextpropertyid
      //'or:properties.address_regex': propertiesaddy
    });
    //console.log('fetchfiles..',files,props.context,props.contextpropertyid)
    // console.log('files component.. fetching files', files);
    //console.log('files component.. fetching files',files,props.context,props.contextpropertyid)
    if (!files) {
      return;
    }

    Object.keys(fileCategories).forEach(k => {
      let matches = (files.data || []).filter(t => {
        if (k === '.') {
          return (
            !t.meta.fileCategory ||
            t.meta.fileCategory === '' ||
            t.meta.fileCategory === '.'
          );
        }

        return t.meta.fileCategory === k;
      });

      newFileMeta = fileMeta[k] = {
        badge: matches.length
      };

      setState({ ...state, fileMeta: newFileMeta });
    });

    newFileMeta = fileMeta['*'] = {
      badge: files.data.length
    };

    setState({ ...state, fileMeta: { ...fileMeta, newFileMeta } });

    if (files) {
      setState({
        ...state,
        files: files.data
      });
    }
    //    console.log('state filejs',state)
  };

  useEffect(() => {
    //console.log('props.isOpen', props.isOpen);
    fetchFiles();
  }, []);

  const addFile = async params => {
    /*  //console.log('addFileModal fileMeta',fileMeta)
    let { id, name } = $store.getState().User.user.user;
    const files = await $files.save({
      title: params.fileName || 'New File',
      context: props.context,
      meta: {
        ...params
      },
      owner: {
        id,
        name
      }
    }); */

    $notify.notify('File search saved');
    fetchFiles();
    $modal.hideModal();
  };

  const addFileModal = () => {
    //console.log('addFileModal',state.filter)
    alert('addfile modal');
    let bucketname = state.filter;
    $modal.confirm({
      title: 'Add Search File',
      content: AddFileModal,
      bucketname: bucketname,
      conversationId: props.context,
      propertyId: props.contextpropertyid,
      messageId: props.messageId,
      closeText: null,
      size: 'xl',
      addFile: addFile
    });
  };

  let filteredFiles = (files || []).filter(t => {
    if (filter === '*') {
      return true;
    }
    if (filter === '.') {
      return (
        !t.meta.fileCategory ||
        t.meta.fileCategory === '' ||
        t.meta.fileCategory === '.'
      );
    }
    return t.meta.fileCategory === filter;
  });

  let localFolder = props.context.propertyId;
  let fileItems = filteredFiles.map((file, idx) => {
    console.log('localfolder---', file);
    return (
      <FileItem
        key={file._id}
        file={file}
        type="bool"
        idx={idx}
        localFolder={localFolder}
        bucketname={fileCategories}
      />
    );
  });
  return (
    <Fragment>
      <FilterBar
        className="mb-4"
        meta={fileMeta}
        options={fileCategories}
        {...fs.model('filter')}
      />
      <ListGroup className="todo-list-wrapper" flush key={`filter-${filter}`}>
        {fileItems}
      </ListGroup>
      <div className="p-2">
        <button
          className="btn btn-primary mt-2"
          onClick={() => {
            //addFileModal();
            addFileModal();
          }}
        >
          Add File Search
        </button>
      </div>
    </Fragment>
  );
};

export default Files;
