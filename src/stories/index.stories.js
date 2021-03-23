import React from 'react';
import { Button } from '@storybook/react/demo';

import '../assets/App.css';
import '../Test.scss';

export default { title: 'Button' };

export const withText = () => <Button>Hello Button</Button>;

export const withEmoji = () => (
  <Button>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);

export const withByBootstrap = () => (
  <div className="p-4">
    <button className="btn btn-primary">Bootstrap Btn</button>
  </div>
);
