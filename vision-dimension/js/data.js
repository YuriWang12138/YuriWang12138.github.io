/* 视像维度 · 站点数据：改这里即可更新成员、奖项与组织架构 */
window.VD = {
  comps: {
    hcy:  { short: '中国好创意', name: '第20届中国好创意暨全国数字艺术设计大赛' },
    ncda: { short: '未来设计师 NCDA', name: '第14届未来设计师·全国高校数字艺术设计大赛（NCDA）' },
    lnwc: { short: '辽宁文创大赛', name: '第四届辽宁省大学生文化创意设计大赛' }
  },
  works: {
    toulan:     '偷走蓝色的人——蓝印花布印染非遗技艺',
    zhimen:     '纸门里的年——木版年画制作技艺',
    wushi:      '舞狮迎春',
    shiguang:   '时光号',
    zhubizi:    '猪鼻子的秘密——猪面纹彩陶壶的穿越之旅',
    yisheng:    '一声转山河',
    yixian:     '一线向天——从潍坊风筝到中国蓝',
    chuangjing: '下一站·窗景',
    wusheng:    '无声守望',
    hean:       '鹤安巡境录-国安'
  },
  /* level: 国赛 = 全国总决赛, 省赛 = 辽宁赛区 / 省级；n = 同一奖项的获奖数量 */
  awards: [
    { work: 'toulan',     comp: 'hcy',  level: '国赛', prize: '一等奖', cat: '人工智能生成动画类', date: '2026.07', by: ['wsh','rs','cxr','lmh','zxy'], certs: ['001'] },
    { work: 'zhimen',     comp: 'hcy',  level: '国赛', prize: '二等奖', cat: '人工智能生成动画类', date: '2026.07', by: ['zxy','rs','cxr','lmh','wsh'], certs: ['003'] },
    { work: 'shiguang',   comp: 'hcy',  level: '国赛', prize: '二等奖', cat: '红色文创产品类',     date: '2026.08', by: ['wsh','lmh'],                  certs: ['002'] },
    { work: 'wushi',      comp: 'hcy',  level: '国赛', prize: '二等奖', cat: '中国风传统文化类',   date: '2026.08', by: ['cxr','rs','lmh','zxy','wsh'], certs: ['004'] },
    { work: 'toulan',     comp: 'ncda', level: '国赛', prize: '三等奖', cat: '非命题赛道',         date: '2026',    by: ['wsh','zxy','cxr'],            certs: ['010'] },
    { work: 'toulan',     comp: 'ncda', level: '省赛', prize: '一等奖', cat: '非命题赛道',         date: '2026.08', by: ['wsh','zxy','cxr'],            certs: ['011','012'] },
    { work: 'chuangjing', comp: 'lnwc', level: '省赛', prize: '一等奖', cat: '平面设计',           date: '2026.10', by: ['cxr','zxy','wsh','lmh'],      certs: ['020'] },
    { work: 'hean',       comp: 'lnwc', level: '省赛', prize: '一等奖', cat: '获奖名单公示',       date: '2026.10', by: ['wsh','lmh','zxy','cxr'],      certs: [], n: 2 },
    { work: 'zhimen',     comp: 'ncda', level: '省赛', prize: '二等奖', cat: '非命题赛道',         date: '2026.08', by: ['zxy','cxr','wsh','lmh'],      certs: ['016','017'] },
    { work: 'yixian',     comp: 'ncda', level: '省赛', prize: '二等奖', cat: '非命题赛道',         date: '2026.08', by: ['cxr','wsh','zxy','lmh'],      certs: ['014','015'] },
    { work: 'yisheng',    comp: 'ncda', level: '省赛', prize: '二等奖', cat: '非命题赛道',         date: '2026.08', by: ['lmh','zxy','wsh'],            certs: ['013'] },
    { work: 'wusheng',    comp: 'lnwc', level: '省赛', prize: '二等奖', cat: '平面设计',           date: '2026.10', by: ['cxr','zxy','lmh','wsh'],      certs: ['021'] },
    { work: 'zhubizi',    comp: 'hcy',  level: '省赛', prize: '三等奖', cat: '符号化 IP 产品类',   date: '2026',    by: ['wsh','rs','zxy','lmh','cxr'], certs: ['005'] }
  ],
  /* 优秀指导教师（王诗凯） */
  mentorAwards: [
    { comp: 'hcy',  level: '国赛', prize: '优秀指导教师', work: 'toulan',   cert: '006' },
    { comp: 'hcy',  level: '国赛', prize: '优秀指导教师', work: 'shiguang', cert: '007' },
    { comp: 'hcy',  level: '国赛', prize: '优秀指导教师', work: 'zhimen',   cert: '008' },
    { comp: 'hcy',  level: '国赛', prize: '优秀指导教师', work: 'wushi',    cert: '009' },
    { comp: 'ncda', level: '国赛', prize: '优秀指导教师', cert: '018' },
    { comp: 'ncda', level: '省赛', prize: '优秀指导教师', cert: '019' }
  ],
  members: [
    { id: 'wsk', key: 'wangshikai', name: '王诗凯', en: 'WANG SHIKAI', role: '指导教师', roleEn: 'MENTOR', mentor: true, guidesAll: true,
      info: [['所属','鞍山师范学院'],['身份','指导教师']], tags: ['鞍山师范学院','指导教师'], duty: '竞赛指导 · 创作把关', dutyShort: '竞赛指导',
      skills: [['flag','竞赛指导'],['eye','创作把关'],['users','团队统筹'],['trophy','优秀指导 ×6']],
      flavor: '指导作品获全国总决赛一等奖，2026 年六度获评优秀指导教师。',
      bio: '视像维度指导教师。带领社团参加中国好创意、未来设计师（NCDA）、辽宁省大学生文化创意设计大赛，指导的作品获全国总决赛一等奖等多项奖励，2026 年六次获评优秀指导教师。',
      theme: ['#1f1d3a', '#4b4687', '#e8c58c', '#f4efe9'], sign: true },
    { id: 'rs', key: 'renshuai', name: '任帅', en: 'REN SHUAI', role: '指导教师', roleEn: 'MENTOR', mentor: true,
      info: [['所属','艺术设计学院'],['专业','视觉传达设计']], tags: ['艺术设计学院','视觉传达设计（移动互联网交互设计方向）'], duty: '视觉传达 · 交互设计', dutyShort: '视觉与交互',
      skills: [['layout','视觉传达'],['cursor','交互设计'],['film','AI 动画'],['cube','文创 IP']],
      flavor: '参与创作《偷走蓝色的人》《纸门里的年》《舞狮迎春》。',
      bio: '视像维度指导教师，视觉传达设计（移动互联网交互设计方向）专业背景。参与《偷走蓝色的人》《纸门里的年》《舞狮迎春》《猪鼻子的秘密》等作品的创作。',
      theme: ['#0f3a37', '#2f8170', '#c6ecc4', '#f1f6ee'], sign: false },
    { id: 'wsh', key: 'wangshenghan', name: '王盛涵', en: 'WANG SHENGHAN', role: '社长', roleEn: 'PRESIDENT',
      info: [['所属','管理学院'],['年级','2025 级']], tags: ['鞍山师范学院','管理学院','2025 级'], duty: '主管新媒体建设', dutyShort: '新媒体建设',
      skills: [['chat','账号运营'],['pen','内容策划'],['megaphone','传播推广'],['spark','AI 创作']],
      flavor: '《偷走蓝色的人》第一作者，全国总决赛一等奖。',
      bio: '视像维度社长，主管新媒体建设。作为第一作者完成《偷走蓝色的人》，获中国好创意全国总决赛一等奖；本页所列获奖作品均有参与。',
      theme: ['#6e231d', '#d4623f', '#ffd9a6', '#fff4ea'], sign: true },
    { id: 'cxr', key: 'caixingrui', name: '蔡兴瑞', en: 'CAI XINGRUI', role: '核心成员', roleEn: 'CORE MEMBER',
      info: [['所属','管理学院'],['年级','2025 级']], tags: ['鞍山师范学院','管理学院','2025 级'], duty: '主管项目管理', dutyShort: '项目管理',
      skills: [['flag','竞赛跟进'],['list','信息整理'],['users','人员分工'],['box','后勤保障']],
      flavor: '《舞狮迎春》《下一站·窗景》第一作者。',
      bio: '视像维度核心成员，主管项目管理，负责竞赛跟进、信息整理与人员分工。作为第一作者完成《舞狮迎春》《下一站·窗景》《一线向天》《无声守望》。',
      theme: ['#0f3d6e', '#3a8fd9', '#cfeaff', '#eff8ff'], sign: true },
    { id: 'zxy', key: 'zouxinying', name: '邹欣颖', en: 'ZOU XINYING', role: '核心成员', roleEn: 'CORE MEMBER',
      info: [['所属','管理学院'],['年级','2025 级']], tags: ['鞍山师范学院','管理学院','2025 级'], duty: '视觉设计及影像', dutyShort: '视觉与影像',
      skills: [['layout','平面设计'],['eye','品牌设计'],['film','视频剪辑'],['spark','AIGC']],
      flavor: '《纸门里的年》第一作者，全国总决赛二等奖。',
      bio: '视像维度核心成员，负责视觉设计及影像。作为第一作者完成《纸门里的年——木版年画制作技艺》，获中国好创意全国总决赛二等奖。',
      theme: ['#43347c', '#8a74cb', '#e7deff', '#f6f2ff'], sign: true },
    { id: 'lmh', key: 'liumohan', name: '刘茉涵', en: 'LIU MOHAN', role: '核心成员', roleEn: 'CORE MEMBER',
      info: [['所属','管理学院'],['年级','2025 级']], tags: ['鞍山师范学院','管理学院','2025 级'], duty: '作品创作', dutyShort: '作品创作',
      skills: [['cube','文创设计'],['film','AI 动画'],['layout','平面设计'],['pen','内容创作']],
      flavor: '《一声转山河》第一作者；《时光号》获全国总决赛二等奖。',
      bio: '视像维度核心成员。作为第一作者完成《一声转山河》；与王盛涵合作的红色文创作品《时光号》获中国好创意全国总决赛二等奖。',
      theme: ['#bfa272', '#ead9b6', '#5b4326', '#3d2c17'], light: true, sign: true }
  ],
  org: {
    mentors: ['王诗凯', '任帅'],
    leaders: [
      { name: '王盛涵', tag: '社长', duty: '主管新媒体建设' },
      { name: '蔡兴瑞', tag: '核心成员', duty: '主管项目管理' },
      { name: '邹欣颖', tag: '核心成员', duty: '视觉设计及影像' },
      { name: '刘茉涵', tag: '核心成员', duty: '作品创作' }
    ],
    depts: [
      { name: '视觉设计部', en: 'VISUAL DESIGN', n: 3, keys: ['平面设计', '品牌设计', 'UI'] },
      { name: 'AI 影像部', en: 'AI MOTION', n: 3, keys: ['视频', '动画', 'AIGC', '剪辑'] },
      { name: '新媒体运营部', en: 'NEW MEDIA', n: 3, keys: ['账号', '内容', '传播'] },
      { name: '项目管理部', en: 'PROJECT OFFICE', n: 6, keys: ['竞赛跟进', '信息整理', '人员分工', '考核制度', '后勤保障'] }
    ]
  }
};
