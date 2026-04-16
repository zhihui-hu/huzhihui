import type { Project, ProjectAttribute } from '@/lib/projects';

import { ProjectImagePreview } from './image-preview';
import { AttributeValue } from './shared';

export function ProjectInfoList({
  project,
  categories,
  attributes,
  imageAttributes,
}: {
  project: Project;
  categories: string[];
  attributes: ProjectAttribute[];
  imageAttributes: ProjectAttribute[];
}) {
  return (
    <div className="flex flex-col gap-4 mb-10">
      <h2 className="text-[20px] font-bold tracking-tight text-foreground">
        信息
      </h2>
      <div className="flex flex-col">
        <div className="flex items-start justify-between py-3.5 border-b border-border/40 first:border-t mt-1">
          <span className="text-muted-foreground text-[15px] shrink-0">
            分类
          </span>
          <div className="flex flex-wrap gap-1 justify-end text-[15px] text-foreground text-right pl-4">
            {categories.length > 0 ? categories.join(', ') : '应用'}
          </div>
        </div>
        {attributes.map((attribute) => (
          <div
            className="flex items-start justify-between py-3.5 border-b border-border/40 last:border-0"
            key={`${project.slug}-${attribute.label}`}
          >
            <span className="text-muted-foreground text-[15px] shrink-0">
              {attribute.label}
            </span>
            <span className="text-[15px] text-foreground text-right pl-4 max-w-[70%] line-clamp-2">
              <AttributeValue attribute={attribute} />
            </span>
          </div>
        ))}
        {imageAttributes.length > 0 && (
          <div className="flex flex-col gap-3 py-4 border-b border-border/40 last:border-0">
            <span className="text-muted-foreground text-[15px] shrink-0">
              补充入口
            </span>
            <div className="flex gap-4 items-start pb-2 mt-2">
              {imageAttributes.map((attribute) =>
                attribute.url ? (
                  <div
                    className="flex flex-col gap-1 items-center"
                    key={`${project.slug}-${attribute.label}-image`}
                  >
                    <ProjectImagePreview
                      alt={attribute.label}
                      buttonClassName="size-[100px] rounded-[18%] border border-border/40"
                      imageClassName="size-[100px] rounded-[18%] object-cover"
                      src={attribute.url}
                    />
                    <span className="text-[11px] text-muted-foreground truncate max-w-[100px] mt-1">
                      {attribute.label}
                    </span>
                  </div>
                ) : null,
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
