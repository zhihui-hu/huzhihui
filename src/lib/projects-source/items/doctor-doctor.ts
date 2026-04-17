import type { ProjectSource } from '../types';

export const doctorDoctorProjectSource: ProjectSource = {
  slug: 'doctor-doctor',
  name: '叮铃医生（医生端）',
  url: 'https://apps.apple.com/cn/app/%E5%8F%AE%E9%93%83%E5%8C%BB%E7%94%9F-%E5%8C%BB%E7%94%9F%E7%89%88/id1475864364',
  route: '/products/doctor',
  logo: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/f9/15/c1/f915c11a-a1d1-af77-7d8d-f6f897895871/AppIcon-0-0-1x_U007emarketing-0-6-0-85-220.png/400x400ia-75.jpg',
  overview:
    '叮铃医生（医生端）是一款面向医生端的医疗应用，覆盖问诊咨询、处方查询、日程安排、健康宣教、个人排班、医生名片与患者线上开药等核心场景。',
  tags: ['医疗', '在线问诊', 'iPhone', 'UniApp', '医生端'],
  detail: {
    hero: {
      companyName: '北京新里程叮铃科技有限公司',
      companyUrl: 'https://www.njhgroup.cn/',
      metaLine: '2020-01 ～ 至今 · 适配 iPhone',
      compact: true,
      actions: [
        {
          kind: 'ios',
          label: 'iOS 下载',
          url: 'https://apps.apple.com/cn/app/%E5%8F%AE%E9%93%83%E5%8C%BB%E7%94%9F-%E5%8C%BB%E7%94%9F%E7%89%88/id1475864364',
        },
      ],
    },
    metrics: [
      {
        label: '项目周期',
        value: '2020-01 ～ 至今',
        sub: '交付跨度',
      },
      {
        label: '分类',
        value: '医疗',
        sub: '医生端 App',
      },
      {
        label: '平台',
        value: 'iPhone',
        sub: 'iOS 12.0 或更高版本',
      },
      {
        label: '提供者',
        value: '北京新里程叮铃科技有限公司',
        href: 'https://www.njhgroup.cn/',
      },
    ],
    headline:
      '医生端医疗 App 聚焦线上问诊、处方查询、日程管理与患者开药等场景，强调缩短医患沟通链路，让线上咨询更顺畅。',
    categories: ['医疗', '医生端 App', 'iPhone 应用'],
    attributes: [
      {
        label: '评分',
        text: '4.8',
        kind: 'rating',
      },
      {
        label: '评分数',
        text: '561',
        kind: 'rating-count',
      },
      {
        label: '排行榜',
        text: '医疗 第 100 名',
        kind: 'chart',
      },
      {
        label: '苹果客户端',
        module: '叮铃医生（医生版）',
        kind: 'app-store',
        url: 'https://apps.apple.com/cn/app/%E5%8F%AE%E9%93%83%E5%8C%BB%E7%94%9F-%E5%8C%BB%E7%94%9F%E7%89%88/id1475864364',
      },
      {
        label: '提供者',
        text: '北京新里程叮铃科技有限公司',
        url: 'https://www.njhgroup.cn/',
      },
      {
        label: '适用设备',
        text: 'iPhone',
      },
      {
        label: '价格',
        text: '免费',
      },
      {
        label: '设计说明',
        text: '专为 iPhone 设计。未针对 macOS 验证。',
      },
      {
        label: '兼容系统',
        text: 'iOS 12.0 或更高版本',
      },
      {
        label: '语言',
        text: '简体中文、英语',
      },
      {
        label: '年龄分级',
        text: '16+',
      },
    ],
    introduction: [
      'App Store 当前展示的“叮铃医生（医生版）”由北京新里程叮铃科技有限公司提供，分类为“医疗”，主要面向 iPhone 医生端使用场景。',
      '官方功能说明覆盖问诊咨询、查询处方、查看日程安排、健康宣教、个人排班、医生个人名片，以及患者线上开药等能力。',
      '商店信息显示该应用支持简体中文和英语，年龄分级为 16+；官方同时提示，涉及医疗决策时应前往专业医疗机构并咨询执业医生，本应用不提供医疗决策服务。',
    ],
    development: [
      {
        name: '医生端',
        period: {
          start: '2020-01',
          end: null,
          ongoing: true,
          text: '2020-01 ～ 至今',
        },
        summary: [
          'App Store 当前将“叮铃医生（医生版）”归类为医疗类应用，产品定位聚焦医生端线上问诊与日常工作协同场景。',
          '官方功能说明覆盖问诊咨询、处方查询、日程安排、健康宣教、个人排班、医生名片以及患者线上开药，这些能力共同构成了医生端的核心使用路径。',
          '作为医生端 App Owner，我负责 Android 和 iOS 双端开发、应用上架、证书管理与版本控制，并结合团队现有技术栈与交付周期选择 UniApp 方案落地。',
          '项目集成腾讯 TIM 实现在线问诊，配合个推完成消息触达，通过本地数据库缓存历史聊天记录，并使用 sensors.js 简化埋点接入与分析。',
          '随着移动平台政策和审核要求持续变化，我们持续跟进 iOS 与 Android 的能力适配、提审和问题修复，确保版本能够稳定上线。',
        ],
        techStack: [
          'UniApp',
          '腾讯 TIM',
          '个推',
          '本地数据库缓存',
          'sensors.js',
        ],
        resources: [],
        screenshots: [
          {
            image:
              'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource114/v4/1f/37/8c/1f378c76-7a81-a4a5-a6ee-6681a9af55b5/434e21d7-eaa5-44b6-9419-179a94ce82b7_Simulator_Screen_Shot_-_iPhone_11_Pro_Max_-_2020-07-27_at_17.43.45.png/600x1300bb.webp',
          },
          {
            image:
              'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource114/v4/09/e1/fe/09e1fed7-15c9-d1ae-7b20-a4305bcc75de/ae1b352f-32c1-40f6-a8e2-26364cd726dd_Simulator_Screen_Shot_-_iPhone_11_Pro_Max_-_2020-07-27_at_17.44.56.png/600x1300bb.webp',
          },
          {
            image:
              'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource124/v4/71/0c/ed/710cedb4-c0df-7a60-c9a1-09265b5f6801/3a92d929-cb8a-451b-a76b-07c953027010_Simulator_Screen_Shot_-_iPhone_11_Pro_Max_-_2020-07-27_at_17.45.02.png/600x1300bb.webp',
          },
          {
            image:
              'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource124/v4/0f/ec/44/0fec443b-a714-aedf-e170-ba989b09dab7/9a281a40-0328-4e50-b669-d71b63072d45_Simulator_Screen_Shot_-_iPhone_11_Pro_Max_-_2020-07-27_at_17.45.08.png/600x1300bb.webp',
          },
        ],
      },
    ],
  },
};
