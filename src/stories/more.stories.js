import React from 'react';
import { Button } from '@storybook/react/demo';

import '../assets/App.css';
import '../Test.scss';

export default { title: 'More Button Stories' };

export const withText2 = () => <Button>Hello Button</Button>;

export const withEmoji2 = () => (
  <Button>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);

export const withByBootstrap2 = () => (
  <div className="p-4">
    <button className="btn btn-primary">Bootstrap Btn</button>
  </div>
);
