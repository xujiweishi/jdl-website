# 京东物流官网复刻（静态站点）

对 `https://www.jdl.com/` 首页及主要栏目的静态复刻示例，纯 HTML + CSS + 原生 JS，
**不需要 npm、不需要构建**，双击 `index.html` 即可离线打开。

> 说明：本站为学习用途的复刻示例，非京东物流官方站点。页面中的商标、文案与图片素材
> 版权归原权利人所有；涉及业务报价的"运费测算"为演示算法，不代表官方报价。

---

## 一、目录结构

```
jdl-website/
├── index.html                  # 首页：Hero / 促销轮播 / 十项服务 / 快递快运 / 行业方案 / 物流网络 / 新闻 / 联系
├── README.md                   # 本文件：结构说明与修改指南
│
├── pages/                      # 二级页面（共用同一套页头页脚）
│   ├── express.html            # 寄快递：运费测算、产品矩阵、服务流程、FAQ
│   ├── supply-chain.html       # 仓配一体：能力数据、服务能力、合作流程
│   └── about.html              # 关于我们：公司简介、发展历程、荣誉、联系方式
│
└── assets/
    ├── css/                    # 样式按"层"拆分，顺序即加载顺序
    │   ├── base.css            # ① 变量（品牌色/字号/间距）、重置、排版、工具类
    │   ├── layout.css          # ② 骨架：顶栏、主导航、下拉大菜单、抽屉、页脚
    │   ├── components.css      # ③ 组件：按钮、区块标题、轮播、卡片、折叠、表单、时间轴、CTA
    │   ├── home.css            # ④ 首页各板块私有样式（§1—§8）
    │   └── inner.css           # ⑤ 子页私有样式（页头、查询卡、产品卡、能力卡……）
    │
    ├── js/                     # 逻辑按职责拆分，顺序即加载顺序
    │   ├── config.js           # 内容层：导航树、服务、行业、新闻、FAQ、测算规则……
    │   ├── components.js       # 视图层：页头 / 大菜单 / 抽屉 / 页脚的模板与 SVG 图标库
    │   ├── carousel.js         # 组件逻辑：轮播（自动播放、悬停暂停、手势、键盘）
    │   ├── ui.js               # 交互层：菜单、抽屉、吸顶、入场动画、数字滚动、折叠、测算
    │   └── main.js             # 入口：读取 body 标记 → 注入头尾 → 渲染卡片 → 初始化交互
    │
    └── images/                 # 素材（均来自官网，已本地化，不依赖外链）
        ├── banner/             # 首页 Hero 视觉 + 5 张促销轮播
        ├── service/            # 10 个业务图标 + 货车图
        ├── solution/           # 6 个行业图标
        ├── news/               # 4 张新闻配图
        ├── contact/            # 小程序二维码
        └── bg-*.jpg            # 区块背景（服务 / 方案 / 网络）
```

### 分层原则

| 层 | 文件 | 只负责 |
|---|---|---|
| 基础 | `base.css` / `config.js` | 设计变量、重置、全站内容数据 |
| 骨架 | `layout.css` / `components.js` | 头尾与导航等全站复用结构 |
| 组件 | `components.css` / `carousel.js` | 可复用的 UI 组件与组件行为 |
| 页面 | `home.css`、`inner.css` / `main.js` | 某个页面独有的样式与初始化 |

改样式不会动逻辑，改文案不用动结构：绝大多数调整只需要改 `config.js` 或 `:root` 变量。

---

## 二、页面与导航

| 页面 | 文件 | 对应官网栏目 |
|---|---|---|
| 首页 | `index.html` | 首页 |
| 寄快递 | `pages/express.html` | 服务与产品 → 个人服务 → 寄快递 |
| 仓配一体 | `pages/supply-chain.html` | 服务与产品 → 企业服务 → 仓配一体 |
| 关于京东物流 | `pages/about.html` | 关于京东物流 |

页头页脚不在每个 HTML 里重复写，而是由 `components.js` 注入到
`#siteHeaderSlot` / `#siteFooterSlot`，**改一次全站生效**。

---

## 三、常见修改

### 1. 换主题色 / 圆角 / 版心宽度

打开 `assets/css/base.css`，改最上面的 `:root`：

```css
--jdl-red: #e1251b;      /* 主色 */
--max-width: 1200px;     /* 版心宽度 */
--radius-l: 16px;        /* 大圆角 */
```

### 2. 改导航或下拉菜单

打开 `assets/js/config.js`：

```js
nav: [
  { key: 'home', label: '首页', href: 'index.html' },
  { key: 'service', label: '服务与产品', mega: 'service' }, // mega 指向下方 megas.service
  ...
]
```

- `href` 一律写**相对站点根目录**的路径（如 `pages/express.html`），
  子页会自动补上 `../`（见 `main.js` 里的 `JDL.base`）。
- 写成 `'#'` 的链接会触发"该栏目暂未展开"的提示，不会跳到空页面。

### 3. 增删卡片（服务 / 行业 / 新闻 / 产品 / 能力）

这些列表都由 `config.js` 的数组驱动，在数组里增删一项即可，
HTML 不需要改：

- 首页十项服务 → `services`
- 首页行业方案 → `industries`
- 首页新闻 → `news`
- 寄快递产品 → `products`
- 仓配一体能力 → `capabilities`
- 发展历程 → `milestones`

新增的图片放到 `assets/images/` 对应子目录，数组里写相对根目录的路径。

`products` / `capabilities` 还支持 `icon` 字段（可选），取值是
`assets/js/components.js` 里 `ICONS` 的键名，例如：

```js
{ title: '仓储管理', icon: 'box',    desc: '…' },
{ title: '仓配一体', icon: 'truck',  desc: '…' },
```

可用的键：`box` `truck` `pin` `chain` `layers` `spark` `snow` `globe`
`shield` `clock` `gift` `trophy` `mail` `check` 等，不写则用默认图标。

### 4. 新增一个页面

1. 复制 `pages/express.html` 改名为 `pages/xxx.html`；
2. 改 `<head>` 标题，保留五个 CSS / 五个 JS 的引入顺序；
3. 把 `<body>` 的 `data-page` 改成新值（`main.js` 里按它做页面级初始化）；
4. 在 `config.js` 的 `nav` / `megas` 里补上入口链接。

### 5. 调整"运费测算"规则

`config.js` → `quote.rules`，按 zone（1 近 → 6 远）配置首重、续重与时效：

```js
1: { first: 12, next: 2, days: '1-2' }
```

计算逻辑在 `assets/js/ui.js` 的 `initQuote()` 里，含体积重、整公斤进位的注释。

### 6. 换轮播图

- 图片放 `assets/images/banner/`；
- 在 `index.html` 的 `#promoCarousel` 里复制一个
  `<div class="c-carousel__slide">…<img src="…"></div>`；
- 圆点由 `carousel.js` 自动按 slide 数量生成，无需手写；
- 切换间隔改 `main.js` 里 `{ interval: 5000 }`。

---

## 四、实现要点

- **零依赖**：没有引入任何框架或 CDN，图标是可换色的内联 SVG，图片全部本地化，
  断网也能完整浏览。
- **可访问性**：轮播/抽屉/折叠面板都带 `aria-*`，键盘可操作，
  系统开启"减少动态效果"时动画自动降级。
- **响应式**：1024px 以下切为抽屉菜单，1024 / 768 / 640 三个断点分别调整栅格与字号。
- **入场动画**：元素加 `data-reveal` 即生效，`data-delay="1…6"` 可做依次出现；
  数字加 `data-count="3600"` 即自动滚动。

## 五、兼容性与已知限制

- 目标浏览器：Chrome / Edge / Safari / Firefox 近两年版本（使用了 `aspect-ratio`、
  `mask-image`、`IntersectionObserver`，旧版 IE 不支持）。
- 仅还原前端展示与交互：搜索、登录、下单、真实查单等功能为占位提示，
  没有后端与数据接口。
- 运费测算为本地演示算法，与官网报价无关。
