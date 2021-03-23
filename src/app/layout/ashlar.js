const preCompute = state => {
  let layout = { ...state.layout };
  let content = { ...state.content };
  let tlb = { ...state.toolbar };
  let nav = { ...state.navbar };
  let pnl = { ...state.panel };
  let hasNav = nav.enabled && nav.shown;
  let hasPnl = pnl.enabled && pnl.shown;

  let navPnlJoined =
    hasNav &&
    hasPnl &&
    nav.position === pnl.position &&
    !nav.offCanvas &&
    !pnl.offCanvas;

  if (content.fullPage) {
    tlb.enabled = false;
    nav.enabled = false;
    pnl.enabled = false;
  }

  return {
    layout,
    content,
    tlb,
    nav,
    pnl,
    hasNav,
    hasPnl,
    navPnlJoined
  };
};

const computePanel = (src, state) => {
  let { tlb } = state;

  return [
    'ash-panel',
    'ash-' + src.position,
    { ['ash-' + src.mode || 'none']: src.offCanvas },
    { 'ash-vertical': src.position !== 'top' },
    { 'ash-horizontal': src.position === 'top' },
    { 'ash-enabled': src.enabled },
    { 'ash-shown': src.shown },
    { 'ash-compact': src.compact },
    { 'ash-off-canvas': src.offCanvas },
    { 'ash-expand': src.expand },
    { 'ash-offset-top': tlb.enabled && tlb.shown && tlb.position === 'top' }
  ];
};

const computeSideOffsets = (src, state) => {
  let { tlb, nav, pnl, hasNav, hasPnl, navPnlJoined } = state;

  if (state.content.fullPage) {
    return [];
  }

  let navCompact = nav.compact || nav.expand;
  let pnlCompact = pnl.compact || pnl.expand;
  hasNav = hasNav && !nav.offCanvas;
  hasPnl = hasPnl && !pnl.offCanvas;

  return [
    {
      'ash-offset-left':
        !navPnlJoined && hasNav && nav.position === 'left' && !navCompact
    },
    {
      'ash-offset-left-compact':
        !navPnlJoined && hasNav && nav.position === 'left' && navCompact
    },
    {
      'ash-offset-right':
        !navPnlJoined && hasNav && nav.position === 'right' && !navCompact
    },
    {
      'ash-offset-right-compact':
        !navPnlJoined && hasNav && nav.position === 'right' && navCompact
    },
    {
      'ash-offset-left':
        !navPnlJoined && hasPnl && pnl.position === 'left' && !pnlCompact
    },
    {
      'ash-offset-left-compact':
        !navPnlJoined && hasPnl && pnl.position === 'left' && pnlCompact
    },
    {
      'ash-offset-right':
        !navPnlJoined && hasPnl && pnl.position === 'right' && !pnlCompact
    },
    {
      'ash-offset-right-compact':
        !navPnlJoined && hasPnl && pnl.position === 'right' && pnlCompact
    },

    {
      'ash-offset-left-compact-compact':
        navPnlJoined && nav.position === 'left' && navCompact && pnlCompact
    },
    {
      'ash-offset-left-compact-wide':
        navPnlJoined && nav.position === 'left' && navCompact != pnlCompact
    },
    {
      'ash-offset-left-wide-wide':
        navPnlJoined && nav.position === 'left' && !navCompact && !pnlCompact
    },
    {
      'ash-offset-right-compact-compact':
        navPnlJoined && nav.position === 'right' && navCompact && pnlCompact
    },
    {
      'ash-offset-right-compact-wide':
        navPnlJoined && nav.position === 'right' && navCompact != pnlCompact
    },
    {
      'ash-offset-right-wide-wide':
        navPnlJoined && nav.position === 'right' && !navCompact && !pnlCompact
    }
  ];
};

export default {
  calculateLayoutClassList: state => {
    let computedState = preCompute(state);
    let {
      layout,
      content,
      tlb,
      nav,
      pnl,
      hasNav,
      hasPnl,
      navPnlJoined
    } = computedState;

    let res = {
      layout: [
        'ash-grid',
        { 'ash-debug-border': state.debug.border },
        { 'ash-boxed': layout.boxed },
        { 'ash-gap': layout.gap }
      ],
      toolbar: [
        'ash-panel',
        'ash-toolbar',
        { 'ash-shown': tlb.shown },
        'ash-' + tlb.position,
        { 'ash-enabled': tlb.enabled },
        { 'ash-sticky': tlb.sticky },
        ...(tlb.position === 'inside'
          ? computeSideOffsets(content, computedState)
          : [])
      ],
      navbar: [
        'ash-navbar',
        ...computePanel(nav, computedState),
        { 'ash-offset-top': hasNav && nav.position === 'top' },
        {
          'ash-offset-left':
            nav.position === 'left' &&
            hasPnl &&
            pnl.position === 'left' &&
            !pnl.compact
        },
        {
          'ash-offset-left-compact':
            nav.position === 'left' &&
            hasPnl &&
            pnl.position === 'left' &&
            pnl.compact
        },
        {
          'ash-offset-right':
            nav.position === 'right' &&
            hasPnl &&
            pnl.position === 'right' &&
            !pnl.compact
        },
        {
          'ash-offset-right-compact':
            nav.position === 'right' &&
            hasPnl &&
            pnl.position === 'right' &&
            pnl.compact
        }
      ],
      panel: [
        'ash-extra',
        ...computePanel(pnl, computedState),
        { 'ash-offset-top-double': hasNav && nav.position === 'top' }
      ],
      content: [
        'ash-content',
        { 'ash-enabled': content.enabled },
        {
          'ash-offset-top': tlb.enabled && tlb.shown && tlb.position === 'top'
        },
        { 'ash-offset-top-double': hasNav && nav.position === 'top' },
        ...computeSideOffsets(content, computedState)
      ],
      overlay: [
        'ash-overlay',
        { 'ash-enabled': state.overlay.enabled },
        { 'ash-transparent': state.overlay.transparent }
      ]
    };

    return { contentClass: res };
  }
};
