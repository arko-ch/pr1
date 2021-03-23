import React, { Fragment, PureComponent, lazy } from 'react';
import { Collapse, Card, CardBody, Button } from 'reactstrap';
// const PropertySelect = lazy(() => import('../Property/Modals/PropertySelect'));
import cache from '../../../app/services/cache'; //'../../app/services/cache';
import PropertySelect from './PropertySelect'; //'../Property/Modals/PropertySelect';
import Loader from 'react-loaders';
import { Library as Icons, FontAwesomeIcon } from '../app/icons'; //../../app/icons';
import modal from '../../../app/services/modal'; //'../../app/services/modal';
import { crud } from '../../../app/services/crud'; //'../../app/services/crud';
import FileManager from './FileManager';
import events from '../../../app/services/events'; //'../../app/services/events';
import openSocket from 'socket.io-client';
import config from '../app/config/config'; //'../../../src/config/config';
import Swal from 'sweetalert2';
import {
  EmailButtonLink,
  EmailConversationContainer,
  LightBlueBUtton,
  EmailBtnTheme,
  EmailStrengthText,
  EmailStrengthBarGray,
  EmailStrengthBarGold,
  EmailBarsContainer,
  ConversationBadge
} from './StyledComponents';
import EmailInput from './EmailInput';
import { TrackingContext } from 'treacker';

import Files from '../../entitled/Email/Components/FileManager/Files'; //'./Components/FileManager/Files';
import ReplyAll from './ReplyAll';
// import Files from '../../../Pages/Mailbox/Components/FileManager/Files';
//const socket = openSocket('http://dev.settlementapp99.com');
const socket = openSocket(config.returnEnv());
const axios = require('axios');

const AWS = require('aws-sdk');
const accessKeyId = 'L26GKMZJINHR3RW5UHU3';
const secretAccessKey = 'aBAsUDjceQzM5hmRetzJYSddhdvZWoANQoRaESNO';

const wasabiEndpoint = new AWS.Endpoint('s3.wasabisys.com');
const s3 = new AWS.S3({
  endpoint: wasabiEndpoint,
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey
});
const subreply = 'subreply';
export default class Conversation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      wasabilocation: '',
      message: {},
      ...(props || {}),
      info: null,
      fileCategory: '',
      onetimewasabi: false,
      pulse: false,
      isOpen: false, //this.props.isOpen
      activeReply: false,
      activeReplyAll: false,
      subreply: 'sub'
    };

    this.$conv = crud('conversations');
    this.$property = crud('properties');
    this.$modal = modal;
    this.$root = events;
    this.onPropertySelect = this.onPropertySelect.bind(this);
    this.onAssetUpdate = this.onAssetUpdate.bind(this);
    this.onAssetUpdateTransfer = this.onAssetUpdateTransfer.bind(this);
    this.saveFile = this.saveFile.bind(this);
    this.fetchConvMsg = this.fetchConvMsg.bind(this);
    this.wasabicheckfetchAttachments = this.wasabicheckfetchAttachments.bind(
      this
    );
    this.wasabifetchAttachments = this.wasabifetchAttachments.bind(this);
    this.transferFiles = this.transferFiles.bind(this);
    this.toggle = this.toggle.bind(this);
    
    /* socket.on('food_ready', res =>
      this.setState({ commentsockets: res.mailid })
    );
 */
    //socket.on("food_ready", () => this.setState(prevState => ({pulse: !prevState.pulse})));
    //this.setState({pulse: true}));
    //this.setState({pulse: true}));
    /* 
    this.setState(prevState => ({
      check: !prevState.check
    })); */
  }

  componentDidMount() {
    localStorage.removeItem('subreply', 'subreply');
    localStorage.setItem('subreply', subreply);
    console.log('didmount storage key', subreply);
    this.$root.$on(
      `property-selected-${this.state.message.conversationId}`,
      this.onPropertySelect
    );
    this.$root.$on(
      `asset-updated-${this.state.message.conversationId}`,
      this.onAssetUpdate
    );

    //transfer 0427
    this.$root.$on(
      `asset-transfer-updated-${this.state.message.conversationId}`,
      this.onAssetUpdateTransfer
    );

    this.fetchConversationInfo();
  }

  componentWillUnmount() {
    this.$root.$off(
      `property-selected-${this.state.message.conversationId}`,
      this.onPropertySelect
    );
    this.$root.$off(
      `asset-updated-${this.state.message.conversationId}`,
      this.onAssetUpdate
    );
  /*   socket.off('food_ready', res =>
      this.setState({ commentsockets: res.mailid })
    ); */
  }

  //  UNSAFE_componentWillReceiveProps(nextProps)
  UNSAFE_componentWillUpdate(nextProps) {
    if (
      !this.state.message ||
      (nextProps.message && nextProps.message.id !== this.state.message.id)
    ) {
      this.setState({
        message: nextProps.message
      });
    }
  }

  toggle() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  async selectPropertyTransaction(
    e,
    currentlyAssigned,
    currentlyAssignedRefno
  ) {
    //console.log('e,currentlyAssigned,currentlyAssignedRefno',currentlyAssigned,currentlyAssignedRefno)
    //https://graph.microsoft.com/v1.0/me/messages?$filter= conversationId eq 'AAQkADMwNmI4YTY3LWFjZDctNDdmOS1hMmE1LTJhZGUxOWY3NWIxNAAQALlqqNdyFwVIidb2undvuwA=' and hasAttachments eq true
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.$modal.show({
      title: 'Select Transaction',
      content: PropertySelect,
      actions: [
        {
          title: 'Ok',
          emit: `property-selected-${this.state.message.conversationId}`
        }
      ]
    });
    await this.setState({
      currentlyAssigned: currentlyAssigned,
      currentlyAssignedRefno: currentlyAssignedRefno
    });
    //console.log('STATE currentlyAssigned currentlyAssignedRefno',this.state.currentlyAssigned, this.state.currentlyAssignedRefno)
  }

  async selectPropertyTransactionRollback(
    e,
    currentlyAssignedRefno,
    prevAssignedRefNo
  ) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Override it!'
    }).then(async result => {
      if (result.value) {
        await this.setState({
          currentlyAssignedRefno: currentlyAssignedRefno
        });
        this.transferFiles(this.state.currentlyAssignedRefno);

        let info = this.state.info || {};
        //console.log('checking info transferFiles',info,currentlyAssignedRefno)

        let resconv = await this.$conv.save({
          _id: info._id,
          conversationId: this.state.message.conversationId,
          context: {
            propertyId: currentlyAssignedRefno,
            referenceNo: prevAssignedRefNo,
            prevPropId: '',
            prevReferenceNo: '' //res.data[0].context.referenceNo
          }
        });
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Previous reassignment Successfully overridden',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });

    //alert ('Previous reassignment Successfully overridden')
    /* Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Previous reassignment Successfully overridden',
      showConfirmButton: false,
      timer: 1500
    }) */
  }

  async fetchConvMsg(id, asset) {
    // console.log('fetchConvMsg',id,asset)
    this.setState({
      onetimewasabi: true
    });

    let res = await cache.request(`mail-convmsg-${id}`, () => {
      return this.$mail.getConvmsgid(id);
    });

    if (res) {
      let correctedmsgID = (res.messages.value || []).map(i => i.id);
      correctedmsgID.forEach(id => {
        this.wasabicheckfetchAttachments(id, asset);
      });
    }
  }

  async wasabicheckfetchAttachments(id, asset) {
    let res = await cache.request(`mail-attachments-${id}`, () => {
      return this.$mail.getAttachments(id);
    });

    if (res) {
      let correctedmsgID = (res.attachments.value || []).map(i => i.id);
      correctedmsgID.forEach(attachid => {
        this.wasabifetchAttachments(id, attachid, asset);
      });
    }
  }

  async wasabifetchAttachments(id, attachid, asset, convId) {
    //contentBytes->https://graph.microsoft.com/v1.0/me/messages/AQMkADMwNmI4YTY3LWFjZDctNDdmOS1hMmE1LTJhZGUxOWY3NWIxNABGAAADqBCIigcO20iQywAELs4eVAcAATx5ceQnj0GMzazgBhlVdwAAAgEMAAAAATx5ceQnj0GMzazgBhlVdwABK_fEvAAAAA==/attachments
    //  console.log('wasabi upload',id,attachid,convId)
    let res = await cache.request(
      `mail-attachments-${(convId, attachid)}`,
      () => {
        return this.$mail.getAttachment(id, attachid);
      }
    );
    //console.log('wasabifetchAttachmentsid,attachid,asset',id,attachid,asset,res)
    if (res) {
      if (asset.fileCategory === undefined) {
        var newbucket = 'bunsorted'; //'bsearches' 04/22/2020 recent meeting on 04/20
      } else {
        var newbucket = 'b' + asset.fileCategory;
      }

      var rescontentbytes = res;
      var AWS = require('aws-sdk');
      var accessKeyId = 'L26GKMZJINHR3RW5UHU3';
      var secretAccessKey = 'aBAsUDjceQzM5hmRetzJYSddhdvZWoANQoRaESNO';

      var wasabiEndpoint = new AWS.Endpoint('s3.wasabisys.com');
      var s3 = new AWS.S3({
        endpoint: wasabiEndpoint,
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
      });

      var params = {
        Bucket: newbucket, //'bsearches',
        Key: asset.fileName.replace(/\s/g, ''), //asset.name,
        Body: this.base64ToArrayBuffer(rescontentbytes), //assetfile
        ACL: 'public-read'
      };

      await s3.upload(params, function(err, data) {
        if (err) {
          console.log('error in callback conversation module');
          console.log(err);
        }
        console.log('success conversation module');
      });
    }
  }

  async onAssetUpdate(asset) {
    //console.log('executing onAssetUpdate',asset)
    this.updateAsset(asset);
  }

  async onAssetUpdateTransfer(asset) {
    console.log('executing onAssetUpdateTransfer', asset);
    this.updateAssetTransfer(asset);
  }

  async onPropertySelect(item) {
    this.assignPropertyReference(item);
  }

  async assignPropertyReference(prop) {
    let info = this.state.info || {};
    let res = await this.$conv.save({
      _id: info._id,
      conversationId: this.state.message.conversationId,
      context: {
        propertyId: prop._id,
        referenceNo: prop.referenceNo,
        prevPropId: '',
        prevReferenceNo: ''
      }
    });
    // console.log('this.state.info assignPropertyReference',info._id)

    if (res) {
      this.setState({
        info: res.data
      });

      this.props.postFetch(res.data);
      this.$root.$emit(
        `saveAll-attachments-${this.state.message.conversationId}`
      );
      //alert('info._id',info._id)
      if (info._id === undefined) {
        let resmailatty = await this.$mail.getConvmsgid(
          this.state.message.conversationId
        );

        if (resmailatty) {
          let resattachlist = await this.$mail.getAttachmentsList(
            resmailatty.data.messages.value[0].id
          );

          let resmailattyArray = [resattachlist.data.attachments.value];
          let arrayToState = [];
          resmailattyArray.forEach(element => {
            arrayToState.push(element);
          });
        }
      } else {
        //console.log ('ELSE on property select',prop._id)
        //alert ('ELSE on property select',prop._id)
        this.transferFiles(prop._id);

        let info = this.state.info || {};
        //console.log('checking prop._id',info._id)

        let res = await this.$conv.find({
          conversationId_eq: this.state.message.conversationId
        });
        if (res && res.data) {
          //console.log('previous values',res.data[0]._id,res.data[0].context.propertyId,res.data[0].context.referenceNo)
        }

        let respropId = await this.$property.find({
          _id_eq: this.state.currentlyAssigned
        });
        if (respropId && respropId.data) {
          //console.log('previous values Reference #',respropId.data[0].referenceNo)
        }
        let transfermsg = res.data[0].context.referenceNo;

        let resconv = await this.$conv.save({
          _id: info._id,
          conversationId: this.state.message.conversationId,
          context: {
            propertyId: res.data[0].context.propertyId,
            referenceNo: res.data[0].context.referenceNo,
            prevPropId: this.state.currentlyAssigned,
            prevReferenceNo: respropId.data[0].referenceNo //res.data[0].context.referenceNo
          }
        });
        //alert ('Successfully Transferred',prop._id)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Successfully Transferred',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
    let resTruemessageIds = await this.$mail.getConvmsgid(
      this.state.message.conversationId
    );
    let correctedmsgID = (resTruemessageIds.data.messages.value || []).map(
      i => i.id
    );
    correctedmsgID.forEach(async id => {
      //http://localhost:1338/mail-outlook/messages/AQMkADMwNmI4YTY3LWFjZDctNDdmOS1hMmE1LTJhZGUxOWY3NWIxNABGAAADqBCIigcO20iQywAELs4eVAcAATx5ceQnj0GMzazgBhlVdwAAAgEMAAAAATx5ceQnj0GMzazgBhlVdwABK_fEvAAAAA==/attachments/AQMkADMwNmI4YTY3LWFjZDctNDdmOS1hMmE1LTJhZGUxOWY3NWIxNABGAAADqBCIigcO20iQywAELs4eVAcAATx5ceQnj0GMzazgBhlVdwAAAgEMAAAAATx5ceQnj0GMzazgBhlVdwABK_fEvAAAAAESABAAHN3Elq453E69BYOsXbo3VQ==
      let resattachlist = await this.$mail.getAttachmentsList(id);
      //console.log('array length',resattachlist.data.attachments.value.length)
      let haba = resattachlist.data.attachments.value.length;

      if (haba === 1) {
        let letmsgid2 = id;
        //console.log('greater=1')
        let rescontentbytes = await this.$mail.getAttachment(
          letmsgid2,
          resattachlist.data.attachments.value[0].id
        );
        this.wasabiUpload(
          rescontentbytes.data.contentBytes,
          resattachlist.data.attachments.value[0].name
        );
      }

      if (haba > 1) {
        let letmsgid = id;
        //console.log('greater>1',letmsgid,resattachlist)//correctedmsgID,resattachlist.data.attachments.value.name)
        let resattachlist2 = await this.$mail.getAttachmentsList(id);
        let correctedmsgID2 = (resattachlist2.data.attachments.value || []).map(
          i => i.id
        );

        correctedmsgID2.forEach(async id => {
          //let resFileName = await this.$mail.getAttachments(correctedmsgID)
          //console.log('multiple attachment resFileName',id)
          let rescontentbytes = await this.$mail.getAttachment(letmsgid, id);
          //console.log('multiple attachment-rescontentbytes',rescontentbytes,rescontentbytes.data.name)
          this.wasabiUpload(
            rescontentbytes.data.contentBytes,
            rescontentbytes.data.name
          );
        });
      }
    });
  }

  async wasabiUpload(rescontentbytes, filename) {
    //console.log('entering wasabi upload..',filename)
    /* let resTruemessageId = await this.$mail.getConvmsgid(convId)
    console.log('resTruemessageId',resTruemessageId)
    let rescontentbytes = await this.$mail.getAttachment(messageId,attachId) */

    if (rescontentbytes) {
      var params = {
        Bucket: 'bunsorted', //'testbucketonly',//
        Key: filename.replace(/\s/g, ''),
        Body: this.base64ToArrayBuffer(rescontentbytes),
        ACL: 'public-read'
      };

      await s3.upload(params, function(err, data) {
        if (err) {
          console.log('error in callback conversation module', filename);
          console.log(err);
        }
        console.log('success NEW wasabiversion!', filename);
      });
    }
  }

  async transferFiles(propId) {
    //console.log('transferFiles',propId)
    this.$file = crud('files');
    let res = await this.$file.find({
      'context.propertyId': this.state.currentlyAssigned
    });
    //console.log('transferFiles res',res.data)

    //const context = res.data.map(function(i,idx,array);
    //let context = (res.data|| []).map(i => i._id);

    let context = res.data.map((item, key) => {
      let assetInfo = {
        _id: item._id,
        context: {
          attachmentId: item.context.attachmentId,
          conversationId: item.context.conversationId,
          messageId: item.context.messageId,
          propertyId: propId
        }
      };
      //    console.log('item',item)
      //     console.log('assetInfo',assetInfo)
      this.$file.save(assetInfo);
    });
    /*  console.log('context transferFiles',context)    
           context.forEach( async _id => {
            let assetInfo = {
              _id: _id,     
              context: {     
                propertyId: propId,
                prevpropId: this.state.currentlyAssigned,
                attachmentId:res.data.attachmentId
              }
            };
            console.log(assetInfo)
            this.$file.save(assetInfo); 
        
         }); */
  }

  async updateAsset(asset) {
    if (
      !this.state.info ||
      !this.state.info.context ||
      !this.state.info.context.propertyId
    ) {
      alert('please set property reference first');
      return;
    }
    let assets = [...(this.state.info.assets || [])];

    this.saveFile(asset);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Successfully Assigned',
      showConfirmButton: false,
      timer: 1500
    });

    // splice if exists
    let idx = assets
      .map(a => {
        return a.id;
      })
      .indexOf(asset.id);
    if (idx != -1) {
      assets.splice(idx, 1);
    }

    // append
    assets = [...assets, asset];

    // download ...
    this.setState({
      info: {
        ...this.state.info,
        assets: assets
      }
    });
  }

  async updateAssetTransfer(asset) {
    console.log('updateAssetTransfer', asset);
    if (
      !this.state.info ||
      !this.state.info.context ||
      !this.state.info.context.propertyId
    ) {
      /*   alert('please set property reference first');
      return; */
    }

    let assets = [...(this.state.info.assets || [])];
    this.saveFile(asset);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Successfully Assigned',
      showConfirmButton: false,
      timer: 1500
    });

    // splice if exists
    let idx = assets
      .map(a => {
        return a.id;
      })
      .indexOf(asset.id);
    if (idx != -1) {
      assets.splice(idx, 1);
    }

    // append
    assets = [...assets, asset];

    // download ...
    this.setState({
      info: {
        ...this.state.info,
        assets: assets
      }
    });
  }

  base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64); // Comment this if not using base64
    const bytes = new Uint8Array(binaryString.length);
    return bytes.map((byte, i) => binaryString.charCodeAt(i));
  }

  async saveFile(asset) {
    //console.log('savefile',asset)
    //alert ('save file')
    if (asset.fileCategory === undefined) {
      var metafilecategory = 'unsorted'; //'searches'   -- 04/20/20 meeting default rule
      var newbucket = 'bunsorted'; //'bsearches'      -- 04/2020 meeting default rule
    } else {
      var metafilecategory = asset.fileCategory;
      var newbucket = 'b' + asset.fileCategory;
    }

    //    console.log('metafilecategory',metafilecategory)
    let metalocation = `https://${newbucket}.s3.wasabisys.com/${asset.name.replace(
      /\s/g,
      ''
    )}`;
    this.$file = crud('files');
    let ext = asset.name.slice(((asset.name.lastIndexOf('.') - 1) >>> 0) + 2);
    let assetInfo = {
      mailId: this.state.message.id,
      title: asset.name,
      context: {
        messageId: this.state.message.id,
        conversationId: this.state.message.conversationId,
        propertyId: this.state.info.context.propertyId,
        attachmentId: asset.id
      },
      source: this.state.message.sender || this.state.message.from,
      meta: {
        fileName: asset.name.replace(/\s/g, ''),
        fileType: ext,
        fileCategory: metafilecategory, //newbucket, //asset.fileCategory,
        wasabi: metalocation, //this.state.wasabilocation,
        key: asset.name.replace(/\s/g, ''),
        bucket: newbucket //'bsearches'
      },
      paths: [
        {
          provider: 'email',
          assetId: asset.id,
          path:
            this.state.info.context.propertyId +
            '/' +
            asset.name.replace(/\s/g, ''),
          fileType: ext,
          fileCategory: metafilecategory, //asset.fileCategory,
          wasabi: metalocation, //this.state.wasabilocation,
          key: asset.name.replace(/\s/g, ''),
          bucket: newbucket //'bsearches'
        }
      ],
      draftable: {
        identifier: ' ',
        identifierPath: ' '
      }
    };
    //console.log('find assetInfo.context.propertyId,assetId',assetInfo.context.propertyId,asset.id )
    let res = await this.$file.find({
      'context.attachmentId': asset.id
    });
    //console.log('context prop res',res,asset.id )
    if (res && res.data && res.data.length) {
      assetInfo.id = res.data[0]._id;
      assetInfo._id = res.data[0]._id;
    }

    res = this.$mail.saveAttachment(
      assetInfo.context.messageId,
      asset.id,
      asset.name, // filename
      assetInfo.context.propertyId // save topath
    );
    this.$file.save(assetInfo);
    //this.wasabiUpload(this.state.message.id,asset.id,asset.name.replace(/\s/g, ""),this.state.message.conversationId)
  }

  async junk(msg) {
    this.$mail
      .moveMessage(
        {
          id: msg.id
        },
        this.$mail.junk.id
      )
      .then(res => {
        this.$root.$emit('mail-refresh');
        this.$root.$emit('mail-folders-refresh');
      });
  }

  async unjunk(msg) {
    this.$mail
      .moveMessage(
        {
          id: msg.id
        },
        this.$mail.inbox.id
      )
      .then(res => {
        this.$root.$emit('mail-refresh');
        this.$root.$emit('mail-folders-refresh');
      });
  }

  async fetchConversationInfo() {
    let res = await this.$conv.find({
      conversationId_eq: this.state.message.conversationId
    });
    if (res && res.data) {
      this.setState({ info: res.data[0] });
      this.props.postFetch(res.data[0]);
      //      console.log('fetchconversationinfo',res.data)
    }
  }

  addPulse = (mailid, e) => {
    console.log('checking events', e);
    //axios.post('http://dev.settlementapp99.com/internalcomments', {
    axios
      .post(config.returnEnv() + 'internalcomments/', {
        mailid
      })
      .then(res => {
        if (res.status !== 200) return;
        res.json().then(data => console.log(data));
      })
      .catch(err => console.log('Fetch Error :-S', err));
    this.setState({ pulse: true });
    //console.log('pulse state',this.state.pulse)
  };

  render() {
    const tracking = this.context;
    let message = this.props.message || {};
    if (!message.conversationId) {
      return <Fragment> </Fragment>;
    }
    //console.log('this.props',this.props)
    let propertyId = null;
    let previouspropertyId = null;
    let currentlyAssigned = null;
    let currentlyAssignedRefno = null;
    let prevAssignedRefNo = null;
    //let filemanagercontext;
    if (this.state.info) {
      if (this.state.info.context) {
        if (this.state.info.context.propertyId) {
          //console.log('render this.state.info.context',this.state.info.context)
          propertyId = this.state.info.context.propertyId;
          currentlyAssigned = this.state.info.context.referenceNo;
          previouspropertyId = this.state.info.context.prevPropId;
          currentlyAssignedRefno = this.state.info.context.prevReferenceNo;
          prevAssignedRefNo = this.state.info.context.prevReferenceNo;
          //filemanagercontext=this.state.info.context.conversationId
        }
      }
    }
    const filemanagercontext = propertyId;
    //console.log('let filemanagercontext',filemanagercontext)
    let keyidx = this.props.idx;
    //console.log('message', message)

    const handleReply = convId => {
      tracking.track(' click.Replied Button', { audit_logs: convId });
      this.setState({ activeReply: !this.state.activeReply });
      this.setState({ activeReplyAll: false });
    };

    const handleReplyAll = convId => {
      tracking.track(' click.ReplyAll Button', { audit_logs: convId });
      this.setState({ activeReplyAll: !this.state.activeReplyAll });
      this.setState({ activeReply: false });
    };

    const handleJunk = convId => {
      tracking.track(' click.Junk Button', { audit_logs: convId });
    };

    const handleHighlight = convId => {
      tracking.track(' click.Highlight Button', { audit_logs: convId });
      this.toggle();
    };

    const handleAssign = convId => {
      tracking.track(' click.Assign Button', { audit_logs: convId });
    };

    const handleFiles = convId => {
      tracking.track(' click.Files Button', { audit_logs: convId });
    };

    const handleIsOpen = () => {
      this.setState({ isOpen: !this.state.isOpen });
    };
    let mid = this.state.message.id;
    let subreply = '1';
    return (
      <>
        {/* <Files
          isOpen={this.state.isOpen}
          contextpropertyid={filemanagercontext}
          context={this.props.message.conversationId}
          messageid={this.props.message.id}
        /> */}

        <FileManager
          isOpen={this.state.isOpen}
          contextpropertyid={filemanagercontext}
          context={this.props.message.conversationId}
          messageid={this.props.message.id}
        />
      </>
    );
  }
}
Conversation.contextType = TrackingContext;
