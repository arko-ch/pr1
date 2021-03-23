import React from 'react';
import debounce from 'debounce';
import { pathToValue, guid } from '../services/utility';
import StateHelper from '../services/stateHelper';

export default class MenuState extends StateHelper {
  constructor(path) {
    super();
    this.menuPath = path;
  }

  onCloseMenu = debounce(() => {
    this.setState({
      [`${this.menuPath}.activeMenu`]: null
    });
  }, 2500);

  onSelect = evt => {
    evt.preventDefault();

    let target = evt.currentTarget || evt.target;
    if (!target) {
      return;
    }

    let path = target.id;
    let state = {};
    let item = pathToValue(this.state(), path);

    if (!item) {
      return;
    }

    let id = item.id;
    if (!id) {
      id = guid();
      state[`${path}.id`] = id;
    }

    if (item.action) {
      item.action(item);
    }
    // this.onCloseMenu();

    if (item.items && item.items.length) {
      let topLevel = path.match(/\.items\./g).length;
      if (topLevel === 1) {
        if (pathToValue(this.state(), `${this.menuPath}.activeMenu`) === id) {
          state[`${this.menuPath}.activeMenu`] = null;
        } else {
          state[`${this.menuPath}.activeMenu`] = id;
        }
      }
      state[`${path}.expand`] = !item.expand;
    } else {
      state[`${this.menuPath}.activeMenu`] = null;
    }

    state[`${this.menuPath}.activeItem`] = id;
    this.setState(state);
  };
}
