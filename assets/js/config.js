/* ============================================================
   京东物流官网复刻 · 站点配置  assets/js/config.js
   ------------------------------------------------------------
   这个文件是"内容层"：所有可替换的文案、导航、卡片数据都集中在这里。
   改文案 / 加栏目 / 换新闻，基本只需要动本文件。
   ============================================================ */

window.JDL = window.JDL || {};

(function (JDL) {
  'use strict';

  var config = {

    /* ---------- 品牌基础信息 ---------- */
    brand: {
      name: '京东物流',
      en: 'JINGDONG LOGISTICS',
      slogan: '省心高效',
      tel: '950616',
      copyright: '© 2026 京东物流（复刻示例）'
    },

    /* ---------- 一级导航 ----------
       href 写法约定：相对"站点根目录"，
       例如 'index.html'、'pages/express.html'；'#' 表示本复刻中未实现的栏目。
       mega 指向下面 megas 里的下拉面板 id。 */
    nav: [
      { key: 'home',    label: '首页',       href: 'index.html' },
      { key: 'service', label: '服务与产品', mega: 'service' },
      { key: 'solution',label: '解决方案',   mega: 'solution' },
      { key: 'support', label: '服务支持',   mega: 'support' },
      { key: 'esg',     label: '可持续发展', href: '#' },
      { key: 'about',   label: '关于京东物流', mega: 'about' }
    ],

    /* ---------- 下拉大菜单 ----------
       columns：每一列的小标题 + 链接列表 */
    megas: {
      service: {
        columns: [
          {
            title: '企业服务',
            links: [
              { label: '快递服务', href: 'pages/express.html' },
              { label: '快运服务', href: '#' },
              { label: '仓配一体', href: 'pages/supply-chain.html' },
              { label: '大件服务', href: '#' },
              { label: '送仓服务', href: '#' },
              { label: '冷链服务', href: '#' },
              { label: '医药服务', href: '#' },
              { label: '国际服务', href: '#' }
            ]
          },
          {
            title: '物流科技 / 运力',
            links: [
              { label: '智能仓储', href: '#' },
              { label: '教育产业学院', href: '#' },
              { label: '智能物流园区', href: '#' },
              { label: '数智化供应链', href: '#' },
              { label: '专线包仓', href: '#' },
              { label: '全货机包机', href: '#' }
            ]
          },
          {
            title: '个人服务',
            links: [
              { label: '寄快递', href: 'pages/express.html' },
              { label: '京东特快', href: 'pages/express.html' },
              { label: '京东标快', href: 'pages/express.html' },
              { label: '生鲜特快', href: 'pages/express.html' },
              { label: '送同城', href: '#' },
              { label: '寄港澳', href: '#' },
              { label: '安装 / 维修 / 清洗', href: '#' }
            ]
          }
        ],
        note: '覆盖仓储、运输、配送、大件、冷链、跨境的全链路服务能力',
        hot: '热门：大促备货 · 仓配一体'
      },
      solution: {
        columns: [
          {
            title: '消费品',
            links: [
              { label: '快消行业', href: '#' },
              { label: '商超零售', href: '#' },
              { label: '饮料酒水', href: '#' }
            ]
          },
          {
            title: '耐用消费品',
            links: [
              { label: '3C 数码', href: '#' },
              { label: '家电家居', href: '#' },
              { label: '汽车行业', href: '#' }
            ]
          },
          {
            title: '时尚与生鲜',
            links: [
              { label: '服饰鞋帽', href: '#' },
              { label: '美妆个护', href: '#' },
              { label: '生鲜冷链', href: '#' }
            ]
          }
        ],
        note: '面向 6 大行业提供可配置的一体化供应链解决方案',
        hot: '热门：大时尚行业 · 家电家居'
      },
      support: {
        columns: [
          {
            title: '常用工具',
            links: [
              { label: '运费时效查询', href: 'pages/express.html#quote' },
              { label: '快递单号查询', href: '#' },
              { label: '服务网点查询', href: '#' },
              { label: '禁寄物品说明', href: '#' }
            ]
          },
          {
            title: '客户服务',
            links: [
              { label: '在线客服', href: '#' },
              { label: '服务热线 950616', href: '#' },
              { label: '企业客户开户', href: '#' },
              { label: '发票与对账', href: '#' }
            ]
          },
          {
            title: '帮助中心',
            links: [
              { label: '常见问题', href: 'pages/express.html#faq' },
              { label: '服务条款', href: '#' },
              { label: '隐私政策', href: '#' },
              { label: '投诉与建议', href: '#' }
            ]
          }
        ],
        note: '7×24 小时客服在线，下单、查询、售后全流程可追踪',
        hot: '热线：950616'
      },
      about: {
        columns: [
          {
            title: '了解我们',
            links: [
              { label: '企业介绍', href: 'pages/about.html' },
              { label: '发展历程', href: 'pages/about.html#history' },
              { label: '荣誉资质', href: 'pages/about.html#honor' }
            ]
          },
          {
            title: '新闻与品牌',
            links: [
              { label: '新闻中心', href: '#' },
              { label: '视频中心', href: '#' },
              { label: 'ESG 报告', href: '#' }
            ]
          },
          {
            title: '合作与加入',
            links: [
              { label: '联系我们', href: 'pages/about.html#contact' },
              { label: '物流合伙人', href: '#' },
              { label: '校园招聘', href: '#' },
              { label: '社会招聘', href: '#' }
            ]
          }
        ],
        note: '2017 年独立运营，2021 年于香港联交所主板上市',
        hot: '最新：前三季度经营利润同比增长 39.2%'
      }
    },

    /* ---------- 首页：十项业务入口 ---------- */
    services: [
      { name: '快递快运服务', icon: 'assets/images/service/s1.jpg',  href: 'pages/express.html' },
      { name: '仓配一体服务', icon: 'assets/images/service/s2.jpg',  href: 'pages/supply-chain.html' },
      { name: '大件服务',     icon: 'assets/images/service/s3.jpg',  href: '#' },
      { name: '送仓服务',     icon: 'assets/images/service/s4.jpg',  href: '#' },
      { name: '冷链服务',     icon: 'assets/images/service/s5.jpg',  href: '#' },
      { name: '医药服务',     icon: 'assets/images/service/s6.jpg',  href: '#' },
      { name: '京东服务',     icon: 'assets/images/service/s7.jpg',  href: '#' },
      { name: '运力服务',     icon: 'assets/images/service/s8.jpg',  href: '#' },
      { name: '国际物流',     icon: 'assets/images/service/s9.jpg',  href: '#' },
      { name: '物流科技',     icon: 'assets/images/service/s10.jpg', href: '#' }
    ],

    /* ---------- 首页：快递 / 快运 产品切换 ---------- */
    expressTabs: {
      express: {
        label: '快递',
        chips: ['京东特快', '京东标快', '生鲜特快', '增值服务'],
        href: 'pages/express.html'
      },
      freight: {
        label: '快运',
        chips: ['重货标快', '整车直达', '增值服务'],
        href: '#'
      }
    },

    /* ---------- 首页：行业解决方案 ---------- */
    industries: [
      {
        key: 'fmcg',
        name: '快消',
        icon: 'assets/images/solution/p1.jpg',
        desc: '为消费品行业客户提供数字化、可视化、智能化的一体化解决方案，向客户提供全渠道 E2E 服务，实现供应链升级。',
        points: ['多渠道多场景的供应链服务能力', '广泛的物流网络覆盖能力', '库存周转与履约成本同步优化']
      },
      {
        key: 'apparel',
        name: '服装',
        icon: 'assets/images/solution/p2.jpg',
        desc: '面向服饰鞋帽行业，以销定产、柔性补货，缩短上新周期，支撑线上线下一体化履约。',
        points: ['多 SKU 精细化仓储管理', '门店与电商全渠道发货', '退货逆向处理与二次上架']
      },
      {
        key: 'appliance',
        name: '家电',
        icon: 'assets/images/solution/p3.jpg',
        desc: '为大件家电提供仓、配、装、拆、收一体化服务，送装同步上门，覆盖全国区县。',
        points: ['送装一体，一次上门完成', '100% 区县覆盖', '旧机回收与逆向物流']
      },
      {
        key: 'digital',
        name: '3C',
        icon: 'assets/images/solution/p4.jpg',
        desc: '为 3C 数码提供高值商品安防、时效承诺与售后逆向的一体化供应链服务。',
        points: ['高值商品专区安防', '时效承诺与全程可视', '售后退换一体化处理']
      },
      {
        key: 'auto',
        name: '汽车',
        icon: 'assets/images/solution/p5.jpg',
        desc: '为汽车及零部件行业提供入厂物流、售后备件与整车运输的端到端服务。',
        points: ['入厂 JIT 准时配送', '售后备件全国网络', '整车与零担组合运输']
      },
      {
        key: 'fresh',
        name: '生鲜',
        icon: 'assets/images/solution/p6.jpg',
        desc: '为生鲜食品提供全程温控的冷链仓配服务，产地直发、锁鲜到家，覆盖 290+ 城市。',
        points: ['全程温控与温度可追溯', '产地直发缩短链路', '冷链卡班高频次发运']
      }
    ],

    /* ---------- 首页：物流网络数据 ---------- */
    network: {
      stats: [
        { value: 3600, suffix: '+', unit: '个',       label: '京东物流已拥有超 3600 个仓库' },
        { value: 3400, suffix: '万', unit: '平方米',   label: '仓库总管理面积超 3400 万平方米' },
        { value: 25,   suffix: '',  unit: '个国家和地区', label: '海外仓已覆盖全球 25 个国家和地区' }
      ],
      features: [
        { icon: 'globe', title: '全网覆盖', desc: '仓储 · 运输 · 配送 · 大件 · 冷链 · 跨境' },
        { icon: 'layers', title: '数实融合', desc: '自动化设备与数字化系统深度协同' },
        { icon: 'chain', title: '全链共生', desc: '与上下游伙伴共建供应链生态' },
        { icon: 'clock', title: '7×24 小时服务', desc: '客服与履约全天候在线' }
      ]
    },

    /* ---------- 首页：新闻动态 ---------- */
    news: [
      {
        title: '一图看懂！京东物流前三季度经营利润同比增长39.2%，显著提升，整体经营高质量健康发展',
        date: '2026.11.17',
        img: 'assets/images/news/n1.png',
        href: '#'
      },
      {
        title: '一图读懂京东物流2025年ESG报告',
        date: '2026.04.25',
        img: 'assets/images/news/n2.jpg',
        href: '#'
      },
      {
        title: '全球最高标准 京东物流斩获国际软件研发诺贝尔奖',
        date: '2026.04.23',
        img: 'assets/images/news/n3.jpg',
        href: '#'
      }
    ],

    /* ---------- 子页：寄快递产品矩阵 ---------- */
    products: [
      {
        name: '京东特快',
        tag: '时效领先',
        icon: 'spark',
        desc: '跨省急件首选，航空 + 高铁运力组合，核心城市次日达。',
        points: ['今天寄 明天到', '全程可视化追踪', '保价与签收凭证']
      },
      {
        name: '京东标快',
        tag: '高性价比',
        icon: 'box',
        desc: '标准时效快递服务，覆盖全国区县，价格透明、时效稳定。',
        points: ['全国 2800+ 区县覆盖', '按需预约上门取件', '支持月结与对公结算']
      },
      {
        name: '生鲜特快',
        tag: '冷链',
        icon: 'snow',
        desc: '为生鲜、水果、水产提供温控包装与优先中转，锁鲜直达。',
        points: ['专业冷链包装', '优先中转不落地', '温控节点可查询']
      },
      {
        name: '送同城',
        tag: '同城',
        icon: 'pin',
        desc: '同城即时配送，最快 1 小时送达，支持专人直送。',
        points: ['1 小时极速达', '专人专送不中转', '实时骑手轨迹']
      },
      {
        name: '寄港澳',
        tag: '跨境',
        icon: 'globe',
        desc: '内地寄往香港、澳门，清关一体化，门到门派送。',
        points: ['报关资料线上提交', '港澳全境派送', '时效 2-4 天']
      },
      {
        name: '增值服务',
        tag: '可选',
        icon: 'shield',
        desc: '保价、签单返还、代收货款、包装加固等多种增值能力。',
        points: ['保价最高按声明价值赔付', '签单返还回传', '代收货款 T+1 结算']
      }
    ],

    /* ---------- 子页：寄快递常见问题 ---------- */
    faq: [
      {
        q: '快递多久可以送达？',
        a: '京东特快在核心城市间可实现"今天寄、明天到"；京东标快一般为 2-3 天，偏远地区顺延。实际时效以下单页展示的承诺时效为准。'
      },
      {
        q: '哪些物品不能寄递？',
        a: '易燃易爆、剧毒、强腐蚀性、管制刀具、活体动物（部分品类除外）等属于禁寄物品；酒类、电池等限寄品类需符合包装与承运要求，具体以《禁寄物品说明》为准。'
      },
      {
        q: '运费是如何计算的？',
        a: '运费由首重价格 + 续重价格构成，同时受寄达区域、包裹体积重、是否选择保价等增值服务影响。体积重按长×宽×高÷6000 计算，取实重与体积重较大值计费。'
      },
      {
        q: '可以预约上门取件吗？',
        a: '可以。下单时选择取件时间段，快递员会在预约时段内上门揽收；如临时调整，可在订单详情页修改取件时间。'
      },
      {
        q: '包裹丢失或损坏如何理赔？',
        a: '未保价包裹按承运条款约定限额赔付；已保价包裹按声明价值与实际损失赔付。建议高值物品选择保价服务，并保留寄件时的物品照片。'
      }
    ],

    /* ---------- 子页：运费测算（示例规则，非官方报价）---------- */
    quote: {
      cities: [
        { name: '北京', zone: 1 }, { name: '上海', zone: 2 }, { name: '广州', zone: 3 },
        { name: '深圳', zone: 3 }, { name: '杭州', zone: 2 }, { name: '成都', zone: 4 },
        { name: '西安', zone: 4 }, { name: '武汉', zone: 3 }, { name: '沈阳', zone: 5 },
        { name: '乌鲁木齐', zone: 6 }
      ],
      // 首重 1kg 价格 + 续重单价（元/kg），按 zone 递远递增
      rules: {
        1: { first: 12, next: 2,  days: '1-2' },
        2: { first: 14, next: 3,  days: '1-2' },
        3: { first: 16, next: 4,  days: '2-3' },
        4: { first: 18, next: 5,  days: '2-3' },
        5: { first: 20, next: 6,  days: '3-4' },
        6: { first: 26, next: 9,  days: '4-6' }
      }
    },

    /* ---------- 子页：仓配一体能力 ---------- */
    capabilities: [
      { title: '仓储管理', icon: 'box',    desc: '1500+ 自营管理仓库，支持多货主、多批次、多温区的精细化库存管理。' },
      { title: '仓配一体', icon: 'truck',  desc: '库存前置到离消费者最近的仓，订单生成即就近发货，缩短履约链路。' },
      { title: '送仓服务', icon: 'pin',    desc: '从货源地到收货仓的收货、暂存、分仓调度、运输、送仓与退仓一体化。' },
      { title: '逆向物流', icon: 'chain',  desc: '退货揽收、质检分级、二次上架与报废处置，形成完整闭环。' },
      { title: '库存计划', icon: 'layers', desc: '基于销量预测的补货与分仓建议，降低断货率与呆滞库存。' },
      { title: '供应链咨询', icon: 'spark', desc: '从网络规划、仓网布局到系统对接的全链路方案设计与落地。' }
    ],

    /* ---------- 子页：关于我们 ---------- */
    milestones: [
      { year: '2007', title: '自建仓配一体物流体系', desc: '京东开始自建仓储与配送网络，奠定一体化供应链基础。' },
      { year: '2017', title: '京东物流集团正式成立', desc: '面向社会全面开放，服务外部客户，走向独立化运营。' },
      { year: '2021', title: '于香港联交所主板上市', desc: '完成资本市场里程碑，持续加码一体化供应链与物流科技投入。' },
      { year: '2024', title: '海外仓覆盖 25 个国家和地区', desc: '跨境网络持续扩展，服务中国品牌出海与全球履约。' },
      { year: '2026', title: '前三季度经营利润同比增长 39.2%', desc: '经营质量稳步提升，一体化供应链与快递快运双轮驱动。' }
    ],
    honors: [
      { title: '国际软件研发领域权威奖项', desc: '全球最高标准评估体系认可，物流软件研发能力获国际肯定。' },
      { title: '香港海关 AEO 认证', desc: '旗下 JD Express Investment 获认证，跨境通关效率与合规能力提升。' },
      { title: '国家级绿色供应链实践', desc: '青流计划持续推进包装减量、循环回收与新能源运输。' },
      { title: '一体化供应链服务标杆', desc: '服务覆盖快消、家电、3C、汽车、生鲜等多个行业头部客户。' }
    ]
  };

  JDL.config = config;

  /* ---------- 路径工具 ----------
     子页在 /pages 下，需要 ../ 前缀才能回到根目录的资源。
     main.js 会先根据 <body data-base> 设置 JDL.base。 */
  JDL.url = function (path) {
    if (!path || path === '#') return '#';
    if (/^(https?:)?\/\//.test(path) || path.indexOf('mailto:') === 0) return path;
    return (JDL.base || '') + path;
  };

})(window.JDL);
