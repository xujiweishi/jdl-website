/* ============================================================
   京东物流官网复刻 · 交互层  assets/js/ui.js
   ------------------------------------------------------------
   职责：所有"行为"逻辑，与样式、内容解耦。
     §1 页头 / 下拉菜单 / 移动抽屉
     §2 滚动相关：吸顶阴影、回到顶部、入场动画、数字滚动
     §3 内容交互：行业切换、快递/快运切换、折叠面板
     §4 运费测算（示例规则）
     §5 轻提示
   ============================================================ */

window.JDL = window.JDL || {};

(function (JDL) {
  'use strict';

  var C = JDL.config;

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ============================================================
     §5 轻提示（放在前面，其他模块会调用）
     ============================================================ */
  var toastTimer = null;
  function toast(msg) {
    var el = $('#siteToast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('is-show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      el.classList.remove('is-show');
    }, 2600);
  }
  JDL.toast = toast;

  /* ============================================================
     §1 页头
     ============================================================ */
  function bindSoonLinks(scope) {
    $$('[data-soon]', scope).forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        toast('该栏目是官网入口，本复刻示例暂未展开');
      });
    });
  }

  function bindMegaMenu() {
    $$('.nav__item').forEach(function (item) {
      var panel = $('.megamenu', item);
      if (!panel) return;

      var trigger = $('.nav__link', item);
      var closeTimer = null;

      function open() {
        window.clearTimeout(closeTimer);
        $$('.nav__item').forEach(function (other) {
          if (other !== item) {
            other.classList.remove('is-open');
            var tg = $('.nav__link', other);
            if (tg && tg.tagName === 'BUTTON') tg.setAttribute('aria-expanded', 'false');
          }
        });
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
      function close() {
        item.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      }
      function closeLater() {
        window.clearTimeout(closeTimer);
        closeTimer = window.setTimeout(close, 140);
      }

      item.addEventListener('mouseenter', open);
      item.addEventListener('mouseleave', closeLater);
      panel.addEventListener('mouseenter', open);
      panel.addEventListener('mouseleave', closeLater);

      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        if (item.classList.contains('is-open')) close(); else open();
      });

      item.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { close(); trigger.focus(); }
      });
    });

    /* 点击页面其他区域关闭菜单 */
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav__item')) {
        $$('.nav__item').forEach(function (item) {
          item.classList.remove('is-open');
          var tg = $('.nav__link', item);
          if (tg && tg.tagName === 'BUTTON') tg.setAttribute('aria-expanded', 'false');
        });
      }
    });
  }

  function bindDrawer() {
    var drawer = $('#siteDrawer');
    var burger = $('#headerBurger');
    if (!drawer || !burger) return;

    function open() {
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', '关闭菜单');
      document.body.classList.add('is-locked');
    }
    function close() {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', '打开菜单');
      document.body.classList.remove('is-locked');
    }

    burger.addEventListener('click', function () {
      drawer.classList.contains('is-open') ? close() : open();
    });
    $$('[data-drawer-close]', drawer).forEach(function (el) {
      el.addEventListener('click', close);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) close();
    });

    /* 抽屉内二级菜单展开 */
    $$('[data-drawer-group] .drawer__toggle', drawer).forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var group = btn.closest('.drawer__group');
        var open = group.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });

    /* 点击抽屉里的真实链接后自动收起 */
    $$('.drawer__sub a', drawer).forEach(function (a) {
      a.addEventListener('click', function () {
        if (a.getAttribute('href') && a.getAttribute('href') !== '#') close();
      });
    });
  }

  function bindSearch() {
    var form = $('#headerSearch');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var q = form.querySelector('input').value.trim();
      toast(q ? '演示站点未接入搜索服务：' + q : '请输入要搜索的内容');
    });
  }

  /* ============================================================
     §2 滚动相关
     ============================================================ */
  function bindScroll() {
    var header = $('#siteHeader');
    var toTop = $('#toTop');
    var prev = window.scrollY;

    function onScroll() {
      var y = window.scrollY;
      if (header) {
        if (y > 8) header.classList.add('is-stuck');
        else header.classList.remove('is-stuck');

        /* 向下滚动时收起下拉菜单，避免遮挡 */
        if (y > prev && y > 120) {
          $$('.nav__item').forEach(function (item) { item.classList.remove('is-open'); });
        }
      }
      if (toTop) toTop.classList.toggle('is-show', y > 480);
      prev = y;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (toTop) {
      toTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  function initReveal() {
    /* 只处理尚未入场的元素：这样可以在动态插入卡片后重复调用 */
    var items = $$('[data-reveal]:not(.is-in)');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    items.forEach(function (el) { io.observe(el); });
  }

  /* 数字滚动：读取 data-count，滚动到可视区后播放一次 */
  function initCounters() {
    var nums = $$('[data-count]:not([data-counted])');
    if (!nums.length) return;

    function run(el) {
      el.setAttribute('data-counted', '1');   // 标记，避免重复播放
      var target = parseFloat(el.getAttribute('data-count')) || 0;
      var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      var duration = 1400;
      var start = null;

      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);       // easeOutCubic
        el.textContent = (target * eased).toFixed(decimals);
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target.toFixed(decimals);
      }
      requestAnimationFrame(step);
    }

    if (!('IntersectionObserver' in window)) {
      nums.forEach(run);
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          run(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    nums.forEach(function (el) { io.observe(el); });
  }

  /* ============================================================
     §3 内容交互
     ============================================================ */

  /* 3.1 首页行业解决方案：点右侧行业卡，左侧文案联动 */
  function initIndustryTabs() {
    var grid = $('#industryGrid');
    var panel = $('#solutionsPanel');
    if (!grid || !panel) return;

    var titleEl = $('#industryTitle', panel);
    var descEl = $('#industryDesc', panel);
    var listEl = $('#industryList', panel);
    var linkEl = $('#industryLink', panel);

    grid.addEventListener('click', function (e) {
      var card = e.target.closest('.industry-card');
      if (!card) return;
      var key = card.getAttribute('data-key');
      var data = C.industries.filter(function (it) { return it.key === key; })[0];
      if (!data) return;

      $$('.industry-card', grid).forEach(function (el) { el.classList.remove('is-active'); });
      card.classList.add('is-active');

      /* 文案切换时做一个轻微的淡出 → 更新 → 淡入 */
      panel.style.opacity = '0.35';
      window.setTimeout(function () {
        titleEl.textContent = data.name + '行业解决方案';
        descEl.textContent = data.desc;
        listEl.innerHTML = data.points.map(function (p) {
          return '<li>' + JDL.icon('check') + '<span>' + p + '</span></li>';
        }).join('');
        if (linkEl) linkEl.textContent = '了解' + data.name + '行业方案';
        panel.style.opacity = '1';
      }, 160);
    });
  }

  /* 3.2 首页快递 / 快运页签 */
  function initExpressTabs() {
    var tabs = $('#expressTabs');
    var chipsBox = $('#expressChips');
    if (!tabs || !chipsBox) return;

    function render(key) {
      var data = C.expressTabs[key];
      if (!data) return;
      chipsBox.innerHTML = data.chips.map(function (name, i) {
        var isMore = name === '查看更多';
        var cls = 'c-chip';
        var href = isMore ? data.href : '#';
        var attrs = isMore ? 'href="' + JDL.url(href) + '"' : 'href="#" data-soon="1"';
        return '<a class="' + cls + '" ' + attrs + '>' + name +
               (isMore ? JDL.icon('arrow') : '') + '</a>';
      }).join('');
      bindSoonLinks(chipsBox);
    }

    $$('.express__tab', tabs).forEach(function (btn) {
      btn.addEventListener('click', function () {
        $$('.express__tab', tabs).forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        render(btn.getAttribute('data-tab'));
      });
    });

    render('express');
  }

  /* 3.3 折叠面板 */
  function initAccordion() {
    var box = $('.c-accordion');
    if (!box) return;

    $$('.c-accordion__item', box).forEach(function (item) {
      var btn = $('.c-accordion__btn', item);
      if (!btn) return;
      btn.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');
        /* 单开模式：先关掉其他项 */
        $$('.c-accordion__item', box).forEach(function (other) {
          other.classList.remove('is-open');
          var b = $('.c-accordion__btn', other);
          if (b) b.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    /* 默认展开第一项 */
    var first = $('.c-accordion__item', box);
    if (first) {
      first.classList.add('is-open');
      var b = $('.c-accordion__btn', first);
      if (b) b.setAttribute('aria-expanded', 'true');
    }
  }

  /* ============================================================
     §4 运费测算（仅演示算法，不代表官方报价）
     ============================================================ */
  function initQuote() {
    var form = $('#quoteForm');
    if (!form) return;

    var fromSel = $('#fromCity', form);
    var toSel = $('#toCity', form);
    var weightInput = $('#goodsWeight', form);
    var typeSel = $('#goodsType', form);
    var result = $('#quoteResult');
    var priceEl = $('#quotePrice');
    var timeEl = $('#quoteTime');
    var weightEl = $('#quoteWeightOut');

    var cities = C.quote.cities;
    cities.forEach(function (city) {
      fromSel.insertAdjacentHTML('beforeend', '<option value="' + city.name + '">' + city.name + '</option>');
      toSel.insertAdjacentHTML('beforeend', '<option value="' + city.name + '">' + city.name + '</option>');
    });
    fromSel.value = '北京';
    toSel.value = '上海';

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var from = cities.filter(function (c) { return c.name === fromSel.value; })[0];
      var to = cities.filter(function (c) { return c.name === toSel.value; })[0];
      var weight = Math.max(1, parseFloat(weightInput.value) || 1);
      var typeMul = parseFloat(typeSel.value) || 1;

      if (from.name === to.name) {
        toast('寄件城市与收件城市不能相同');
        return;
      }

      /* 区域差越大，首重与续重越高（zone 1-6） */
      var zone = Math.min(6, Math.abs(from.zone - to.zone) + 1);
      var rule = C.quote.rules[zone];

      var chargeWeight = Math.ceil(weight);                 // 按整公斤进位
      var extra = Math.max(0, chargeWeight - 1);
      var price = (rule.first + extra * rule.next) * typeMul;

      priceEl.innerHTML = price.toFixed(0) + '<span>元</span>';
      timeEl.innerHTML = rule.days + '<span>天</span>';
      weightEl.innerHTML = chargeWeight + '<span>kg 计费重量</span>';
      result.classList.add('is-show');
    });
  }

  /* ============================================================
     对外接口
     ============================================================ */
  JDL.ui = {
    /* 注入页头页脚并绑定通用交互；activeKey 用于高亮当前栏目 */
    mountChrome: function (activeKey) {
      var headerSlot = $('#siteHeaderSlot');
      var footerSlot = $('#siteFooterSlot');
      if (headerSlot) headerSlot.innerHTML = JDL.components.header(activeKey);
      if (footerSlot) footerSlot.innerHTML = JDL.components.footer();

      bindSoonLinks(document);
      bindMegaMenu();
      bindDrawer();
      bindSearch();
      bindScroll();
      initReveal();
      initCounters();
    },
    initIndustryTabs: initIndustryTabs,
    initExpressTabs: initExpressTabs,
    initAccordion: initAccordion,
    initQuote: initQuote,
    toast: toast
  };

  /* 动态内容渲染后，重新扫描新加入的动画 / 数字元素 */
  JDL.refreshReveal = initReveal;
  JDL.refreshCounters = initCounters;

})(window.JDL);
