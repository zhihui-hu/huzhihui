import type { Project, ProjectMetric } from '@/lib/projects';
import Link from 'next/link';

import { isExternalUrl } from './shared';

export function ProjectMetricsBar({ project }: { project: Project }) {
  const visibleMetrics = project.detail.metrics || [];

  if (visibleMetrics.length === 0) {
    return null;
  }

  return (
    <div className="mt-1 mb-6 flex items-start gap-1 overflow-x-auto border-b border-border/35 pb-4 hide-scrollbar scroll-pl-4">
      {visibleMetrics.map((item: ProjectMetric) => (
        <div
          className="relative min-w-[120px] shrink-0 px-3 text-center after:absolute after:right-0 after:top-2 after:bottom-2 after:w-px after:bg-border/50 last:after:hidden sm:min-w-[148px] sm:px-4"
          key={`${item.label}-${item.value}`}
        >
          {item.href ? (
            isExternalUrl(item.href) ? (
              <a
                className="flex flex-col items-center justify-start gap-1.5 transition-opacity hover:opacity-80"
                href={item.href}
                rel="noreferrer"
                target="_blank"
              >
                <span className="text-[11px] font-medium text-muted-foreground/80">
                  {item.label}
                </span>
                <span className="max-w-[132px] px-1 text-[17px] leading-[1.3] font-semibold text-foreground sm:max-w-[164px] sm:text-[20px]">
                  {item.value}
                </span>
                {item.sub && (
                  <span className="line-clamp-2 max-w-[132px] text-[11px] text-muted-foreground/78 sm:max-w-[164px] sm:text-[12px]">
                    {item.sub}
                  </span>
                )}
              </a>
            ) : (
              <Link
                className="flex flex-col items-center justify-start gap-1.5 transition-opacity hover:opacity-80"
                href={item.href}
              >
                <span className="text-[11px] font-medium text-muted-foreground/80">
                  {item.label}
                </span>
                <span className="max-w-[132px] px-1 text-[17px] leading-[1.3] font-semibold text-foreground sm:max-w-[164px] sm:text-[20px]">
                  {item.value}
                </span>
                {item.sub && (
                  <span className="line-clamp-2 max-w-[132px] text-[11px] text-muted-foreground/78 sm:max-w-[164px] sm:text-[12px]">
                    {item.sub}
                  </span>
                )}
              </Link>
            )
          ) : (
            <div className="flex flex-col items-center justify-start gap-1.5">
              <span className="text-[11px] font-medium text-muted-foreground/80">
                {item.label}
              </span>
              <span className="max-w-[132px] px-1 text-[17px] leading-[1.3] font-semibold text-foreground sm:max-w-[164px] sm:text-[20px]">
                {item.value}
              </span>
              {item.sub && (
                <span className="line-clamp-2 max-w-[132px] text-[11px] text-muted-foreground/78 sm:max-w-[164px] sm:text-[12px]">
                  {item.sub}
                </span>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
