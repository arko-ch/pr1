import React, { Component, Fragment } from 'react';
import { Library as Icons, FontAwesomeIcon } from 'app/icons';
import { Button } from 'reactstrap';
import classnames from 'classnames';

class FileItem extends Component {
  constructor(props) {
    super(props);
    this.toggleClass = this.toggleClass.bind(this);
    this.state = {
      active: false
    };
  }

  toggleClass() {
    this.setState({ active: !this.state.active });
    // this.props.toggleFile(this.props.fileId);
  }

  render() {
    let title = this.props.title || 'FILE';
    let button = (
      <div className="widget-content-right widget-content-actions widget-content-right-closer ml-5">
        <Button size="sm" className="btn-icon btn-icon-only mr-1" color="link">
          <FontAwesomeIcon icon={Icons.faEnvelope} />
        </Button>
        <Button size="sm" className="btn-icon btn-icon-only mr-1" color="link">
          <FontAwesomeIcon icon={Icons.faCloudDownloadAlt} />
        </Button>
        <Button size="sm" className="btn-icon btn-icon-only" color="link">
          <FontAwesomeIcon icon={Icons.faEye} />
        </Button>
      </div>
    );

    if (!this.props.ready) {
      button = (
        <div className="widget-content-right widget-content-actions widget-content-right-closer ml-5">        

          <Button
            size="sm"
            className="btn-icon btn-icon-only mr-1"
            color="link"
          >
            <FontAwesomeIcon icon={Icons.faEnvelope} />
          </Button>

          <Button
            size="sm"
            className="btn-icon btn-icon-only mr-1"
            color="link"
          >
            <FontAwesomeIcon icon={Icons.faPhone} />
          </Button>
        </div>
      );
    }

    return (
      <Fragment>
        {this.props.fileName !== 'undefined' ? (
          <div
            className={classnames(
              { 'selected-file': this.state.active },
              'widget-content p-2'
            )}
            onClick={() => {
              this.setState({ active: !this.state.active });
            }}
          >
            <div className={'widget-content-wrapper'}>
              <div
                className={
                  'widget-content-left fsize-2 mr-3 center-elem ' +
                  this.props.color +
                  ' ' +
                  this.props.opacity
                }
              >
                <FontAwesomeIcon icon={this.props.icon} />
              </div>

              <div
                className="widget-content-left"
                id={`file-` + this.props.fileId}
              >
                <div className="widget-heading font-weight-normal mx-2">
                  {this.props.fileName}
                </div>
              </div>
              {button}
            </div>
          </div>
        ) : (
          <div className={'widget-content p-2'}>
            <div className={'widget-content-wrapper'}>
              <div
                className={'widget-content-left fsize-2 mr-3 center-elem'}
              ></div>
              <div className="widget-content-left">
                <div className="widget-heading font-weight-normal"></div>
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default FileItem;
