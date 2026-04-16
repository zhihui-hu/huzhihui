import type { ProjectSource } from '../types';

export const fofProAppProjectSource: ProjectSource = {
  slug: 'fof-pro-app',
  name: 'FOF PRO（App 端）',
  url: 'https://apps.apple.com/cn/app/fof-pro/id1633056491',
  route: '/products/fof-pro',
  logo: '/assets/projects/fof-pro-logo.png',
  overview:
    'FOF PRO App 端延续平台能力，把基金投研与投顾服务带到移动端，服务更轻量的随身查看和协同场景。',
  tags: ['基金投研', 'App', 'uni-app', '移动端'],
  detail: {
    headline:
      '移动端围绕平台能力做轻量延展，强调随时查看投研信息与业务协同，使用 uni-app 完成跨端交付。',
    categories: ['金融科技', '投研投顾', 'App'],
    attributes: [
      {
        label: '苹果客户端',
        module: 'FOF PRO App',
        kind: 'app-store',
        url: 'https://apps.apple.com/cn/app/fof-pro/id1633056491',
      },
    ],
    introduction: [
      'FOF PRO 的产品能力并不只停留在桌面端，移动端承担了投研信息随时查看和业务协同的延伸职责。',
      '在整体产品体系里，App 端更强调轻量触达与跨场景可用性，配合 Web 平台形成更完整的交付闭环。',
      '项目最终选择数字天堂的 uni-app 方案，以兼顾开发效率和多端交付节奏。',
    ],
    development: [
      {
        name: 'FOF PRO App',
        period: {
          start: '2020-01',
          end: null,
          ongoing: true,
          text: '2020-01 ～ 至今',
        },
        summary: ['APP 使用数字天堂 uni-app 进行开发。'],
        techStack: ['uni-app'],
        resources: [],
      },
    ],
  },
};
