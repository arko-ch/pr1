export default {
  items: [
    {
      component: 'nav-brand',
      label: 'Settlement',
      icons: {
        expand: 'bars',
        close: 'times',
        compact: 'arrow-left'
      }
    },

    {
      label: 'Entitled',
      icon: 'pe-7s-mail',
      items: [
        {
          label: 'Template',
          url: '/#/mailbox'
        },
        {
          label: 'Assign Email',
          url: '/#/assignemail'
        }
      ]
    },

    {
      label: 'Dashboard',
      icon: 'pe-7s-light',
      url: '/#/dashboard'
    },
    
   /*  {
      component: 'nav-divider'
    },
  
    {
      component: 'nav-divider'
    }, */

   
  ]
};
