/* ============================================================
   京东物流官网复刻 · 公共组件  assets/js/components.js
   ------------------------------------------------------------
   职责：把"全站复用"的页头、下拉大菜单、移动端抽屉、页脚
        以模板字符串的形式拼出来，由 main.js 注入到页面占位节点。
   好处：改一次导航 / 页脚，全站四个页面同时生效。
   注意：这里只做"渲染"，交互行为统一放在 ui.js。
   ============================================================ */

window.JDL = window.JDL || {};

(function (JDL) {
  'use strict';

  var C = JDL.config;

  /* ============================================================
     1. 内联 SVG 图标库
     ------------------------------------------------------------
     统一用 stroke 描边风格，颜色跟随 currentColor，便于换色
     ============================================================ */
  var ICONS = {
    search:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><circle cx="11" cy="11" r="7"></circle><path d="M20.5 20.5 16 16"></path></svg>',
    phone:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z"></path></svg>',
    arrow:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 12h13"></path><path d="M13 6l6 6-6 6"></path></svg>',
    arrowUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 19V5"></path><path d="M6 11l6-6 6 6"></path></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 9l6 6 6-6"></path></svg>',
    check:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 12.5l5 5L20 6.5"></path></svg>',
    globe:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="8.5"></circle><path d="M3.5 12h17M12 3.5c2.6 2.4 4 5.3 4 8.5s-1.4 6.1-4 8.5c-2.6-2.4-4-5.3-4-8.5S9.4 5.9 12 3.5Z"></path></svg>',
    layers:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M12 3.5 3.5 8 12 12.5 20.5 8 12 3.5Z"></path><path d="M3.5 12.5 12 17l8.5-4.5"></path><path d="M3.5 17 12 21.5 20.5 17"></path></svg>',
    chain:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M9 15l-2 2a3.5 3.5 0 0 1-5-5l3-3a3.5 3.5 0 0 1 5 0"></path><path d="M15 9l2-2a3.5 3.5 0 0 1 5 5l-3 3a3.5 3.5 0 0 1-5 0"></path><path d="M9.5 14.5 14.5 9.5"></path></svg>',
    clock:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"></circle><path d="M12 7.5V12l3.2 2"></path></svg>',
    shield:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M12 3.5 5 6v6c0 4 3 6.6 7 8.5 4-1.9 7-4.5 7-8.5V6l-7-2.5Z"></path><path d="M9 12l2 2 4-4.5"></path></svg>',
    medal:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="14.5" r="4.5"></circle><path d="M9 10.5 7 3.5h4l1 3 1-3h4l-2 7"></path></svg>',
    trophy:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M7.5 4h9v5.5a4.5 4.5 0 0 1-9 0z"></path><path d="M7.5 5.5H5a2.5 2.5 0 0 0 2.5 3.5M16.5 5.5H19a2.5 2.5 0 0 1-2.5 3.5"></path><path d="M12 13.5v4M8.8 20.5h6.4"></path></svg>',
    truck:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M3 6.5h10v9H3z"></path><path d="M13 9.5h4l3 3.2v2.8h-7z"></path><circle cx="7" cy="17" r="1.6"></circle><circle cx="17" cy="17" r="1.6"></circle></svg>',
    box:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z"></path><path d="M4 7l8 4 8-4M12 11v10"></path></svg>',
    snow:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9"></path><path d="M9.5 5l2.5 2 2.5-2M9.5 19l2.5-2 2.5 2"></path></svg>',
    gift:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M3.5 9.5h17v3h-17zM5 12.5v8h14v-8"></path><path d="M12 9.5v11M12 9.5c-1-3-3-4.5-4.5-3.5S7.8 9.5 12 9.5Zm0 0c1-3 3-4.5 4.5-3.5S16.2 9.5 12 9.5Z"></path></svg>',
    pin:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Z"></path><circle cx="12" cy="10" r="2.6"></circle></svg>',
    mail:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3" y="5.5" width="18" height="13" rx="2"></rect><path d="M3.8 7l8.2 6 8.2-6"></path></svg>',
    spark:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M12 3.5l1.9 5.1L19 10.5l-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9L12 3.5Z"></path></svg>'
  };

  JDL.icon = function (name) {
    return ICONS[name] || '';
  };

  /* ============================================================
     2. 小工具
     ============================================================ */
  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* 只有真正实现了的页面才给出真实链接，其余用 # 并标记 data-soon，
     由 ui.js 统一弹"示例未实现"提示 */
  function linkAttrs(href) {
    if (!href || href === '#') return 'href="#" data-soon="1"';
    return 'href="' + esc(JDL.url(href)) + '"';
  }

  /* ============================================================
     3. 页头
     ============================================================ */
  var logo = [
    '<a class="logo" href="' + esc(JDL.url('index.html')) + '" aria-label="京东物流首页">',
    '  <span class="logo__mark">JDL</span>',
    '  <span class="logo__text">',
    '    <span class="logo__name">' + esc(C.brand.name) + '</span>',
    '    <span class="logo__sub">' + esc(C.brand.en) + '</span>',
    '  </span>',
    '</a>'
  ].join('');

  function navItem(item, activeKey) {
    var isActive = item.key === activeKey;
    var hasMega = !!item.mega;

    var inner = hasMega
      ? '<button class="nav__link' + (isActive ? ' is-active' : '') + '" type="button" aria-expanded="false" aria-haspopup="true">' +
          esc(item.label) + '<span class="nav__caret" aria-hidden="true"></span></button>'
      : '<a class="nav__link' + (isActive ? ' is-active' : '') + '" ' + linkAttrs(item.href) + '>' + esc(item.label) + '</a>';

    return [
      '<div class="nav__item" data-nav-key="' + esc(item.key) + '">',
      inner,
      hasMega ? megaPanel(item.mega) : '',
      '</div>'
    ].join('');
  }

  function megaPanel(megaKey) {
    var mega = C.megas[megaKey];
    if (!mega) return '';

    var cols = mega.columns.map(function (col) {
      var links = col.links.map(function (l) {
        return '<a class="megamenu__link" ' + linkAttrs(l.href) + '>' +
                 '<span>' + esc(l.label) + '</span>' + JDL.icon('arrow') + '</a>';
      }).join('');
      return [
        '<div class="megamenu__col">',
        '  <div class="megamenu__col-title">' + esc(col.title) + '</div>',
        '  <div class="megamenu__list">' + links + '</div>',
        '</div>'
      ].join('');
    }).join('');

    return [
      '<div class="megamenu" role="menu">',
      '  <div class="megamenu__grid">' + cols + '</div>',
      '  <div class="megamenu__foot">',
      '    <p>' + esc(mega.note) + '</p>',
      '    <span class="megamenu__hot">' + esc(mega.hot) + '</span>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function drawerGroup(item) {
    var mega = C.megas[item.mega];
    var links = mega.columns.reduce(function (acc, col) {
      return acc.concat(col.links);
    }, []).map(function (l) {
      return '<a ' + linkAttrs(l.href) + '>' + esc(l.label) + '</a>';
    }).join('');

    return [
      '<div class="drawer__group" data-drawer-group>',
      '  <button class="drawer__toggle" type="button" aria-expanded="false">' + esc(item.label) +
      '    <span class="nav__caret" aria-hidden="true"></span></button>',
      '  <div class="drawer__sub">' + links + '</div>',
      '</div>'
    ].join('');
  }

  JDL.components = {

    header: function (activeKey) {
      var navHtml = C.nav.map(function (item) {
        return navItem(item, activeKey);
      }).join('');

      /* 抽屉：移动端把一级菜单 + 子项全部平铺 */
      var drawerHtml = C.nav.map(function (item) {
        if (item.mega) return drawerGroup(item);
        return '<div class="drawer__group"><a class="drawer__toggle" ' + linkAttrs(item.href) + '>' + esc(item.label) + '</a></div>';
      }).join('');

      return [
        '<div class="topbar">',
        '  <div class="container topbar__inner">',
        '    <div class="topbar__slogan">京东物流<b>省心高效</b></div>',
        '    <div class="topbar__links">',
        '      <a href="#" data-soon="1" class="is-active">企业服务</a>',
        '      <a href="#" data-soon="1">个人服务</a>',
        '      <a href="#" data-soon="1">新闻动态</a>',
        '      <span class="topbar__tel">' + JDL.icon('phone') + '客服热线 ' + esc(C.brand.tel) + '</span>',
        '      <a href="#" data-soon="1">登录 / 注册</a>',
        '    </div>',
        '  </div>',
        '</div>',

        '<header class="header" id="siteHeader">',
        '  <div class="container header__inner">',
        logo,
        '    <nav class="nav" aria-label="主导航">' + navHtml + '</nav>',
        '    <div class="header__tools">',
        '      <form class="header__search" id="headerSearch" role="search">',
        '        ' + JDL.icon('search'),
        '        <input type="search" name="q" placeholder="搜索服务、产品或新闻" aria-label="站内搜索">',
        '      </form>',
        '      <a class="header__cta" ' + linkAttrs('pages/express.html') + '>寄快递 · 查快递</a>',
        '      <button class="header__burger" id="headerBurger" type="button" aria-label="打开菜单" aria-expanded="false"><span></span></button>',
        '    </div>',
        '  </div>',
        '</header>',

        '<div class="drawer" id="siteDrawer" aria-hidden="true">',
        '  <div class="drawer__mask" data-drawer-close></div>',
        '  <aside class="drawer__panel" role="dialog" aria-modal="true" aria-label="移动端菜单">',
        '    <div class="drawer__head">',
        logo,
        '      <button class="drawer__close" type="button" aria-label="关闭菜单" data-drawer-close>✕</button>',
        '    </div>',
        drawerHtml,
        '    <a class="c-btn c-btn--primary drawer__cta" ' + linkAttrs('pages/express.html') + '>寄快递 · 查快递</a>',
        '  </aside>',
        '</div>',

        '<button class="to-top" id="toTop" type="button" aria-label="回到顶部">' + JDL.icon('arrowUp') + '</button>',
        '<div class="toast" id="siteToast" role="status"></div>'
      ].join('');
    },

    /* ============================================================
       4. 页脚
       ============================================================ */
    footer: function () {
      var col = function (title, links) {
        return [
          '<div class="footer__col">',
          '  <h4>' + esc(title) + '</h4>',
          '  <ul>',
          links.map(function (l) {
            return '<li><a ' + linkAttrs(l.href) + '>' + esc(l.label) + '</a></li>';
          }).join(''),
          '  </ul>',
          '</div>'
        ].join('');
      };

      return [
        '<footer class="footer">',
        '  <div class="container">',
        '    <div class="footer__main">',
        '      <div class="footer__brand">',
        logo,
        '        <p class="footer__desc">技术驱动的一体化供应链解决方案与物流服务商，为千万家企业降本增效。</p>',
        '        <div class="footer__tel"><span>客服专线（7×24 小时）</span>' + esc(C.brand.tel) + '</div>',
        '      </div>',

        col('服务与产品', [
          { label: '快递服务', href: 'pages/express.html' },
          { label: '快运服务', href: '#' },
          { label: '仓配一体', href: 'pages/supply-chain.html' },
          { label: '大件服务', href: '#' },
          { label: '冷链服务', href: '#' },
          { label: '国际物流', href: '#' }
        ]),
        col('解决方案', [
          { label: '快消行业', href: '#' },
          { label: '家电家居', href: '#' },
          { label: '3C 数码', href: '#' },
          { label: '汽车行业', href: '#' },
          { label: '生鲜冷链', href: '#' }
        ]),
        col('关于京东物流', [
          { label: '企业介绍', href: 'pages/about.html' },
          { label: '发展历程', href: 'pages/about.html#history' },
          { label: '荣誉资质', href: 'pages/about.html#honor' },
          { label: '新闻中心', href: '#' },
          { label: '联系我们', href: 'pages/about.html#contact' }
        ]),

        '      <div class="footer__col footer__qr">',
        '        <h4>寄快递 · 查快递</h4>',
        '        <img src="' + esc(JDL.url('assets/images/contact/qrcode.jpg')) + '" alt="扫码进入京东快递小程序" loading="lazy">',
        '        <p>扫码进入京东快递<br>小程序自助下单</p>',
        '      </div>',
        '    </div>',

        '    <div class="footer__bottom">',
        '      <div>',
        '        <div>' + esc(C.brand.copyright) + ' · 京ICP备 08008016 号（示例）</div>',
        '        <div class="footer__note">本站为学习用途的静态页面复刻示例，非京东物流官方网站，所有商标与素材版权归原权利人所有。</div>',
        '      </div>',
        '      <div class="footer__bottom-links">',
        '        <a href="#" data-soon="1">隐私政策</a>',
        '        <a href="#" data-soon="1">服务条款</a>',
        '        <a href="#" data-soon="1">营业执照</a>',
        '        <a href="#" data-soon="1">网站地图</a>',
        '      </div>',
        '    </div>',
        '  </div>',
        '</footer>'
      ].join('');
    }
  };

})(window.JDL);
