import React, { useState, useEffect, Fragment } from 'react';
import {
  ListGroup,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from 'reactstrap';
import { crud } from '../../../services/crud';
import FileItem from './FileItem';
import AddFileModal from '../Components/FileManager/AddFileModal';
import $modal from '../../../services/modal';
import StateHelper from '../../../services/stateHelper';
import $notify from '../../../services/notify';
//pdftron - prep 05/23; //07/09 deployment pre full capability
const $files = crud('files');
const fs = new StateHelper();

export const FileCategories = {
  unsorted: 'Unsorted',
  searches: 'Searches',
  commitment: 'Commitment',
  payoffinvoices: 'Financial',
  policy: 'Policy',
  others: 'Post-close'
};

const FileManager = props => {
  const [activeTab, setActiveTab] = useState(0);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [state, setState] = useState({
    files: [],
    filter: 'unsorted',
    fileMeta: {}
  });
  const { fileMeta, files, filter } = state;
  let newFileMeta;

  fs.useState(state, setState);

  const fileCategories = {
    ...FileCategories
  };

  const fetchFiles = async () => {
    let files = await $files.find({
      'or:context.conversationId': props.context,
      'or:context.propertyId': props.contextpropertyid
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
    console.log('files >>>>', t);

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

  const handleChangeTab = (name, idx) => {
    toggle(idx);
    setState({ ...state, filter: name });
  };

  let options = Object.keys(fileCategories).map((opt, idx) => {
    let meta = (fileMeta || {})[opt] || {};
    return (
      <NavItem key={`filter-${idx}`}>
        <NavLink
          className={`email-file-manager-tabs ${activeTab === idx &&
            'active-tab'}`}
          onClick={() => {
            handleChangeTab(opt, idx);
          }}
        >
          {fileCategories[opt]}
          {meta.badge > 0 && (
            <div className="email-file-manager-tab-badge ml-1">
              ({meta.badge})
            </div>
          )}
        </NavLink>
      </NavItem>
    );
  });

  return (
    <div className="email-file-manager">
      <Nav tabs>{options}</Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId={0}>
          <Row>
            <Col sm="12">{fileItems}</Col>
          </Row>
        </TabPane>
        <TabPane tabId={1}>
          <Row>
            <Col sm="12">{fileItems}</Col>
          </Row>
        </TabPane>
      </TabContent>

      <div className="p-0">
        <button
          className="email-file-manager-add-files mt-2"
          onClick={() => {
            addFileModal();
          }}
        >
          + Add new files
        </button>
      </div>
    </div>
  );
};

export default FileManager;
