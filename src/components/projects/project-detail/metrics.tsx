import type { ProjectAttribute } from '@/lib/projects';
import { StarIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import { findAttribute, getAttributeValue } from './attributes';

type MetricItem = {
  label: string;
  value: ReactNode;
  sub: string;
  icon?: ReactNode;
};

export function ProjectMetricsBar({
  attributes,
  categories,
}: {
  attributes: ProjectAttribute[];
  categories: string[];
}) {
  const ratingValue = getAttributeValue(
    attributes.find((attribute) => attribute.kind === 'rating'),
  );
  const ratingCount = getAttributeValue(
    attributes.find((attribute) => attribute.kind === 'rating-count'),
  );
  const ageRating =
    getAttributeValue(findAttribute(attributes, /(年龄|分级|评级)/)) || '4+';
  const developer =
    getAttributeValue(findAttribute(attributes, /(提供者|开发者|发布者)/)) ||
    '开发者';
  const languageValue = getAttributeValue(findAttribute(attributes, /语言/));
  const primaryLanguage = languageValue
    ? languageValue.split(/[、,，/\s]+/).find(Boolean)
    : undefined;
  const metrics: MetricItem[] = [
    {
      label: '评分及评论',
      value: ratingValue || '-',
      sub: ratingCount ? `${ratingCount} 个评分` : '暂无评分',
      icon:
        ratingValue && Number.parseFloat(ratingValue) > 0 ? (
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <StarIcon
                className="size-3 fill-current text-muted-foreground/70"
                key={`star-${index}`}
              />
            ))}
          </div>
        ) : null,
    },
    {
      label: '年龄',
      value: ageRating,
      sub: '分级',
    },
    {
      label: '类别',
      value: categories[0] || '应用',
      sub: categories[1] || '应用',
    },
    {
      label: '开发者',
      value: developer,
      sub: '提供者',
    },
    {
      label: '语言',
      value: primaryLanguage || '简体中文',
      sub: languageValue || '简体中文',
    },
  ];

  return (
    <div className="mt-1 mb-6 flex items-start gap-1 overflow-x-auto border-b border-border/35 pb-4 hide-scrollbar scroll-pl-4">
      {metrics.map((item) => (
        <div
          key={item.label}
          className="relative flex min-w-[104px] shrink-0 flex-col items-center justify-start gap-1.5 px-3 text-center after:absolute after:right-0 after:top-2 after:bottom-2 after:w-px after:bg-border/50 last:after:hidden sm:min-w-[122px] sm:px-4"
        >
          <span className="text-[11px] font-medium text-muted-foreground/80">
            {item.label}
          </span>
          <span className="max-w-[110px] truncate px-1 text-[19px] font-semibold text-foreground sm:max-w-[140px] sm:text-[22px]">
            {item.value}
          </span>
          {item.icon && (
            <div className="flex flex-col items-center gap-1">
              {item.icon}
              <span className="text-[11px] text-muted-foreground/78 sm:text-[12px]">
                {item.sub}
              </span>
            </div>
          )}
          {!item.icon && (
            <span className="line-clamp-1 max-w-[110px] text-[11px] text-muted-foreground/78 sm:max-w-[140px] sm:text-[12px]">
              {item.sub}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
