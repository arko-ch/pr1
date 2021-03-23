export default {
  app: {
    id: 'settlement-app-client',
    server: {
      url: 'http://localhost:1338'
    }
  },

  auth: {
    // okta: {
    //   issuer: 'https://scalablelegal.okta.com/',
    //   client_id: '0oaey28465JovDCrA356',
    //   base_url: 'http://localhost:5000',
    //   redirect_uri: 'http://localhost:5000/authorization-code/callback',
    //   scope: 'openid profile'
    // }
    okta: {
      url: 'https://dev-249911.okta.com/',
      issuer: 'default',
      client_id: '0oah1o4j4MfGdBGx7356',
      base_url: 'http://localhost:3000',
      redirect_uri: 'http://localhost:3000',
      scopes: ['openid', 'email', 'profile']
    },
    twilio: {
      twilioAccountSid: 'AC664848f64e8358400dc5ac40afd494fd',
      twilioApiKey: 'SK1bb7f83fc553a77fdee3f2b50e4b3f5b',
      twilioApiSecret: 'BU0R3dClbywOcPTkokLH1omD2c2bGi3G'
    }
  },

  ui: {
    // colorScheme: 'white',
    // enableFixedHeader: false,
    // enableFixedSidebar: false,
    // enableFixedFooter: false,
    // closedSmallerSidebar: false,
    // enableMobileMenu: false,
    // enablePageTabsAlt: false,
    // sidebar
    // enableBackgroundImage: false,
    // enableSidebarShadow: false,
    // backgroundColor: null,
    // backgroundImage: null,
    // backgroundImageOpacity: null
  },
  returnEnv() {
    var propertyIdFromURL = window.location.href.toString();
    if (propertyIdFromURL.includes('dev'))
      return 'http://dev.settlementapp99.com/';
    if (propertyIdFromURL.includes('localhost'))
      return 'http://localhost:1338/';
  }
};
