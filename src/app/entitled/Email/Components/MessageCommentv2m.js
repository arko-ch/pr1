import React, { Component, Fragment } from 'react';
import { Input, Button, Col, Row, UncontrolledTooltip } from 'reactstrap';
import config from '../../app/config/config';
import { ObjectId } from 'bson';
import { Library as Icons, FontAwesomeIcon } from '../../app/icons'; //'../../../../app/icons'
import { MentionsInput, Mention } from 'react-mentions';
import defaultStyle from './defaultStyle';
import defaultMentionStyle from './defaultMentionStyle';
import classNames from './mentions.module.css';
const users = [
  {
    id: 'richard',
    display: 'Richard Primero'
  },
  {
    id: 'bryan',
    display: 'Bryan Hewitt'
  },
  {
    id: 'tom',
    display: 'Thomas Archer'
  }
];

export default class MessageComment2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: false,
      comment: '',
      user: '',
      students: [],
      updatedId: '',
      bsonOid: '',
      /*    chatbubblebackground: `background:#f8ffd0`, //#6c757d
        chatboxbubblecolor: '#6c757d',//'#e0f3ff', */
      cssbubbletoggle: '',
      commentsCount: 0
    };
    this.updateAPI = this.updateAPI.bind(this);
    this.editFieldSave = this.editFieldSave.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.addRow = this.addRow.bind(this);
    this.toggleHidden = this.toggleHidden.bind(this);
  }

  componentDidMount() {
    //console.log('this.props.children[2]',this.props.mailId)
    this.fetchallreq(this.props.children[2]);
    //this.commentsCount(this.props.children[2])
  }

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    });
  }

  commentsCount(mailIdProps, array) {
    //let arrayparams=[array]
    //console.log('checking arrayparams',array)
    this.setState({
      commentsCount: array.filter(student => student.comment != '')
    });
    //console.log('total comments for ',mailIdProps, this.state.commentsCount,array)
    return <span>{this.state.commentsCount}</span>;
  }

  async fetchallreq(mailIdProps) {
    await fetch(config.returnEnv() + `mailcomments?mailId=` + mailIdProps)
      .then(res => res.json())
      .then(
        result => {
          let arrayToState = [],
            numOfRowsTemp = [];

          if (!result.forEach) {
            return;
          }

          result.forEach(element => {
            if (element.mailId === mailIdProps) arrayToState.push(element);
          });

          if (arrayToState.length === 0) {
            this.addRow();
          }

          var ctr = 1;
          while (ctr < arrayToState.length + 1) {
            numOfRowsTemp.push(ctr);
            ctr++;
          }
          //console.log('res',config.returnEnv() + 'mailcomments',result)
          this.setState({
            students: arrayToState
          });

          /*  this.setState({commentsCount: arrayToState.filter((student)=> student.comment!='')
         })   */

          // console.log('total comments',mailIdProps,this.state.commentsCount.length)
          this.commentsCount(mailIdProps, arrayToState);
        },
        error => {}
      );
  }

  async getCommentsCount(mailIdProps) {
    return <span>{this.state.commentsCount}</span>;
  }

  async addRow() {
    // console.log('objectid',bsonid.toString())
    const bsonid = new ObjectId();
    let jsonbody = {};
    jsonbody = {
      _id: bsonid.toString(),
      mailId: this.props.children[2],
      //user: JSON.parse(sessionStorage.getItem('settlement-app-client')).user.data.user.name,
      comment: ''
    };

    await fetch(config.returnEnv() + 'mailcomments', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonbody)
    });
    this.setState({
      students: [...this.state.students, jsonbody]
    });
    this.setState({ bsonOid: bsonid.toString() });
    this.setState({ updatedId: this.state.bsonOid });
    //console.log('BSON add row students state',this.state.updatedId)
  }

  deleteRow(e) {
    fetch(config.returnEnv() + 'mailcomments/' + e.toString() + '', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  editFieldSave(value, index, id) {
    if (index === 'comment') {
      this.setState({
        comment: value
      });
      this.updateAPI(id, index, value);
    }
  }

  async updateAPI(id, index, value) {
    console.log('update API', id, index, value);
    fetch(config.returnEnv() + 'mailcomments/' + id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        [index]: value,
        user: JSON.parse(sessionStorage.getItem('settlement-app-client')).user
          .data.user.name
      })
    }).then(data => console.log('data', data));
  }

  render() {
    const username = JSON.parse(sessionStorage.getItem('settlement-app-client'))
      .user.data.user.name;
    const delcommentbtnStyle = {
      width: '26px',
      top: '5px',
      left: '0px',
      height: '28px',
      'padding-top': '2px',
      'padding-right': '10px',
      'padding-left': '7px',
      'margin-left': '0px',
      'margin-top': '4px',
      right: '0px'
      // 'margin-right': '12px'
    };
    const replyStyle = {
      paddingLeft: '10px'
    };

    const mentionsRadiusStyle = {
      width: 600,
      height: 80,
      maxHeight: 500
    };

    function leftFillNum(num, targetLength) {
      return num.toString().padStart(targetLength, 0);
    }

    return this.state.students.map((item, key) => {
      let totalcount = this.state.students.length - 1;
      //console.log('total key',totalcount)

      const editField = (value, index) => {
        // Clone students data before mutation
        const students = this.state.students.map(item => ({ ...item }));
        //console.log('STUDENTS',value, students[key].id)
        // Update field by index of current student
        students[key][index] = value;
        students[key].edited = students[key].edited || [];
        //students[key].newcomment = students[key].newcomment || []
        students[key].edited[index] = true;
        console.log('students array', students[key]);
        // Trigger re-render
        this.setState({ students });
        console.log(
          'render value id editField',
          value,
          index,
          students[key].id
        );
        //this.editFieldSave(value,index,students[key].id)
        //this.updateAPI1(value,id)
        if (this.state.students[key].id === undefined) {
          this.editFieldSave(value, index, this.state.bsonOid);
        } else {
          this.editFieldSave(value, index, this.state.students[key].id);
        }
      };

      const isEdited = index => {
        const students = this.state.students.map(item => ({ ...item }));
        return students[key].edited && students[key].edited[index] === true;
      };

      const removeMe = id => {
        this.setState((prevState, props) => {
          //this.setState({students: prevState.students.slice(1)
          this.setState({
            students: prevState.students.filter(student => student.id != id)
          });
        });

        if (this.state.students[key].id === undefined) {
          this.deleteRow(this.state.bsonOid);
        } else {
          this.deleteRow(id);
        }
      };

      return (
        <Fragment>
          <tr
            key={key}
            className={item.editing ? 'editing' : 'col01'}
            onClick={() => {
              const students = this.state.students.map(i => ({
                ...i,
                editing: item.editing && i === item
              }));
              //                    console.log('checking i and item',item.editing, item.user)
              students[key].editing = true;

              this.setState({
                clientIsEditing: true,
                students,
                idforwasabi: this.state.students[key].id
              });
            }}
          >
            <td
              className={isEdited('comment') ? 'col01' : 'col01'}
              style={{ cursor: 'pointer' }}
            >
              {(item.editing && item.user === username) ||
              (item.editing && item.user === undefined) ? (
                <div style={{ width: 500 }}>
                  {/*  {Boolean(key === totalcount) && (
                                <span style={delcommentbtnStyle} onClick={this.addRow}>Reply</span> )}
                            
                                  <span >{this.state.students[key].user}</span>                   
                           */}
                  <MentionsInput
                    style={{ width: 500, height: 30, maxHeight: 300 }}
                    value={this.state.comment}
                    onChange={e =>
                      editField(e.target.value, 'comment', this.state.updatedId)
                    }
                    style={defaultStyle}
                    placeholder={"Mention people using '@'"}
                  >
                    <Mention data={users} style={defaultMentionStyle} />
                  </MentionsInput>
                  <div>
                    {Boolean(this.state.students.length > 1) && (
                      <span onClick={e => removeMe(item.id)}>
                        <b>Delete</b>
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <span style={{ cursor: 'pointer' }}>
                    <b>
                      <span>{this.state.students[key].user} </span>
                    </b>

                    <MentionsInput
                      value={this.state.students[key].comment}
                      className="mentions"
                      classNames={classNames}
                      style={mentionsRadiusStyle}
                    >
                      <Mention
                        isLoading={true}
                        data={users}
                        className={classNames.mentions__mention}
                      />
                    </MentionsInput>
                  </span>
                </div>
              )}
            </td>
          </tr>
          <Row>
            <tr key={key + item.id} className={'editing explanation '}>
              <span style={{ cursor: 'pointer' }}>
                {Boolean(key === totalcount) && (
                  <span className="'col01'" onClick={this.addRow}>
                    <b style={replyStyle}>Reply</b>
                  </span>
                )}
              </span>
            </tr>
          </Row>
        </Fragment>
      );
    });
  }
}
//export default MessageComment2;
