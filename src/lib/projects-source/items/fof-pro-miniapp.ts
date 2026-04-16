import type { ProjectSource } from '../types';

export const fofProMiniappProjectSource: ProjectSource = {
  slug: 'fof-pro-miniapp',
  name: 'FOF PRO（小程序端）',
  route: '/products/fof-pro',
  logo: '/assets/projects/fof-pro-logo.png',
  overview:
    'FOF PRO 小程序端是平台在微信场景下的延伸入口，用更轻量的交互承接基金投研与内容触达。',
  tags: ['基金投研', '小程序', 'uni-app', '轻量入口'],
  detail: {
    headline:
      '小程序端作为微信场景下的轻量入口，延续平台能力，强调快速访问、便捷触达与多端联动。',
    categories: ['金融科技', '投研投顾', '小程序'],
    attributes: [
      {
        label: '小程序二维码',
        module: 'FOF PRO 小程序',
        kind: 'qr-code',
        url: 'https://c18e-1257416358.cos.accelerate.myqcloud.com/IMG_4486.JPG',
        type: 'image',
      },
    ],
    introduction: [
      'FOF PRO 小程序承担的是平台在微信生态内的轻量化入口角色，方便更高频的访问和内容分发。',
      '它与 Web 平台、App 端共同构成完整的多端产品矩阵，让不同使用场景下的基金投研需求都能被更自然地承接。',
      '在工程落地上，小程序端同样采用 uni-app，以便复用跨端交付经验和维护方式。',
    ],
    development: [
      {
        name: 'FOF PRO 小程序',
        period: {
          start: '2020-01',
          end: null,
          ongoing: true,
          text: '2020-01 ～ 至今',
        },
        summary: ['小程序使用数字天堂 uni-app 进行开发。'],
        techStack: ['uni-app'],
        resources: [],
        screenshots: [
          {
            image:
              'https://c18e-1257416358.cos.accelerate.myqcloud.com/IMG_4487.PNG',
          },
          {
            image:
              'https://c18e-1257416358.cos.accelerate.myqcloud.com/IMG_4491.PNG',
          },
          {
            image:
              'https://c18e-1257416358.cos.accelerate.myqcloud.com/IMG_4489.PNG',
          },
          {
            image:
              'https://c18e-1257416358.cos.accelerate.myqcloud.com/IMG_4488.PNG',
          },
        ],
      },
    ],
  },
};
