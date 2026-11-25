/* ============================================================
   京东物流官网复刻 · 页面入口  assets/js/main.js
   ------------------------------------------------------------
   职责：
     1. 读取 <body data-base / data-page / data-nav> 三个标记
        - data-base：站点根目录相对路径（首页为空，子页为 "../"）
        - data-page：当前页面类型（home / express / supply / about）
        - data-nav ：当前高亮的导航 key
     2. 注入公共页头页脚
     3. 按页面类型渲染数据驱动的卡片列表（内容来自 config.js）
     4. 初始化该页需要的交互
   ============================================================ */

(function (JDL) {
  'use strict';

  var body = document.body;
  var cfg = JDL.config;

  /* ---------- 1. 路径基准 ---------- */
  JDL.base = body.getAttribute('data-base') || '';

  function $(sel) { return document.querySelector(sel); }

  function icon(name) { return JDL.icon(name); }

  /* ============================================================
     2. 数据渲染：首页各卡片区
     ============================================================ */

  /* 2.1 十项业务入口 */
  function renderServices() {
    var box = $('#servicesGrid');
    if (!box) return;

    box.innerHTML = cfg.services.map(function (item, i) {
      var href = item.href && item.href !== '#'
        ? 'href="' + JDL.url(item.href) + '"'
        : 'href="#" data-soon="1"';
      return [
        '<a class="service-card" ' + href + ' data-reveal data-delay="' + (i % 5 + 1) + '">',
        '  <span class="service-card__icon"><img src="' + JDL.url(item.icon) + '" alt="' + item.name + '" loading="lazy"></span>',
        '  <span class="service-card__name">' + item.name + '</span>',
        '  <span class="service-card__arrow">' + icon('arrow') + '</span>',
        '</a>'
      ].join('');
    }).join('');
  }

  /* 2.2 行业解决方案：右侧 6 张卡 + 左侧默认文案 */
  function renderIndustries() {
    var grid = $('#industryGrid');
    if (!grid) return;

    grid.innerHTML = cfg.industries.map(function (item, i) {
      return [
        '<button class="industry-card' + (i === 0 ? ' is-active' : '') + '" type="button"',
        '        data-key="' + item.key + '" data-reveal data-delay="' + (i + 1) + '">',
        '  <img src="' + JDL.url(item.icon) + '" alt="' + item.name + '行业" loading="lazy">',
        '  <span>' + item.name + '</span>',
        '</button>'
      ].join('');
    }).join('');

    /* 左侧面板填入第一个行业 */
    var first = cfg.industries[0];
    var title = $('#industryTitle');
    var desc = $('#industryDesc');
    var list = $('#industryList');
    var link = $('#industryLink');

    if (title) title.textContent = first.name + '行业解决方案';
    if (desc) desc.textContent = first.desc;
    if (list) {
      list.innerHTML = first.points.map(function (p) {
        return '<li>' + icon('check') + '<span>' + p + '</span></li>';
      }).join('');
    }
    if (link) link.textContent = '了解' + first.name + '行业方案';
  }

  /* 2.3 物流网络：三个数据 + 四项能力 */
  function renderNetwork() {
    var statsBox = $('#networkStats');
    var featureBox = $('#networkFeatures');

    if (statsBox) {
      statsBox.innerHTML = cfg.network.stats.map(function (s, i) {
        return [
          '<div class="network__stat" data-reveal data-delay="' + (i + 1) + '">',
          '  <div class="c-stat__num"><span data-count="' + s.value + '">0</span>' + s.suffix + '<em>' + s.unit + '</em></div>',
          '  <div class="c-stat__label">' + s.label + '</div>',
          '</div>'
        ].join('');
      }).join('');
    }

    if (featureBox) {
      featureBox.innerHTML = cfg.network.features.map(function (f, i) {
        return [
          '<div class="network__feature" data-reveal data-delay="' + (i + 1) + '">',
          '  <span class="network__feature-icon">' + icon(f.icon) + '</span>',
          '  <span><b>' + f.title + '</b><small>' + f.desc + '</small></span>',
          '</div>'
        ].join('');
      }).join('');
    }
  }

  /* 2.4 新闻动态 */
  function renderNews() {
    var box = $('#newsGrid');
    if (!box) return;

    var cards = cfg.news.map(function (n, i) {
      var href = n.href && n.href !== '#'
        ? 'href="' + JDL.url(n.href) + '"'
        : 'href="#" data-soon="1"';
      return [
        '<a class="news-card" ' + href + ' data-reveal data-delay="' + (i + 1) + '">',
        '  <div class="news-card__media"><img src="' + JDL.url(n.img) + '" alt="' + n.title.replace(/"/g, '') + '" loading="lazy"></div>',
        '  <div class="news-card__body">',
        '    <div class="news-card__meta"><span class="c-tag">新闻</span><span>' + n.date + '</span></div>',
        '    <h3 class="news-card__title u-clamp-2">' + n.title + '</h3>',
        '    <span class="news-card__more">阅读全文 ' + icon('arrow') + '</span>',
        '  </div>',
        '</a>'
      ].join('');
    });

    /* 补一张"更多动态"引导卡，把 4 列栅格填满（官方首页也提供更多新闻/活动入口） */
    cards.push([
      '<a class="news-card news-card--more" href="#" data-soon="1" data-reveal data-delay="4">',
      '  <span class="news-card__label">More</span>',
      '  <h3>更多新闻<br>与品牌活动</h3>',
      '  <span class="news-card__more">进入新闻中心 ' + icon('arrow') + '</span>',
      '</a>'
    ].join(''));

    box.innerHTML = cards.join('');
  }

  /* 2.5 子页：产品矩阵 / 能力卡片 / 时间轴 / 荣誉 */
  function renderInnerLists() {
    /* 寄快递产品 */
    var productBox = $('#productGrid');
    if (productBox) {
      productBox.innerHTML = cfg.products.map(function (p, i) {
        return [
          '<article class="product-card" data-reveal data-delay="' + (i % 3 + 1) + '">',
          '  <div class="product-card__icon">' + icon(p.icon || 'box') + '</div>',
          '  <h3 class="product-card__name">' + p.name + '<span class="c-tag">' + p.tag + '</span></h3>',
          '  <p class="product-card__desc">' + p.desc + '</p>',
          '  <ul class="product-card__list">',
                 p.points.map(function (pt) {
                   return '<li>' + icon('check') + '<span>' + pt + '</span></li>';
                 }).join(''),
          '  </ul>',
          '</article>'
        ].join('');
      }).join('');
    }

    /* 仓配一体能力 */
    var capBox = $('#capabilityGrid');
    if (capBox) {
      capBox.innerHTML = cfg.capabilities.map(function (c, i) {
        return [
          '<article class="capability" data-reveal data-delay="' + (i % 3 + 1) + '">',
          '  <div class="capability__top">',
          '    <span class="capability__icon">' + icon(c.icon || 'layers') + '</span>',
          '    <span class="capability__index">0' + (i + 1) + '</span>',
          '  </div>',
          '  <h3 class="capability__title">' + c.title + '</h3>',
          '  <p class="capability__desc">' + c.desc + '</p>',
          '</article>'
        ].join('');
      }).join('');
    }

    /* 发展历程 */
    var timelineBox = $('#timeline');
    if (timelineBox) {
      timelineBox.innerHTML = cfg.milestones.map(function (m, i) {
        return [
          '<div class="c-timeline__item" data-reveal data-delay="' + (i + 1) + '">',
          '  <div class="c-timeline__year">' + m.year + '</div>',
          '  <div class="c-timeline__title">' + m.title + '</div>',
          '  <p class="c-timeline__desc">' + m.desc + '</p>',
          '</div>'
        ].join('');
      }).join('');
    }

    /* 荣誉 */
    var honorBox = $('#honorGrid');
    if (honorBox) {
      honorBox.innerHTML = cfg.honors.map(function (h, i) {
        return [
          '<article class="honor" data-reveal data-delay="' + (i + 1) + '">',
          '  <span class="honor__icon">' + icon('trophy') + '</span>',
          '  <div>',
          '    <h3 class="honor__title">' + h.title + '</h3>',
          '    <p class="honor__desc">' + h.desc + '</p>',
          '  </div>',
          '</article>'
        ].join('');
      }).join('');
    }

    /* 常见问题：先渲染条目，再由 ui.initAccordion 统一绑定点击 */
    var faqBox = $('#faqAccordion');
    if (faqBox) {
      faqBox.innerHTML = cfg.faq.map(function (item) {
        return [
          '<div class="c-accordion__item">',
          '  <button class="c-accordion__btn" type="button" aria-expanded="false">',
          '    <span>' + item.q + '</span>',
          '    <span class="c-accordion__icon" aria-hidden="true"></span>',
          '  </button>',
          '  <div class="c-accordion__panel">',
          '    <div class="c-accordion__panel-inner">' + item.a + '</div>',
          '  </div>',
          '</div>'
        ].join('');
      }).join('');
    }
  }

  /* ============================================================
     3. 启动
     ============================================================ */
  function boot() {
    /* 3.1 公共头尾 */
    JDL.ui.mountChrome(body.getAttribute('data-nav') || '');

    /* 3.2 数据渲染 */
    renderServices();
    renderIndustries();
    renderNetwork();
    renderNews();
    renderInnerLists();

    /* 3.3 页面级交互 */
    var page = body.getAttribute('data-page') || 'home';

    if (page === 'home') {
      /* 促销轮播 */
      if ($('#promoCarousel')) {
        JDL.createCarousel($('#promoCarousel'), { interval: 5000 });
      }
      JDL.ui.initIndustryTabs();
      JDL.ui.initExpressTabs();
    }

    if (page === 'express') {
      JDL.ui.initQuote();
      JDL.ui.initAccordion();
    }

    /* 页面刚渲染完，重新观察一次入场动画元素（动态插入的卡片也要生效） */
    if (JDL.refreshReveal) JDL.refreshReveal();
    if (JDL.refreshCounters) JDL.refreshCounters();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})(window.JDL);
