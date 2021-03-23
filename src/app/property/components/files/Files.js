import React, { useState, useEffect, Fragment } from 'react';
import { ListGroup } from 'reactstrap';
import { crud } from '../../../services/crud';
import { FileCategories } from '../../../../Pages/Property/services';
import FilterBar from './FilterBar';
import FileItem from './FileItem';
import AddFileModal from './AddFileModal';
//import { $store } from '../../../../index'; //rawi0713
import $modal from '../../../services/modal';
import StateHelper from '../../../services/stateHelper';
import $notify from '../../../services/notify';

const $files = crud('files');
const fs = new StateHelper();

const Files = props => {
  const [state, setState] = useState({
    files: [],
    filter: 'searches',
    fileMeta: {}
  });
  const { fileMeta, files, filter } = state;
  let newFileMeta;

  fs.useState(state, setState);

  const fileCategories = {
    ...FileCategories
    /* '.': 'Unsorted', */
    /* '*': 'All Files' */
  };

  const fetchFiles = async () => {
    let files = await $files.find({
      'context.propertyId': props.context.propertyId
    });

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
  };

  useEffect(() => {
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
    let bucketname = state.filter;
    $modal.confirm({
      title: 'Add Search File----',
      content: AddFileModal,
      bucketname: bucketname,
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
    return (
      <FileItem
        key={file._id}
        file={file}
        type="bool"
        idx={idx}
        localFolder={localFolder}
        //bucketname={fileCategories}
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
          Add File Search --
        </button>
      </div>
    </Fragment>
  );
};

export default Files;
