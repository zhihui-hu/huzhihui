import type { Project, ProjectDevelopment } from '@/lib/projects';
import { cn } from '@/lib/utils';
import { MonitorSmartphoneIcon } from 'lucide-react';
import Link from 'next/link';

import { ProjectImagePreview } from './image-preview';
import { isExternalUrl } from './shared';

export function DevelopmentCard({ item }: { item: ProjectDevelopment }) {
  return (
    <div className="flex flex-col gap-3 py-2 border-b border-border/40 pb-6 last:border-0 last:pb-2">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-[16px] font-bold text-foreground leading-tight">
          {item.name}
        </h3>
        {item.period && (
          <span className="text-[13px] text-muted-foreground/80 shrink-0 mt-[2px]">
            {item.period.text}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-4 text-[15px] leading-relaxed text-muted-foreground/90">
        <ul className="flex list-disc flex-col gap-1.5 pl-5">
          {item.summary.map((point) => (
            <li key={point} className="pl-1 marker:text-muted-foreground/50">
              {point}
            </li>
          ))}
        </ul>

        {item.techStack && item.techStack.length > 0 && (
          <p className="text-[14px]">
            <span className="font-semibold text-foreground/80">技术栈：</span>
            {item.techStack.join(', ')}
          </p>
        )}

        {item.resources && item.resources.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-1">
            {item.resources.map((resource) =>
              resource.url ? (
                isExternalUrl(resource.url) ? (
                  <a
                    key={`${item.name}-${resource.label}`}
                    href={resource.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[14px] text-primary hover:underline"
                  >
                    {resource.label}
                  </a>
                ) : (
                  <Link
                    key={`${item.name}-${resource.label}`}
                    href={resource.url}
                    className="text-[14px] text-primary hover:underline"
                  >
                    {resource.label}
                  </Link>
                )
              ) : (
                <span
                  key={`${item.name}-${resource.label}`}
                  className="text-[14px] text-muted-foreground"
                >
                  {resource.label}: {resource.text || '-'}
                </span>
              ),
            )}
          </div>
        )}
      </div>

      {item.screenshots && item.screenshots.length > 0 && (
        <div className="flex flex-col gap-3 mt-4">
          <p className="text-[14px] font-medium text-foreground">界面预览</p>
          <div className="-mx-4 overflow-x-auto px-4 pb-1 hide-scrollbar">
            <div className="flex gap-4">
              {item.screenshots.map((screenshot, index) => (
                <ProjectImagePreview
                  alt={`${item.name} 界面预览 ${index + 1}`}
                  buttonClassName="w-[180px] shrink-0 rounded-[1rem] border border-border/40 sm:w-[220px]"
                  key={`${item.name}-${screenshot.image}`}
                  src={screenshot.image}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {item.assets && item.assets.length > 0 && (
        <div className="flex flex-col gap-3 mt-4">
          <p className="text-[14px] font-medium text-foreground">补充图片</p>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
            {item.assets.map((asset) => (
              <div
                className="flex flex-col gap-1.5"
                key={`${item.name}-${asset.label || asset.image}`}
              >
                <ProjectImagePreview
                  alt={asset.label || `${item.name} 补充图片`}
                  buttonClassName="rounded-[1rem] border border-border/40"
                  imageClassName="aspect-square w-full object-cover"
                  src={asset.image}
                />
                {asset.label && (
                  <p className="text-[11px] text-muted-foreground/80 truncate px-1">
                    {asset.label}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function ScreenshotShelf({
  project,
  screenshots,
}: {
  project: Project;
  screenshots: Array<{ image: string }>;
}) {
  if (screenshots.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 mt-4">
      <div className="flex items-center gap-2">
        <MonitorSmartphoneIcon className="size-4 text-muted-foreground" />
        <h2 className="text-[20px] font-bold tracking-tight text-foreground">
          界面预览
        </h2>
      </div>

      <div className="-mx-4 overflow-x-auto px-4 pb-2 hide-scrollbar mt-1">
        <div className="flex gap-4">
          {screenshots.map((screenshot, index) => (
            <ProjectImagePreview
              alt={`${project.name} 界面预览 ${index + 1}`}
              buttonClassName={cn(
                'w-[200px] shrink-0 rounded-[1.25rem] border border-border/40 sm:w-[240px]',
                screenshots.length === 1 && 'w-full max-w-sm',
              )}
              key={`${project.slug}-${screenshot.image}`}
              src={screenshot.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
