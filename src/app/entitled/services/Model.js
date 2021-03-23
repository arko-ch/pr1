/*
// TODO: deprecate the entire thing... use /app/services
*/

import React, { Component } from 'react';
import jp from 'jsonpath';
// import debounce from 'debounce';

function debounce(f, t) {
  return f;
}

function jpq(state, model) {
  let res = '';
  try {
    res = jp.query(state, model)[0];
  } catch (err) {
    res = state[model];
  }

  if (res === true) {
    return 'true';
  }
  if (res === false) {
    return 'false';
  }
  if (res === undefined) {
    return '';
  }

  return res;
}

function jpv(state, model, value) {
  try {
    jp.value(state, model, value);
  } catch (err) {
    return (state[model] = value);
  }
}

function withModel(model, onChange = null, options = {}) {
  let parent = this;
  let value = jpq(parent.state, model);
  let checked = {};
  if (options.type === 'bool' || value === true || value === 'true') {
    checked = {
      checked: true,
      value: true
    };
  }
  if (options.type === 'date') {
    value = new Date(value).toString();
    if (value === 'Invalid Date') {
      value = '';
    }
  }
  if (options.value !== undefined) {
    value = options.value;
  }

  return {
    model: model,
    value: value,
    checked: false,
    ...checked,
    onChange: function(evt) {
      let state = {
        ...this.state
      };

      // for synthetic events
      if (!evt.target) {
        evt = {
          target: {
            value: evt
          }
        };
      }

      if (evt.target.type === 'checkbox') {
        jpv(state, model, evt.target.checked);
      } else {
        jpv(state, model, evt.target.value);
      }
      this.setState(state);

      if (!model) {
        state = evt.target.value;
      }

      // check if array
      try {
        let firstKey = Object.keys(state)[0];
        if (model.includes(firstKey + '[')) {
          state = state[firstKey];
        }
      } catch {
        //
      }

      // propagate event
      let event = {
        target: {
          value: state
        }
      };

      if (this.props.onChange) {
        if (!this.props._onChange) {
          this._onChange = debounce(evt => {
            this.props.onChange(event);
          }, 150);
        }
        this._onChange(evt);
      }

      // locally watching
      if (onChange) {
        onChange(event);
      }
    }.bind(parent)
  };
}

Component.prototype.$model = withModel;

export default withModel;
/*
// TODO: deprecate the entire thing... use /app/services
*/
