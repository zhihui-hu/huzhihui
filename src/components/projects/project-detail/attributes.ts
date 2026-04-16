import type { Project, ProjectAttribute } from '@/lib/projects';

export type HeroPanel = {
  appStoreLike: boolean;
  subtitle?: string;
  lines: string[];
  supportingText?: string;
  rating?: { score: number; count: string };
  chartPosition?: string;
  ageRating?: string;
};

export function getAttributeValue(attribute?: ProjectAttribute) {
  return attribute?.value || attribute?.module || attribute?.url;
}

export function findAttribute(
  attributes: ProjectAttribute[],
  matcher: RegExp,
): ProjectAttribute | undefined {
  return attributes.find((attribute) => matcher.test(attribute.label));
}

function uniqueText(values: Array<string | undefined>) {
  return values.reduce<string[]>((result, value) => {
    const item = value?.trim();

    if (!item || result.includes(item)) {
      return result;
    }

    result.push(item);
    return result;
  }, []);
}

function joinHeroLine(values: Array<string | undefined>) {
  const items = uniqueText(values);

  return items.length > 0 ? items.join(' · ') : undefined;
}

function getUrlHostLabel(url?: string) {
  if (!url || !/^https?:\/\//.test(url)) {
    return undefined;
  }

  try {
    return new URL(url).host.replace(/^www\./, '');
  } catch {
    return undefined;
  }
}

export function buildHeroPanel(project: Project): HeroPanel {
  const categories = project.detail.categories || [];
  const attributes = project.detail.attributes || [];
  const appStoreAttribute = attributes.find(
    (attribute) => attribute.kind === 'app-store',
  );
  const deviceAttribute = findAttribute(
    attributes,
    /(适用设备|客户端|终端|设备|平台)/,
  );
  const priceAttribute = findAttribute(attributes, /(价格|收费|价格类型|付费)/);
  const designAttribute = findAttribute(
    attributes,
    /(设计说明|适配说明|桌面兼容)/,
  );
  const systemAttribute = findAttribute(
    attributes,
    /(兼容系统|系统要求|系统版本|系统)/,
  );
  const providerAttribute = findAttribute(attributes, /(提供者|开发者|发布者)/);
  const languageAttribute = findAttribute(attributes, /语言/);
  const ratingAttribute = findAttribute(attributes, /(年龄|分级|评级)/);
  const featureAttribute = findAttribute(
    attributes,
    /(官网定位|核心模块|产品形态)/,
  );
  const accessAttribute = attributes.find(
    (attribute) =>
      attribute.kind === 'website' || attribute.kind === 'app-store',
  );
  const hostLabel =
    accessAttribute?.module ||
    getUrlHostLabel(accessAttribute?.url || project.url) ||
    getUrlHostLabel(project.url);
  const deviceValue = getAttributeValue(deviceAttribute);
  const priceValue = getAttributeValue(priceAttribute);
  const designValue = getAttributeValue(designAttribute);

  const ratingAttr = attributes.find((a) => a.kind === 'rating');
  const ratingCountAttr = attributes.find((a) => a.kind === 'rating-count');
  const chartAttr = attributes.find((a) => a.kind === 'chart');
  const ageAttr =
    ratingAttribute || findAttribute(attributes, /(年龄|分级|评级)/);

  if (appStoreAttribute) {
    const lines = uniqueText([
      deviceValue ? `仅适用于 ${deviceValue}` : undefined,
      priceValue && designValue
        ? `${priceValue} · ${designValue}`
        : priceValue ||
          designValue ||
          joinHeroLine([
            getAttributeValue(systemAttribute),
            getAttributeValue(languageAttribute),
          ]),
    ]);

    return {
      appStoreLike: true,
      subtitle: categories[0] || categories[1] || '应用',
      lines,
      rating: ratingAttr
        ? {
            score: Number.parseFloat(ratingAttr.value || '0'),
            count: getAttributeValue(ratingCountAttr) || '120',
          }
        : undefined,
      chartPosition: getAttributeValue(chartAttr),
      ageRating: getAttributeValue(ageAttr),
    };
  }

  return {
    appStoreLike: false,
    subtitle: categories[0] || categories[1] || '项目详情',
    lines: uniqueText([
      categories[1] ||
        joinHeroLine([
          getAttributeValue(deviceAttribute),
          getAttributeValue(systemAttribute),
        ]),
      joinHeroLine([
        hostLabel,
        getAttributeValue(providerAttribute),
        project.timeLabel,
      ]) ||
        joinHeroLine([
          getAttributeValue(languageAttribute),
          getAttributeValue(ratingAttribute),
          getAttributeValue(featureAttribute),
        ]),
    ]),
    supportingText: project.detail.headline,
    ageRating: getAttributeValue(ageAttr),
  };
}
