import React, { Fragment } from 'react';
import Icon, { Library as Icons } from 'app/icons';
import cx from 'classnames';

function Welcome(props) {
  return (
    <Fragment>
      <div>
        {props.title}
        <div className="page-title-subheading">{props.message}</div>
      </div>
    </Fragment>
  );
}

const Crumbs = props => {
  let crumbItems = (props.items || []).map((c, idx) => {
    return (
      <li key={idx} class="active breadcrumb-item" aria-current="page">
        {c.href && <a href={c.href}>{c.title}</a>}
        {!c.href && <span>{c.title}</span>}
      </li>
    );
  });
  return (
    <nav className="" aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="/">
            <Icon icon="faHome" />
          </a>
        </li>
        {crumbItems}
      </ol>
    </nav>
  );
};

export default function Page(props) {
  const zeroPad = {
    paddingLeft: '0px !important',
    paddingTop: '0px !important'
  };

  const content = props.content || '';

  return (
    <div className="xxx-app-main">
      <div className="xxx-app-main__outer">
        <div className="app-main__inner">
          <div>
            <div className="app-page-title">
              <div className="page-title-wrapper">
                <div className="page-title-heading">
                  {props.icon && (
                    <div className="page-title-icon">
                      <i
                        className={cx([
                          props.icon,
                          'icon-gradient',
                          'bg-mean-fruit'
                        ])}
                      />
                    </div>
                  )}
                  {props.welcome && <Welcome {...props.welcome} />}
                </div>

                <div className="page-title-actions">
                  {props.actions}
                  <Crumbs items={props.crumbs} />
                </div>
              </div>
            </div>

            <div className="ag-page-content p-4">
              {props.children}
              {content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
