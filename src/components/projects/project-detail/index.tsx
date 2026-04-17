import { Separator } from '@/components/ui/separator';
import type { Project } from '@/lib/projects';

import { buildHeroPanel } from './attributes';
import { ProjectHeroHeader } from './hero-header';
import { ProjectMetricsBar } from './metrics';
import { DevelopmentCard, ScreenshotShelf } from './sections';

type ProjectDetailProps = {
  project: Project;
};

export function ProjectDetail({ project }: ProjectDetailProps) {
  const introduction = project.detail.introduction || [];
  const screenshots = project.detail.screenshots || [];
  const development = project.detail.development || [];
  const heroImage = project.detail.logo || project.logo;
  const heroPanel = buildHeroPanel(project);

  return (
    <section className="container mx-auto flex flex-col gap-0 px-4 py-6 sm:px-6 md:py-8 lg:px-8">
      <ProjectHeroHeader
        heroImage={heroImage}
        heroPanel={heroPanel}
        project={project}
      />

      <ProjectMetricsBar project={project} />

      {screenshots.length > 0 && (
        <ScreenshotShelf project={project} screenshots={screenshots} />
      )}

      {introduction.length > 0 && (
        <>
          {screenshots.length > 0 && (
            <Separator className="bg-border/40 my-8" />
          )}
          <div className="flex flex-col gap-4">
            <h2 className="text-[20px] font-bold tracking-tight text-foreground">
              项目介绍
            </h2>
            <div className="flex flex-col gap-4 text-[15px] leading-relaxed text-foreground">
              {introduction.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </>
      )}

      {development.length > 0 && (
        <>
          {(screenshots.length > 0 || introduction.length > 0) && (
            <Separator className="bg-border/40 my-8" />
          )}
          <div className="flex flex-col gap-4">
            <h2 className="text-[20px] font-bold tracking-tight text-foreground">
              开发与演进
            </h2>
            <div className="text-[15px] leading-relaxed text-foreground/90 mt-[-8px]">
              新功能与迭代历史
            </div>
            <div className="flex flex-col gap-8 mt-2">
              {development.map((item) => (
                <DevelopmentCard
                  key={`${project.slug}-${item.name}`}
                  item={item}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
