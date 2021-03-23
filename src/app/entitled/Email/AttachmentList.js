import React, { Fragment, Component, PureComponent } from 'react';
import {
  Card,
  CardBody,
  Button,
  Input,
  Row,
  Col,
  Label,
  Container,
  ListGroup,
  ListGroupItem,
  UncontrolledTooltip
} from 'reactstrap';
import styled from 'styled-components';
import { Library as Icons, FontAwesomeIcon } from '../app/icons';
import jp from 'jsonpath';
import { FileTypes, FileCategories } from '../app/Property/services/services';
import cache from '../services/cache';
import modal from '../services/modal';
import { crud } from '../services/crud';
import events from '../services/events';
import model from '../services/Model';
import UploadedFile from './EmailMessageBox/UploadedFile';

import config from '../app/config/config';

import AsyncSelect from 'react-select/async';
import $notify from '../services/notify';

import Select from 'react-select';
const $properties = crud('properties');

const optionsFileCat = [
  { value: 'searches', label: 'Searches' },
  { value: 'commitment', label: 'Commitment and Clear' },
  { value: 'payoffinvoices', label: 'Payoffs & Invoices' },
  { value: 'policy', label: 'Policy' },
  { value: 'others', label: 'Others' },
  { value: 'template', label: 'Template' },
  { value: 'unsorted', label: 'Unsorted' }
];

const ContainerAttachment = styled.div`
  background: #ffffff;
  border: 1px solid #e7e7e7;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 2px 7px;
`;
export default class AttachmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: props.message || {},
      full: {},
      attachments: [],
      loading: false,
      info: null,
      properties: [],
      selectedPropertyID: '',
      selectedOptionPropertyId: {},
      selectedOptionPropertyIdValue: ''
    };
    this.$files = crud('files');
    this.$root = events;
    this.$properties = crud('properties');

    this.fileCategories = {
      '?': 'Select',
      ...FileCategories
      //,      '.': 'Unsorted'
    };

    this.$conv = crud('conversations');
    this.$modal = modal;
    this.$model = model;
    this.$config = config;
    this.saveAllAttachment = this.saveAllAttachment.bind(this);
    this.view = this.view.bind(this);
    this.base64ToArrayBuffer = this.base64ToArrayBuffer.bind(this);
    this.createAndDownloadBlobFile = this.createAndDownloadBlobFile.bind(this);
  }

  componentDidMount() {
    //    console.log('mounting saveAll-attachments-',this.state.message.conversationId)
    //  console.log('attachmentlist state message',this.state)
    this.$root.$on(
      `saveAll-attachments-${this.state.message.conversationId}`,
      this.saveAllAttachment
    );
    this.fetchConversationInfo();
    this.fetchAttachments();
    this.fetchProperties();
  }

  componentWillUnmount() {
    this.$root.$off(
      `saveAll-attachments-${this.state.message.conversationId}`,
      this.saveAllAttachment
    );
  }

  //UNSAFE_componentWillReceiveProps(nextProps)
  UNSAFE_componentWillUpdate(nextProps) {
    //console.log('NEXT PRopshere==>>', nextProps.message.id,this.state.message.id)
    if (
      !this.state.message ||
      (nextProps.message && nextProps.message.id !== this.state.message.id)
    ) {
      //console.log('(nextProps.message && nextProps.message.id !== this.state.message.id)==>>', nextProps.message.id)
      this.setState({
        message: nextProps.message,
        info: null
      });
      setTimeout(() => {
        this.fetchConversationInfo();
        this.fetchAttachments();
      });
    }
  }

  async fetchConversationInfo() {
    if (this.state.message && this.state.message.conversationId) {
      let res = await this.$conv.find({
        conversationId_eq: this.state.message.conversationId,
        _project: ['assets', 'context']
      });
      //console.log('fetchConversationInfo  this.state.message --- this.state.message.conversationId',this.state.message, this.state.message.conversationId)
      if (res && res.data) {
        this.setState({
          info: res.data[0]
        });
        //console.log('fetchConversationInfo info: res.data[0]',this.state.info)
        this.updateFromConversation();
      }
    }
  }

  async fetchAttachments_ori() {
    if (!this.state.message.hasAttachments) {
      return;
    }
    //console.log('this.$mail==>',this.$mail)
    let res = await cache.request(
      `mail-attachments-${this.state.message.id}`,
      () => {
        return this.$mail.getAttachments(this.state.message.id);
      },
      {
        persist: true
      }
    );

    if (res && res.attachments) {
      this.setState({
        attachments: res.attachments.value
      });
      //console.log('Fetching attachments no conditions=>>', JSON.stringify(res.attachments.value))
      this.updateFromConversation();
    }
  }

  async fetchAttachments() {
    /*   if (!this.state.message.hasAttachments) {
      return;
    }  */
    //console.log('this.$mail==>',this.$mail)
    // console.log('fetch attachments',this.state.message.hasAttachments,this.state.message.id,this.state.message.conversationId)
    //alert('attement cheking');
    let res = await cache.request(
      `mail-attachments-${this.state.message.id}`,
      () => {
        return this.$mail.getAttachments(this.state.message.id);
      }
      /*  ,
      {
        persist: true
      } */
    );

    let resArray = [res.attachments.value];
    //console.log('Fetching attachments RES', resArray)
    if (res && res.attachments) {
      this.setState({
        attachments: res.attachments.value
      });
      //console.log('res.attachments', res.attachments)
      //this.updateFromConversation();

      /*  let context = resArray.map((item,key) => {
        //console.log('this.state.message.id item ==>',this.state.message.id,item.attachments.value[key].id)
        //this.$file.save(assetInfo);
        //this.checkinFile(item.attachments.value[key].id,this.state.message.id)    
        //console.log('MAP loop attachment ID',item) //.attachments.id,item.attachments.name)         
            }) */

      let resattachlist2 = await this.$mail.getAttachmentsList(
        this.state.message.id
      );
      let correctedmsgID2 = (resattachlist2.data.attachments.value || []).map(
        i => i.id
      );

      correctedmsgID2.forEach(async id => {
        //let resFileName = await this.$mail.getAttachments(correctedmsgID)
        //console.log('multiple attachment resFileName',id)
        //let rescontentbytes = await this.$mail.getAttachment(letmsgid,id)
        //console.log('multiple attachment-rescontentbytes',rescontentbytes,rescontentbytes.data.name)
        //this.checkinFile( id, this.state.message.conversationId,  this.state.message.id );
      });
    }
  }
  async checkinFile(attachid, conversationId, messageId) {
    this.$file = crud('files');
    let resFile = await this.$file.find({
      'context.attachmentId': attachid,
      'and:context.conversationId': conversationId
    });
    if (resFile.data.length === 0) {
      //console.log('resfile',resFile,attachid,conversationId)
      //get propertyID conversation if present upload files wasabi update $files
      this.$conv = crud('conversations');

      let resconv = await this.$conv.find({ conversationId: conversationId });

      if (resconv.data.length === 1) {
        //console.log('uploading conversationID',resconv)
        let rescontentbytes = await this.$mail.getAttachment(
          messageId,
          attachid
        );
        console.log(
          'uploading conversationID rescontentbytes',
          rescontentbytes
        );

        var newbucket = 'bunsorted';
        let metalocation = `https://${newbucket}.s3.wasabisys.com/${rescontentbytes.data.name.replace(
          /\s/g,
          ''
        )}`;
        this.$file = crud('files');
        let ext = rescontentbytes.data.name.slice(
          ((rescontentbytes.data.name.lastIndexOf('.') - 1) >>> 0) + 2
        );

        let assetInfo = {
          mailId: messageId,
          title: rescontentbytes.data.name,
          context: {
            messageId: messageId,
            conversationId: conversationId,
            propertyId: resconv.data[0].context.propertyId,
            attachmentId: attachid
          },
          source: 'autoupload',
          meta: {
            fileName: rescontentbytes.data.name,
            fileType: ext,
            fileCategory: 'unsorted',
            wasabi: metalocation,
            key: rescontentbytes.data.name.replace(/\s/g, ''),
            bucket: newbucket
          },
          paths: [
            {
              provider: 'email',
              assetId: messageId,
              path:
                resconv.data[0].context.propertyId +
                '/' +
                rescontentbytes.data.name,
              fileType: ext,
              fileCategory: 'unsorted',
              wasabi: metalocation,
              key: rescontentbytes.data.name.replace(/\s/g, ''),
              bucket: newbucket
            }
          ],
          draftable: {
            identifier: ' ',
            identifierPath: ' '
          }
        };
        this.$file.save(assetInfo);
        //wasabi
        var attachrescontentbytes = rescontentbytes.data.contentBytes;
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
          Bucket: newbucket,
          Key: rescontentbytes.data.name.replace(/\s/g, ''),
          Body: this.base64ToArrayBuffer(attachrescontentbytes),
          ACL: 'public-read'
        };

        s3.upload(params, function(err, data) {
          if (err) {
            console.log('error in callback');
            console.log(err);
          }
          console.log('success on attachment list');
        });
        //      this.$notify.notify('new attachments auto saved in Unsorted folder');
        $notify.notify(
          'There are new attachments auto saved in Unsorted folder'
        );
      } else {
        //console.log('not yet assigned')
      }
    }
  }

  async updateFromConversation() {
    if (
      !this.state.info ||
      !this.state.info.assets ||
      !this.state.info.assets.length ||
      !this.state.attachments ||
      !this.state.attachments.length
    ) {
      //console.log('updateFromConversation returning', this.state.info, this.state.info.assets,)
      return;
    }

    let infoAssets = (this.state.info.assets || []).map(i => i.id);
    let attachments = this.state.attachments.map(a => {
      let idx = infoAssets.indexOf(a.id);
      if (idx != -1) {
        return this.state.info.assets[idx];
      }
      //console.log('updateFromConversation returning a',a)
      //call  wasabi $file
      this.saveAttachment(a);
      return a;
    });

    this.setState({
      attachments: attachments
    });
    //console.log('updateFromConversation setState attachments',this.state.attachments)
  }

  async updateAttachment(path, value, save = false) {
    let attaches = {
      attachments: [...(this.state.attachments || [])]
    };
    jp.value(attaches, path, value);
    this.setState(attaches);
  }

  /* async _addFile(params, context) {
    let { id, name } = this.$store.getState().User.user.user;
    let files = await this.$files.save({
      title: params.fileName || 'New File',
      context: context,
      meta: {
        ...params
      },
      owner: {
        id,
        name
      }
    });

    this.$notify.notify('File search saved');
  } */

  async saveAttachment(asset) {
    //console.log('calling saveattachment'    )
    let msgId = this.state.message.id;
    let attachId = asset.id;

    let res = await cache.request(
      `mail-attachments-${(this.state.message.conversationId, attachId)}`,
      () => {
        return this.$mail.getAttachment(msgId, attachId);
      } /* ,
      {
        persist: true
      } */
    );

    if (res) {
      var newbucket = 'b' + asset.fileCategory;
      var rescontentbytes = res.contentBytes;
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
        Key: res.name.replace(/\s/g, ''), //filename, -- support draftable no white space 05/04/20
        Body: this.base64ToArrayBuffer(rescontentbytes),
        ACL: 'public-read' //assetfile
      };

      s3.upload(params, function(err, data) {
        if (err) {
          console.log('error in callback');
          console.log(err);
        }
        console.log('success on attachment list');
      });
    }
    setTimeout(() => {
      this.$root.$emit(
        `asset-updated-${this.state.message.conversationId}`,
        asset
      );
    });
  }

  //saveAttachmentTransfer(this.state.selectedOptionPropertyId.value,e.target.value,a.name,a.id,this.state.message.id)
  async saveAttachmentTransfer(
    propertyId,
    filecat,
    filename,
    attId,
    messageId,
    convid
  ) {
    //console.log('saveAttachmentTransfer',propertyId,filecat,filename,attId,messageId,convid)
    var newbucket = 'b' + filecat;
    let metalocation = `https://${newbucket}.s3.wasabisys.com/${filename.replace(
      /\s/g,
      ''
    )}`;
    this.$file = crud('files');
    let ext = filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
    let assetInfo = {
      mailId: messageId, //this.state.message.id,
      title: filename,
      context: {
        messageId: messageId, //this.state.message.id,
        conversationId: convid, //this.state.message.conversationId,
        propertyId: this.state.selectedOptionPropertyIdValue, //propertyId,//this.state.info.context.propertyId,
        attachmentId: attId //asset.id
      },
      source: '', //this.state.message.sender || this.state.message.from,
      meta: {
        fileName: filename,
        fileType: ext,
        fileCategory: filecat, //asset.fileCategory,
        wasabi: metalocation, //this.state.wasabilocation,
        key: filename.replace(/\s/g, ''),
        bucket: newbucket //'bsearches'
      },
      paths: [
        {
          provider: 'email',
          assetId: messageId, //asset.id,
          path: this.state.selectedOptionPropertyIdValue + '/' + filename,
          fileType: ext,
          fileCategory: filecat, //asset.fileCategory,
          wasabi: metalocation, //this.state.wasabilocation,
          key: filename.replace(/\s/g, ''),
          bucket: newbucket
        }
      ],
      draftable: {
        identifier: ' ',
        identifierPath: ' '
      }
    };

    /*    let res = await this.$file.find({
      'context.attachmentId': asset.id
    });
    
    if (res && res.data && res.data.length) {
      assetInfo.id = res.data[0]._id;
      assetInfo._id = res.data[0]._id;    
    }
    
    res = this.$mail.saveAttachment(
      assetInfo.context.messageId,
      asset.id,
      asset.name, // filename
      assetInfo.context.propertyId // save topath
    ); */
    this.$file.save(assetInfo);
    //console.log('assetInfo',assetInfo)

    let res = await cache.request(
      `mail-attachments-${(messageId, attId)}`,
      () => {
        return this.$mail.getAttachment(messageId, attId);
      }
    );

    if (res) {
      var newbucket = 'b' + filecat;
      var rescontentbytes = res.contentBytes;
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
        Key: filename.replace(/\s/g, ''), //filename, -- support draftable no white space 05/04/20
        Body: this.base64ToArrayBuffer(rescontentbytes),
        ACL: 'public-read' //assetfile
      };

      s3.upload(params, function(err, data) {
        if (err) {
          console.log('error in callback');
          console.log(err);
        }
        console.log('success on attachment list');
      });
    }
  }

  async saveAllAttachment() {
    setTimeout(() => {
      (this.state.attachments || []).map((a, idx) => {
        this.$root.$emit(
          `asset-updated-${this.state.message.conversationId}`,
          a
        );
      });
    });
  }
  async fetchProperties() {
    let properties = await this.$properties.find({});
    this.setState({
      properties: properties.data
    });
    //console.warn(JSON.stringify(properties));
  }

  async view(attachment) {
    let msgId = this.state.message.id;
    let attachId = attachment.id;

    let res = await cache.request(
      `mail-attachments-${(this.state.message.id, attachId)}`,
      () => {
        return this.$mail.getAttachment(this.state.message.id, attachId);
      } /* ,
      {
        persist: true
      } */
    );

    if (res) {
      //console.log('new res',res)
      this.initializeAttachments(res.contentBytes, attachment.name);
    }
  }

  showFileCat(content) {
    console.log(content);
    this.$modal.show({
      title: 'Save to File Search',
      content: content,
      // result: this.state.write,
      size: 'md',
      props: this.state.attachments,
      actions: [
        {
          title: 'Save'
          //emit: "mail-send"
        }
      ]
    });
  }

  initializeAttachments(contentBytes, fn) {
    alert('downloading attachment');
    const data = contentBytes; // assume you have the data here

    const arrayBuffer = this.base64ToArrayBuffer(data);
    this.createAndDownloadBlobFile(arrayBuffer, fn);
  }

  base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64); // Comment this if not using base64
    const bytes = new Uint8Array(binaryString.length);
    return bytes.map((byte, i) => binaryString.charCodeAt(i));
  }

  createAndDownloadBlobFile(body, filename) {
    const blob = new Blob([body]);
    const fileName = `${filename}`;
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, fileName);
    } else {
      const link = document.createElement('a');
      // Browsers that support HTML5 download attribute
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', fileName);

        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  async fetchPropertyData(inputValue, callback) {
    if (!inputValue) {
      return [];
    } else {
      let referenceNo;
      let propertiesaddy = {};
      referenceNo = inputValue;
      propertiesaddy = inputValue;

      let properties = await $properties.find({
        'or:referenceNo_regex': referenceNo,
        'or:properties.address_regex': propertiesaddy
      });

      if (properties) {
        // console.log('properties callback',properties)
        const tempArray = [];
        properties.data.forEach(element => {
          tempArray.push({
            label:
              `${element.referenceNo}` +
              '  ' +
              JSON.parse(JSON.stringify(`${element.properties[0].address}`)),
            value: element._id
          });
        });
        callback(tempArray);
      }
    }
  }

  async onSearchChange(selectedOptionPropertyId) {
    let selectedOptionPropertyIdv;
    selectedOptionPropertyIdv = selectedOptionPropertyId.value;
    await this.setState(prevState => ({
      selectedOptionPropertyId: !prevState.selectedOptionPropertyId
    }));
    await this.setState({
      selectedOptionPropertyIdValue: selectedOptionPropertyIdv
    });
  }

  render() {
    //console.log('this.state.attachments,this.state.message.id',this.state.attachments,this.state.message.id)
    //console.log('this.state.message',this.state.message)
    let attachmentItems = (this.state.attachments || []).map((a, idx) => {
      //console.log('this.state.attachments a.id,this.state.message.id',a.id,this.state.message.id)
      // return <Row key={`attach-${idx}`}>
      //     <Col>{a.name}</Col>
      //   </Row>

      const modalContent = props => {
        return (
          <Fragment>
            <Container>
              <Row>
                <Label for="fileCategory">Filename: {a.name} </Label>
              </Row>

              <Row>
                <Col>
                  <Input
                    type="select"
                    id="fileCategory"
                    value={this.state.attachments.fileCategory}
                    {...this.$model(`attachments[${idx}].fileCategory`, e => {
                      this.saveAttachment(a);
                    })}
                  >
                    {Object.keys(this.fileCategories).map(k => {
                      return (
                        <option key={k} value={k === '?' ? '' : k}>
                          {this.fileCategories[k]}
                        </option>
                      );
                    })}
                  </Input>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Row>
                    <Col>
                      <Label>Assign to Different Transfer:</Label>
                      <AsyncSelect
                        value={this.state.selectedOptionPropertyId.label}
                        loadOptions={this.fetchPropertyData}
                        placeholder="Type Property Transfer here.."
                        onChange={e => {
                          this.onSearchChange(e);
                        }}
                        defaultOptions={false}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Input
                type="select"
                //  {...this.$model( `attachments[${idx}].fileCategory`, () => {this.saveAttachmentTransfer(a,this.state.selectedPropertyID,this.state.attachments.fileCategory);})}
                onChange={e =>
                  this.saveAttachmentTransfer(
                    this.state.selectedOptionPropertyId.value,
                    e.target.value,
                    a.name,
                    a.id,
                    this.state.message.id,
                    this.state.message.conversationId
                  )
                }
                //  value={this.state.attachments.fileCategory} //0428//input select prework
              >
                {Object.keys(this.fileCategories).map(k => {
                  return (
                    <option key={k} value={k === '?' ? '' : k}>
                      {this.fileCategories[k]}
                    </option>
                  );
                })}
              </Input>

              <Row>
                {/*  <Col>
                                    <Row>                                    
                                          <Col>                                       
                                          <Select                                          
                                          options={optionsFileCat}
                                          onChange={e => this.saveAttachmentTransfer(this.state.selectedOptionPropertyId.value,e.target,a.name)}
                                        //  value={this.state.attachments.fileCategory} //0428//input select prework
                                        >
                                         
                                        </Select>     

                                          </Col>  
                                        
                                    </Row>
                                  </Col> */}
              </Row>
            </Container>
          </Fragment>
        );
      };
      return (
        <Fragment key={`attach-${a.id}`}>
          {/* <ContainerAttachment className="m-2">
            <FontAwesomeIcon icon={Icons.faFileAlt} className="mr-1" />
            <Label className="mr-1"> {a.name} </Label>
            <Button
              className="p-1"
              color="link"
              onClick={evt => {
                this.view(a);
                return true;
              }}
            >
              <FontAwesomeIcon
                icon={Icons.faFileDownload}
                size="lg"
                id={`file-view-${idx}`}
              />
            </Button>
            <Button
              className="p-1"
              color="link"
              onClick={() => {
                this.showFileCat(modalContent);
              }}
            >
              <FontAwesomeIcon
                icon={Icons.faSave}
                size="lg"
                id={`file-add-${idx}`}
              />
            </Button>
          </ContainerAttachment>

          <UncontrolledTooltip placement="right" target={`file-view-${idx}`}>
            Download
          </UncontrolledTooltip>
          <UncontrolledTooltip placement="right" target={`file-add-${idx}`}>
            Save to File Search
          </UncontrolledTooltip> */}
          <UploadedFile
            label={a.name}
            handleDownload={() => this.view(a)}
            handleSave={() => this.showFileCat(modalContent)}
            idx={idx}
          />
        </Fragment>
      );
    });

    return (
      <Fragment>
        <div className="todo-list-wrapper d-flex" flush="true">
          {attachmentItems}
        </div>
      </Fragment>
    );
  }
}
//placeholder for simplifile
/*  useEffect(() => {
    setState(props);
}, [props]) */
//console.log('FilterBar',props.value) //,props.meta,state.value)
