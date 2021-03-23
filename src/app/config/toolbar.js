export default {
  items: [
    {
      className: 'nav-icon-only',
      icon: 'bars',
      component: 'nav-sidebar-toggle'
    },
    /*
    {
      label: 'google.com',
      url: 'http://google.com'
    },
    {
      icon: 'coffee',
      label: 'sub 1',
      slot: 'end',
      order: -1,
      items: [
        { label: 'fff' },
        { label: 'vvv' },
        { divider: true },
        {
          icon: 'coffee',
          label: 'sub',
          items: [
            { label: 'ddd' },
            { label: 'ccc' },
            { label: 'www', url: 'google.com' }
          ]
        }
      ],
      component: 'nav-dropdown'
    },
    */
    {
      // label: 'Search',
      hidden: true,
      slot: 'end',
      placeholder: 'Search',
      className: 'nav-icon-only',
      component: 'nav-search'
    },
    {
      slot: 'end',
      component: 'nav-divider'
    },
    {
      slot: 'end',
      component: 'nav-user-badge'
    },
    {
      slot: 'end',
      className: 'nav-icon-only',
      icon: 'list-ul',
      component: 'nav-toggle',
      target: 'panel.expand'
    }
  ]
};
