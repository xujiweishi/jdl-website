/* ============================================================
   京东物流官网复刻 · 轮播组件  assets/js/carousel.js
   ------------------------------------------------------------
   用法：
     JDL.createCarousel(document.getElementById('promoCarousel'), {
       interval: 5000,       // 自动播放间隔（毫秒），0 表示不自动播放
       loop: true            // 是否循环
     });

   依赖的 DOM 结构（见 index.html）：
     <div class="c-carousel" id="promoCarousel">
       <div class="c-carousel__viewport">
         <div class="c-carousel__track">
           <div class="c-carousel__slide">…</div>
       <button class="c-carousel__arrow c-carousel__arrow--prev">
       <button class="c-carousel__arrow c-carousel__arrow--next">
       <div class="c-carousel__dots"></div>
   ============================================================ */

window.JDL = window.JDL || {};

(function (JDL) {
  'use strict';

  JDL.createCarousel = function (root, options) {
    if (!root) return null;

    var opt = Object.assign({
      interval: 5000,
      loop: true
    }, options || {});

    var track = root.querySelector('.c-carousel__track');
    var viewport = root.querySelector('.c-carousel__viewport');
    var slides = Array.prototype.slice.call(root.querySelectorAll('.c-carousel__slide'));
    var dotsBox = root.querySelector('.c-carousel__dots');
    var prevBtn = root.querySelector('.c-carousel__arrow--prev');
    var nextBtn = root.querySelector('.c-carousel__arrow--next');

    if (!track || slides.length === 0) return null;

    var index = 0;
    var timer = null;
    var dots = [];

    /* ---------- 生成指示点 ---------- */
    if (dotsBox) {
      dotsBox.innerHTML = '';
      slides.forEach(function (_, i) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'c-carousel__dot' + (i === 0 ? ' is-active' : '');
        dot.setAttribute('aria-label', '切换到第 ' + (i + 1) + ' 张');
        dot.addEventListener('click', function () {
          go(i);
          restart();
        });
        dotsBox.appendChild(dot);
        dots.push(dot);
      });
    }

    /* ---------- 核心：位移 ---------- */
    function render() {
      track.style.transform = 'translateX(' + (-index * 100) + '%)';
      dots.forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === index);
      });
      // 无障碍：隐藏非当前页
      slides.forEach(function (slide, i) {
        slide.setAttribute('aria-hidden', i === index ? 'false' : 'true');
      });
    }

    function go(next) {
      if (opt.loop) {
        index = (next + slides.length) % slides.length;
      } else {
        index = Math.max(0, Math.min(slides.length - 1, next));
      }
      render();
    }

    function next() { go(index + 1); }
    function prev() { go(index - 1); }

    /* ---------- 自动播放 ---------- */
    function play() {
      if (!opt.interval || slides.length < 2) return;
      stop();
      timer = window.setInterval(next, opt.interval);
    }
    function stop() {
      if (timer) { window.clearInterval(timer); timer = null; }
    }
    function restart() {
      stop();
      play();
    }

    /* 鼠标悬停 / 触摸 / 页面不可见时暂停，避免打扰阅读 */
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', play);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', play);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else play();
    });

    /* ---------- 箭头 ---------- */
    if (prevBtn) prevBtn.addEventListener('click', function () { prev(); restart(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { next(); restart(); });

    /* ---------- 键盘 ---------- */
    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { prev(); restart(); }
      if (e.key === 'ArrowRight') { next(); restart(); }
    });

    /* ---------- 触摸滑动 ---------- */
    var startX = 0, deltaX = 0, dragging = false;
    viewport.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
      dragging = true;
      deltaX = 0;
      stop();
    }, { passive: true });

    viewport.addEventListener('touchmove', function (e) {
      if (!dragging) return;
      deltaX = e.touches[0].clientX - startX;
    }, { passive: true });

    viewport.addEventListener('touchend', function () {
      if (!dragging) return;
      dragging = false;
      if (Math.abs(deltaX) > 45) {
        deltaX < 0 ? next() : prev();
      }
      play();
    });

    render();
    play();

    /* 返回控制句柄，便于页面按需暂停（如弹窗打开时） */
    return { go: go, next: next, prev: prev, play: play, stop: stop };
  };

})(window.JDL);
