/*

Todo: deprecate this

*/

import { createStore, combineReducers } from 'redux';
// import ThemeOptions from './theme/Theme';
import User from './user/User';
// import UI from './ui/UI';

// export default (() => {
//   const store = createStore(createReducer());
//   window.$store = store;
//   return store;
// })();

const store = createStore(createReducer());

export default (() => {
  window.$store = store;
  return store;
})();

function createReducer(reducers) {
  return combineReducers({
    // ThemeOptions,
    User
    // UI
  });
}
/*

Todo: deprecate this

*/