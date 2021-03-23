/*
// TODO: deprecate the entire thing... use /app/ui/page
*/

import React from 'react';
import Page from '../app/ui/Page';

export function withPageLayout(Content) {
  return class extends React.Component {
    render() {
      return (
        <Page>
          <Content {...this.props} />
        </Page>
      );
    }
  };
}
