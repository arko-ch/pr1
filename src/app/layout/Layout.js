import React, { Fragment } from 'react';
import cx from 'classnames';
import { Store } from './store';

function FullPage(props) {
  return <Fragment>{props.children}</Fragment>;
}
//strapiV3
export default function(props) {
  const store = React.useContext(Store);
  const state = store.state;

  window.$layout = store;

  /*
    $break-tiny: 576px;
    $break-small: 768px;
    $break-medium: 992px;
    $break-large: 1200px;
  */
//strapiV3 - post strapi v3 migration 08/31
  let contentClass = state.contentClass;

  React.useEffect(() => {
    const onResize = () => {
      store.dispatch(store.setState({ 'layout.width': window.innerWidth }));
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.addEventListener('resize', onResize);
    };
  }, []);

  let components = { ...state.components };
  let ToolbarComponent = components.toolbar || Fragment;
  let NavComponent = components.navbar || Fragment;
  let PanelComponent = components.panel || Fragment;

  const closeNav = evt => {
    store.dispatch(
      store.setState({
        'navbar.opened': false,
        'panel.opened': false
      })
    );
  };

  const classList = {

    grid: cx(contentClass.layout),
    toolbar: cx(contentClass.toolbar),
    navbar: cx(contentClass.navbar),
    panel: cx(contentClass.panel),
    content: cx(contentClass.content),
    overlay: cx(contentClass.overlay)
    
  };

  const onOverlay = () => {
    store.dispatch(
      store.setState({
        'overlay.enabled': false,
        'navbar.compact': true
      })
    );
  };

  return (
    <div className={classList.grid}>
      <div className={classList.toolbar}>
        <div>
          <ToolbarComponent />
        </div>
      </div>
      <div className={classList.navbar}>
        <div>
          <NavComponent />
        </div>
      </div>
      <div className={classList.panel}>
        <div>
          <PanelComponent />
        </div>
      </div>
      <div className={classList.content}>
        <div>{props.children}</div>
      </div>
      <div className={classList.overlay} onClick={onOverlay}></div>
    </div>
  );
}
