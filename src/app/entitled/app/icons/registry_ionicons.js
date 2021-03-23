import IosResize from 'react-ionicons/lib/IosResize.js';
import IosChatbubblesOutline from 'react-ionicons/lib/IosChatbubblesOutline.js';
import MdNotificationsOutline from 'react-ionicons/lib/MdNotificationsOutline.js';

export const library = {
  add: (icon, name) => {
    let dashed = (
      ':' + name.replace(/[A-Z]/g, m => '-' + m.toLowerCase())
    ).replace(':-', '');
    library[name] = icon;
    library[dashed] = icon;
  }
};

library.add(IosResize, 'IosResize');
library.add(IosChatbubblesOutline, 'IosChatbubblesOutline');
library.add(MdNotificationsOutline, 'MdNotificationsOutline');

console.log(library);
