import React, { Fragment, PureComponent } from 'react';
import { Library as Icons, FontAwesomeIcon } from '../../app/icons/Icon';
import debounce from 'debounce';
import StateHelper from '../../services/stateHelper';
import { crud } from '../../services/crud';
import {
  StyledContainer,
  StyledSearchItemsContainer,
  StyledHeaderContainer,
  StyledInput,
  StyledHeader,
  StyledHeaderTwo,
  StyledSpan,
  StyledSearchResult,
  StyledCheckbox,
  StyledTransactionType,
  StyledResultContainer,
  StyledContainerButton,
  StyledCancelButton,
  StyledApplyButton,
  StyledFilterButtonContainer,
  StyledSearchResultHeader,
  StyledFilterButton
} from '../EmailStyledComponents';
//import { crud } from '../../services/crud';
/**
	react-dropdown-list theme css
	this file controls the appearance of the dropdown - please edit to suit your needs
*/

import { NewNotify } from '../../services/newNotify';
import events from '../../services/events';
import cache from '../../services/cache';
import Swal from 'sweetalert2';
import FilterTransactionOptions from './FilterTransactionOptions';
const fs = new StateHelper();

//class Search extends Component { => functional arrow changes

const AWS = require('aws-sdk');
const accessKeyId = 'L26GKMZJINHR3RW5UHU3';
const secretAccessKey = 'aBAsUDjceQzM5hmRetzJYSddhdvZWoANQoRaESNO';

const wasabiEndpoint = new AWS.Endpoint('s3.wasabisys.com');
const s3 = new AWS.S3({
  endpoint: wasabiEndpoint,
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey
});

export default class AssignTransaction extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      items: [],
      selected: null,
      info: null,
      wasabilocation: '',
      fileCategory: '',
      onetimewasabi: false,
      selectedPropertyForAssign: '',
      filterToggle: false,
      transactionTags: {
        transactionStage: {
          Recent: false,
          Paused: false,
          NewOrder: false,
          Archived: false,
          Searches: false,
          Commitment: false,
          Closing: false,
          Policy: false,
          PostClose: false
        },
        transactionType: {
          purchase: false,
          refinance: false,
          short_sale: false,
          commercial: false,
          searches_only: false
        }
      }
    };
    this.$property = crud('properties');
    this.$conv = crud('conversations');

    this._onSearch = this.onSearch;

    this.onSearch = debounce(evt => {
      this._onSearch(evt);
    }, 500);
  }

  componentDidMount() {
    // alert('assigntrx')
    console.log('this messages', this.props);

    this.$root = events;
    //    this.onPropertySelect = this.onPropertySelect.bind(this);
    this.onAssetUpdate = this.onAssetUpdate.bind(this);
    //    this.onAssetUpdateTransfer = this.onAssetUpdateTransfer.bind(this);
    this.saveFile = this.saveFile.bind(this);
    //    this.fetchConvMsg = this.fetchConvMsg.bind(this);
    this.wasabicheckfetchAttachments = this.wasabicheckfetchAttachments.bind(
      this
    );
    this.wasabifetchAttachments = this.wasabifetchAttachments.bind(this);
    this.transferFiles = this.transferFiles.bind(this);
  }

  componentDidMount() {
    //   console.log('this.props',this.props)
    // alert('assigntrx')
    // console.log('this props',this.props)
    //   this.$root.$on(
    //    `asset-updated-${this.props.convoId}`,
    //    this.onAssetUpdate
    //);
    //transfer 0427
    /*  this.$root.$on(
    `asset-transfer-updated-${this.props.convoId}`,
    this.onAssetUpdateTransfer
  ); */
  }

  componentWillUnmount() {
    /* this.$root.$off(
      `property-selected-${this.props.convoId}`,
      this.onPropertySelect
    ); */
    /*  this.$root.$off(
      `asset-updated-${this.props.convoId}`,
      this.onAssetUpdate
    ); */
    /*  socket.off('food_ready', res =>
      this.setState({ commentsockets: res.mailid })
    ); */
  }

  async onAssetUpdate(asset) {
    console.log('executing onAssetUpdate', asset);
    this.updateAsset(asset);
  }

  _setState(newState) {
    this.setState(newState);
    //console.log('newSTate->',newState)
    this.onSearch();
  }

  async searchProperty() {
    let res = await this.$property.find({
      'or:referenceNo_regex': this.state.search,
      'or:properties.address_regex': this.state.search,
      _project: [
        'referenceNo',
        'properties',
        'transactionType',
        'transactionStage',
        'buyer',
        'manager',
        'processor',
        'examiner',
        'closer',
        'postCloser',
        'backOffice'
      ],
      _limit: 11
    });

    if (res && res.data) {
      this.setState({
        items: res.data
      });
    }
  }

  async RefNoBadge(conversationId) {
    console.log('RefNoBadge conversationId', conversationId);

    let res = await this.$conv.find({
      conversationId_eq: conversationId
    });

    if (res && res.data[0]) {
      //setSearchResults(res.data[0].context.referenceNo)
      console.log('res', res);
      this.setState({ info: res.data[0] });
      console.log('this.state.info', this.state.info);
    }
  }

  onSearch(evt) {
    //console.log('property select onSearch',evt);
    this.searchProperty();
  }

  /* async handlePropertyAssign(property) {
    let assignedpropId;
    console.log('this.props', this.props);
    //  const tempInfo = newInfoData || {};
    //this.RefNoBadge(this.props.convoId)
 */

  async handlePropertyAssign(property) {
    let res = await this.$conv.find({
      conversationId_eq: this.props.convoId
    });

    if (res.data[0]) {
      this.setState({
        info: res.data[0]
      });
      // console.log('existing',this.state.info)
      //  alert('existing')
    }

    let info = this.state.info || {};

    const saveconv = await this.$conv.save({
      _id: info._id,
      conversationId: this.props.convoId, //mailobject.conversationId,
      context: {
        propertyId: property._id,
        referenceNo: property.referenceNo,
        prevPropId: '',
        prevReferenceNo: ''
      }
    });

    let resTruemessageIds = await this.$mail.getConvmsgid(this.props.convoId);

    let correctedmsgID = (resTruemessageIds.data.messages.value || []).map(
      i => i.id
    );

    if (info._id !== undefined) {
      this.transferFiles(this.state.info);

      let info = this.state.info || {};

      let res = await this.$conv.find({
        conversationId_eq: this.props.convoId
      });
      if (res && res.data) {
      }

      let respropId = await this.$property.find({
        _id_eq: this.state.currentlyAssigned
      });
      if (respropId && respropId.data) {
      }
      let transfermsg = res.data[0].context.referenceNo;

      let resconv = await this.$conv.save({
        _id: info._id,
        conversationId: this.props.convoId,
        context: {
          propertyId: res.data[0].context.propertyId,
          referenceNo: res.data[0].context.referenceNo,
          prevPropId: this.state.currentlyAssigned,
          prevReferenceNo: respropId.data[0].referenceNo
        }
      });
    }
    let attachid;
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

        // this.wasabiUpload(
        //   rescontentbytes.data.contentBytes,
        //   resattachlist.data.attachments.value[0].name
        //  );
        attachid = resattachlist.data.attachments.value[0].id;
        this.checkinFile(attachid, this.props.convoId, letmsgid2);
        // this.saveFile(rescontentbytes.data.name,property._id,id,attachid)
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

          console.log(
            'multiple attachment-rescontentbytes',
            rescontentbytes,
            rescontentbytes.data.name
          );
          attachid = rescontentbytes.data.id;
          this.checkinFile(attachid, this.props.convoId, letmsgid);
        });
      }
    });
    NewNotify(info._id);
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
        //       $notify.notify('There are new attachments auto saved in Unsorted folder');
      } else {
      }
    }
  }

  async transferFiles(propId) {
    this.$file = crud('files');
    let res = await this.$file.find({
      'context.propertyId': this.state.currentlyAssigned
    });

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
    });
  }
  base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64); // Comment this if not using base64
    const bytes = new Uint8Array(binaryString.length);
    return bytes.map((byte, i) => binaryString.charCodeAt(i));
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

  initInputSearchResultAndFilter = () => {
    this.setState({
      transactionTags: {
        transactionStage: {
          Recent: false,
          Paused: false,
          NewOrder: false,
          Archived: false,
          Searches: false,
          Commitment: false,
          Closing: false,
          Policy: false,
          PostClose: false
        },
        transactionType: {
          purchase: false,
          refinance: false,
          short_sale: false,
          commercial: false,
          searches_only: false
        }
      }
    });
  };

  initSearchResultAndFilter = () => {
    document.getElementById('transactionStage').reset();
    document.getElementById('transactionType').reset();
    //alert('init')
    this.setState({
      transactionTags: {
        transactionStage: {
          Recent: false,
          Paused: false,
          NewOrder: false,
          Archived: false,
          Searches: false,
          Commitment: false,
          Closing: false,
          Policy: false,
          PostClose: false
        },
        transactionType: {
          purchase: false,
          refinance: false,
          short_sale: false,
          commercial: false,
          searches_only: false
        }
      }
    });
  };

  allFilterClickListener = (e, filterProp) => {
    console.log('FILTER clicked', e.target.dataset.name);
    // console.log(' filterProp', filterProp);
    const name = e.target.dataset.name;
    this.setState(prevState => ({
      transactionTags: {
        ...prevState.transactionTags,
        [filterProp]: {
          ...prevState.transactionTags[filterProp],
          [name]: !prevState.transactionTags[filterProp][name]
        }
      }
    }));
    console.log(
      'hardcode filterProp and name from the allFilterClickListener function ->',
      this.state.transactionTags['transactionStage']['Recent']
    );
    // console.log('transactionTags state', this.state.transactionTags, filterProp);
  };

  filteredCollected = () => {
    const collectedTrueKeys = {
      transactionStage: [],
      transactionType: []
    };
    const { transactionStage, transactionType } = this.state.transactionTags;

    for (let stageKey in transactionStage) {
      if (transactionStage[stageKey])
        collectedTrueKeys.transactionStage.push(stageKey);
    }
    for (let typeKey in transactionType) {
      if (transactionType[typeKey])
        collectedTrueKeys.transactionType.push(typeKey);
    }

    return collectedTrueKeys;
  };

  multiPropsFilter = (transactions, filters) => {
    const filterKeys = Object.keys(filters);
    return transactions.filter(transaction => {
      return filterKeys.every(key => {
        if (!filters[key].length) return true;
        // Loops again if product[key] is an array (for material attribute).
        if (Array.isArray(transaction[key])) {
          return transaction[key].some(keyEle => filters[key].includes(keyEle));
        }
        return filters[key].includes(transaction[key]);
      });
    });
  };

  searchTransactions = () => {
    const filteredTransactions = this.multiPropsFilter(
      this.state.items,
      this.filteredCollected()
    );
    return filteredTransactions.filter(transaction => {
      return transaction;
    });
  };

  onFilterClick = () => {
    this.setState({ filterToggle: !this.state.filterToggle });
  };

  render() {
    fs.useState(this.state, this._setState.bind(this));
    // console.log(      'this.state.selectedPropertyForAssign',      this.state.selectedPropertyForAssign    );
    const filterTransaction = this.searchTransactions();

    let transactionsResult = filterTransaction.map((item, idx) => {
      let acls =
        this.state.selected && item._id == this.state.selected._id
          ? 'active'
          : '';

      const isImportant = idx === 0 ? true : false;
      return (
        <Fragment key={idx}>
          <StyledSearchResult
            isImportant={isImportant}
            className={'mb-2 list-group-item ' + acls}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              this.setState({
                selected: item,
                result: item
              });
              if (this.props.onChange) {
                this.props.onChange({
                  target: {
                    attributes: {
                      model: {
                        value: 'modal.result'
                      }
                    },
                    value: item
                  }
                });
              }

              if (this.props.actions && this.props.actions.length > 0) {
                const setState = this.props.actions[0].function;
                setState(item);
              }
            }}
          >
            <StyledResultContainer
              onClick={() => this.setState({ selectedPropertyForAssign: item })}
            >
              <StyledSpan>
                <StyledCheckbox type="checkbox" />
                {item.referenceNo} - {item.properties[0].address}{' '}
                {/* {item.properties[0].state} {item.properties[0].zip} */}
                <StyledTransactionType>
                  Transaction Stage: {item.transactionStage}
                </StyledTransactionType>
                <StyledTransactionType>
                  Transaction Type: {item.transactionType}
                </StyledTransactionType>
              </StyledSpan>
              <FontAwesomeIcon icon={Icons.faAngleDown} size="lg" />
            </StyledResultContainer>
          </StyledSearchResult>
        </Fragment>
      );
    });

    return (
      <Fragment>
        <StyledContainer>
          <StyledHeaderContainer>
            <StyledHeader>Assign Transaction</StyledHeader>
            <StyledHeaderTwo onClick={this.props.toggleDropdown}>
              <FontAwesomeIcon icon={Icons.faTimes} /> Close
            </StyledHeaderTwo>
          </StyledHeaderContainer>
          <StyledInput
            onClick={() => this.initInputSearchResultAndFilter()}
            placeholder="Search by reference no.or by address"
            {...fs.model('search')}
          />
          <StyledFilterButtonContainer>
            <StyledSearchResultHeader>Search Result</StyledSearchResultHeader>
            <StyledFilterButton onClick={() => this.onFilterClick()}>
              <FontAwesomeIcon icon={Icons.faFilter} /> Filters
              {this.state.filterToggle && (
                <span>
                  <FontAwesomeIcon
                    icon={Icons.faAngleUp}
                    size="sm"
                    className="email-btns ml-1"
                  />
                </span>
              )}
              {!this.state.filterToggle && (
                <span>
                  <FontAwesomeIcon
                    icon={Icons.faAngleDown}
                    size="sm"
                    className="email-btns ml-1"
                  />
                </span>
              )}
            </StyledFilterButton>
          </StyledFilterButtonContainer>
          {this.state.filterToggle && (
            <FilterTransactionOptions
              allFilterClickListener={this.allFilterClickListener}
              tags={this.state.transactionTags}
              initSearchResultAndFilter={this.initSearchResultAndFilter}
            />
          )}

          <StyledSearchItemsContainer>
            {transactionsResult}
          </StyledSearchItemsContainer>
          {/* <StyledSearchItemsContainer>{items}</StyledSearchItemsContainer> */}
        </StyledContainer>
        <StyledContainerButton>
          <StyledCancelButton onClick={this.props.toggleDropdown}>
            Cancel
          </StyledCancelButton>
          <StyledApplyButton
            onClick={() =>
              this.handlePropertyAssign(this.state.selectedPropertyForAssign)
            }
          >
            Apply
          </StyledApplyButton>
        </StyledContainerButton>
      </Fragment>
    );
  }
}
