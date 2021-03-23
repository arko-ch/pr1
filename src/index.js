import React, { Suspense, Fragment, Component } from 'react';
import Loader from 'react-loaders';
import ReactDOM from 'react-dom';
import { unregister } from './registerServiceWorker';
import { ToastContainer } from 'react-toastify';
import { ModalContainer } from './app/ui/Modal';
import { HashRouter } from 'react-router-dom';
import 'loaders.css/src/animations/line-scale.scss';
import './assets/_App.css';
import './Test.scss';

// todo: deprecate
//import OldRoutes from './Layout/OldRoutes';
import { Provider } from 'react-redux';
import Store from './stores/Stores';

// ---------------
// version 2
// ---------------
import { StoreProvider as LayoutStoreProvider } from './app/layout/store';
import { StoreProvider as UIStoreProvider } from './app/ui/store';
import { StoreProvider as AuthProvider } from './app/auth/store';
import { StoreProvider as ChatProvider } from './app/chat/store';
import { StoreProvider as GlobalProvider } from './app/stores/global';
import { AllRoutes as AppRoutes } from './app/router';

import Layout from './app/layout/Layout';
import config from './app/config';

const rootElement = document.getElementById('root');

const SuspenseFallback = (
  <div className="loader-container">
    <div className="loader-container-inner">
      <div className="text-center">
        <Loader type="line-scale" />
      </div>
      <h6 className="mt-3">Please wait while we load the content...</h6>
    </div>
  </div>
);

const renderApp = Component => {

  ReactDOM.render(
    <Provider store={Store}>
      <GlobalProvider>
        <AuthProvider>
          <HashRouter>
            <ChatProvider>
              <LayoutStoreProvider config={config.layout}>
                <UIStoreProvider config={config.ui}>
                  <Suspense fallback={SuspenseFallback}>
                    <div className="ash app-theme-white app-container body-tabs-shadow-btn">
                      <Layout {...config.layout.components}>
                        <AppRoutes />
                       {/*  <OldRoutes /> */}
                      </Layout>
                      <ToastContainer />
                      <ModalContainer />
                    </div>
                  </Suspense>
                </UIStoreProvider>
              </LayoutStoreProvider>
            </ChatProvider>
          </HashRouter>
        </AuthProvider>
      </GlobalProvider>
    </Provider>,
    rootElement
  );
};

// ---------------
// deprecate this global store
// ---------------
Component.prototype.$store = Store;
export const $store = Store;

// Component.prototype.$stringify = function(n, a = null, b = 4) {
//   n = n || '';
//   return JSON.stringify(n, a, b);
// };

// ---------------
/// todo: no more experiment
// ---------------
window.sessionStorage.setItem('experiment', true);

renderApp();

unregister();
// registerServiceWorker();
