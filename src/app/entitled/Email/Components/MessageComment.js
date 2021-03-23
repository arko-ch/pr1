import React, { Fragment, PureComponent } from 'react';
import { UncontrolledTooltip } from 'reactstrap';

import cache from '../../services/cache';
import { Library as Icons, FontAwesomeIcon } from '../../app/icons';
//import TextareaAutosize from 'react-textarea-autosize'; //rawi0713
import MessageCommentv2 from './MessageCommentv2m';
const axios = require('axios');
class MessageComment extends PureComponent {
  constructor(props) {
    super(props);
    //this.child = React.createRef();
    this.addOne = this.addOne.bind(this);
    this.internalcoms = this.internalcoms.bind(this);

    this.state = {
      isHidden: false,
      intcoms: '',
      bintcoms: '',
      postitcolor: '',
      axiocall: 0,
      accessToken: '',
      defvalue: '',
      chatbubblebackground: `background:#f8ffd0`,
      chatboxbubblecolor: '#e0f3ff',
      cssbubbletoggle: '',
      commentscount: 0
    };
    //this.writeintcoms = this.writeintcoms.bind(this); /pre multi comment work 04/11
  }

  componentDidMount() {
    // this.fetchIntComs(this.props.children[2]);
    // this.fetchBubbles(this.props.children[2]);
  }

  addOne() {
    if (this.state.axiocall === 0) {
      if (localStorage.getItem('access_token') === null) {
        this.paxioska();
      } else {
      }
    }

    this.setState(preState => {
      return {
        axiocall: preState.axiocall + 1
      };
    });
  }

  async paxioska() {
    let sikret;
    sikret = encodeURIComponent('RY0ljep6ogy6ouKE4REJMxLCC9oxgJ1iolX3/++LNro=');
    axios
      .post(
        `https://cors-anywhere.herokuapp.com/https://login.microsoftonline.com/9f066f72-168e-4bdb-b544-a622c6a188e0/oauth2/token`,
        `grant_type=client_credentials&client_id=7d3aad3c-cdc9-4332-ba51-116a76cb0609&client_secret=${sikret}&resource=https://graph.microsoft.com`
      )

      .then(res => localStorage.setItem('access_token', res.data.access_token))
      .catch(error => {
        console.error(error.response);
      });
  }

  handleClick() {
    if (this.state.axiocall === 0) {
      this.paxioska();
    }
    this.setState(prevState => {
      return { axiocall: prevState.axiocall + 1 };
    });
  }
  //pre multi comment work 04/11
  /* async writeintcoms(message) { 
      
      let res; //console.log('MailboxJS', JSON.stringify(message))
  
      res = await this.$mail.writeintcoms({
        id: this.props.children[2],
        '@odata.type': '#microsoft.graph.openTypeExtension',
        extensionName: 'Com.Settlementapp99.Comment',
        comsInternal: this.state.intcoms
      });
     
    }   */

  /* async internalcoms(msgid, comments) {
      const internalcoms = {
        '@odata.type': '#microsoft.graph.openTypeExtension',
        extensionName: 'Com.Settlementapp99.Comment',
        comsInternal: this.state.intcoms
      };
     
      let axiosConfig = {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`, //`Bearer ${this.state.accessToken}`,
          'Access-Control-Allow-Origin': '*'
        }
      };
  
      axios
        .post(
          `https://graph.microsoft.com/v1.0/users/slsdev@settlementapp99.com/messages/${this.props.children[2]}/extensions`,
          internalcoms,
          axiosConfig
        )
  
        .then(res => {
          //console.log('Response Received:', res);
        })
        .catch(err => {
          console.log('AXIOS error:', err);
        });
    }    */

  async internalcoms(msgid, comments) {
    const internalcoms = {
      '@odata.type': '#microsoft.graph.openTypeExtension',
      extensionName: 'Com.Settlementapp99.Comment',
      comsInternal: this.state.intcoms
    };

    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`, //`Bearer ${this.state.accessToken}`,
        'Access-Control-Allow-Origin': '*'
      }
    };

    axios
      .post(
        `https://graph.microsoft.com/v1.0/users/slsdev@settlementapp99.com/messages/${this.props.children[2]}/extensions`,
        internalcoms,
        axiosConfig
      )

      .then(res => {
        //console.log('Response Received:', res); //pre multi comment work 04/11
      })
      .catch(err => {
        console.log('AXIOS error:', err);
      });
  }

  async fetchIntComs(id) {
    let res = await cache.request(`mail-intcoms-${id}`, () => {
      return this.$mail.getIntcoms(id);
    });

    if (res) {
      this.setState({
        intcoms: res.intcoms.comsInternal,
        isHidden: !this.state.isHidden,
        postitcolor: 'red'
      });
    }
  }

  async fetchBubbles(id) {
    let res = await cache.request(`mail-bubbles-${id}`, () => {
      return this.$mail.getBubbles(id);
    });

    if (res.bubbles.bubbleColor === true) {
      //console.log('bubbles',id,res.bubbles.bubbleColor,this.props.children)
      this.props.children[11](this.props.children[8], id);
    } else {
    }
  }

  async handleChange(e, answer) {
    // console.log('internalcomments',e,answer)
    await this.setState(
      {
        intcoms: e, //.target.value,
        id: answer
      }
      //console.log()
    );
    //this.internalcoms(this.state.id, this.state.intcoms);
    //this.writeintcoms(this.props.children[2],this.state.intcoms)
    //this.addPlayer(this.props.children[2])
  }

  // Toggle the visibility
  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    });
  }

  render() {
    //console.log('props children',this.props.children)
    //const { answer } = this.props.children[2];//rawi0713
    // const { style } = this.props.children[2];//rawi0713
    const commentbubblecolor = this.props.children[14];
    const { mailId } = this.props.children[2];
    if (commentbubblecolor === true) {
      this.setState({
        chatbubblebackground: '#6c757d' //'#f8ffd0' //6c757d
      });
    } else {
      this.setState({
        chatbubblebackground: '#6c757d' //'#e0f3ff'
      });
    }

    console.log('this.props', this.props);

    return (
      //-target-151 to 150
      <Fragment>
        <div key={this.props.children[2]}>
          <UncontrolledTooltip
            placement="right"
            target={`internalcoms-${this.props.children[2].substr(0, 150)}`}
          >
            Internal Communications
          </UncontrolledTooltip>
          <UncontrolledTooltip
            placement="right"
            target={`highligther-${this.props.children[2].substr(0, 150)}`}
          >
            Highlight
          </UncontrolledTooltip>
          <FontAwesomeIcon
            id={`internalcoms-${this.props.children[2].substr(0, 150)}`}
            color={this.state.postitcolor}
            icon={Icons.faStickyNote}
            onClick={() => this.toggleHidden()}
          />
          <FontAwesomeIcon
            id={`highligther-${this.props.children[2].substr(0, 150)}`}
            color="blue"
            icon={Icons.faStar} //{Icons.faPencil}
            style={{ width: '2em' }}
            onClick={this.props.children[5]}
          />
          {this.state.isHidden && (
            <div className="comment-container">
              {'Comments '}
              <MessageCommentv2>
                {mailId}={this.props.children[2]}
              </MessageCommentv2>
              {/*  <TextareaAutosize
                  id={`highligther-${this.props.children[2]}`}
                  onFocus={this.addOne}
                  placeholder="click to create internal comms..."
                  onBlur={e =>
                    this.handleChange(e.target.value, this.props.children[2])
                  }
                  defaultValue={this.state.intcoms}
                  style={{
                    width: 500,
                    height: 300,
                    maxHeight: 300,
                    borderColor: '#fff',
                    background: this.state.chatbubblebackground //'#e0f3ff'
                  }}
                ></TextareaAutosize> */}
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

export default MessageComment;
