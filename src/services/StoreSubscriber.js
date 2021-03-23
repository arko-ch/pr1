/*
// TODO: deprecate the entire thing... use /app/services
*/
//with LinkViewer prework

import React, { Fragment, PureComponent } from 'react';
import jp from 'jsonpath';

//class Search extends Component { => functional arrow changes
class Subscriber extends PureComponent {
  constructor(props) {
    super(props);

    let state = this.getGlobalState();
    this.state = state;
  }

  getGlobalState = () => {
    let globalState = this.$store.getState();

    let state = {};
    Object.keys(this.props.source).forEach(k => {
      let path = this.props.source[k];
      try {
        let res = jp.query(globalState, path)[0];
        state[k] = res;
      } catch (err) {}
    });

    return state;
  };

  listener = () => {
    let newState = this.getGlobalState();
    // todo! compare with current state...
    // if no change ... return
    this.setState(newState);
    this.props.target.setState(newState);
  };

  componentDidMount() {
    this.unsubscribe = this.$store.subscribe(this.listener);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return <Fragment></Fragment>;
  }
}

export default Subscriber;

//convert to functional componanent 08/24