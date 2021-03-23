import React, { Component, Fragment } from 'react';
import { Input, Button, Col, Row, UncontrolledTooltip } from 'reactstrap';
import config from '../../app/config/config'//'../../../config/config';
import { ObjectId } from 'bson';
import { Library as Icons, FontAwesomeIcon } from '../../../app/icons'; //'../../../../app/icons'
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
      chatbubblebackground: `background:#f8ffd0`,
      chatboxbubblecolor: '#e0f3ff',
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
    console.log('BSON add row students state', this.state.updatedId);
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
    const addcommentbtnStyle = {
      width: '26px',
      top: '5px',
      left: '5px',
      height: '28px',
      'padding-top': '2px',
      'padding-right': '10px',
      'padding-left': '7px',
      'margin-left': '6px',
      'margin-top': '4px'
    };

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
      right: '0px',
      'margin-right': '12px'
    };

    const commentusername = {
      /* color:'#007bff',
      'margin-right': '0px',
      float: 'left',
      position: 'absolute',
      right: '5px',
      'margin-top': '29px',
      left: '414px' */
      color: '#007bff',
      'margin-right': '0px',
      float: 'left',
      position: 'absolute',
      right: '5px',
      'margin-top': '-10',
      left: '60px',
      'margin-bottom': '0px',
      'padding-bottom': '0px',
      top: '210px',
      bottom: '22px'
    };
    function leftFillNum(num, targetLength) {
      return num.toString().padStart(targetLength, 0);
    }
    return this.state.students.map((item, key) => {
      const editField = (value, index) => {
        // Clone students data before mutation
        const students = this.state.students.map(item => ({ ...item }));
        //console.log('STUDENTS',value, students[key].id)
        // Update field by index of current student
        students[key][index] = value;
        students[key].edited = students[key].edited || [];
        students[key].edited[index] = true;

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
              // Clone students data before mutation //post scan - components review 0818
              const students = this.state.students.map(i => ({
                ...i,
                editing: item.editing && i === item
              }));
              // Toggle editing flag of this current student (ie table row)
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
              style={{
                cursor: 'pointer',
                border: '1px solid white',
                borderRadius: '15px'
              }}
            >
              {item.editing ? (
                <Row>
                  <Col xs={'16'}>
                    <Button
                      size="sm"
                      color="success"
                      style={addcommentbtnStyle}
                      onClick={this.addRow}
                    >
                      +
                    </Button>
                  </Col>
                  <Col>
                    <span>{this.state.students[key].user}</span>
                    <Input
                      type="textarea"
                      defaultValue={this.state.students[key].comment}
                      bsSize="auto"
                      name="comment"
                      id="comment"
                      placeholder="Write a reply..."
                      onChange={e =>
                        editField(
                          e.target.value,
                          'comment',
                          this.state.updatedId
                        )
                      }
                      style={{
                        width: 500,
                        height: 50,
                        maxHeight: 300,
                        borderColor: '#fff',
                        background: this.state.chatbubblebackground //'#e0f3ff'
                      }}
                    ></Input>
                  </Col>
                  <Col xs={'16'}>
                    {Boolean(this.state.students.length > 1) && (
                      <Button
                        size="sm"
                        color="danger"
                        style={delcommentbtnStyle}
                        onClick={e => removeMe(item.id)}
                      >
                        -
                      </Button>
                    )}
                  </Col>
                </Row>
              ) : (
                <span className="th-br-gray-2 th-bb-gray-2">
                  <div
                    style={{
                      width: 500,
                      height: 60,
                      maxHeight: 500,
                      borderColor: '#fff',
                      background: this.state.chatbubblebackground //'#e0f3ff'
                    }}
                  >
                    <b>
                      <span>{this.state.students[key].user} </span>
                    </b>
                    {this.state.students[key].comment}
                  </div>
                </span>
              )}
            </td>
          </tr>
        </Fragment>
      );
    });
  }
}
//export default MessageComment2;
