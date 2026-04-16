import { Separator } from '@/components/ui/separator';
import type { Project, ProjectResource } from '@/lib/projects';

import { buildHeroPanel } from './attributes';
import { ProjectHeroHeader } from './hero-header';
import { ProjectInfoList } from './info-list';
import { ProjectMetricsBar } from './metrics';
import { DevelopmentCard } from './sections';
import { getPrimaryResourceLabel } from './shared';

type ProjectDetailProps = {
  project: Project;
  canonicalUrl: string;
};

export function ProjectDetail({ project, canonicalUrl }: ProjectDetailProps) {
  const categories = project.detail.categories || [];
  const attributes = project.detail.attributes || [];
  const introduction = project.detail.introduction || [];
  const primaryResources: ProjectResource[] = [
    ...(project.url
      ? [
          {
            label: getPrimaryResourceLabel(project.url),
            url: project.url,
            kind: project.url.includes('apps.apple.com')
              ? 'app-store'
              : 'website',
          },
        ]
      : []),
    ...(project.repo
      ? [{ label: '查看源码', url: project.repo, kind: 'repository' as const }]
      : []),
  ];
  const imageAttributes = attributes.filter(
    (attribute) => attribute.type === 'image' && attribute.url,
  );
  const heroImage = project.detail.logo || project.logo;
  const heroPanel = buildHeroPanel(project);
  const primaryResource = primaryResources[0];

  return (
    <section className="container mx-auto flex flex-col gap-0 px-4 py-6 sm:px-6 md:py-8 lg:px-8">
      <ProjectHeroHeader
        canonicalUrl={canonicalUrl}
        heroImage={heroImage}
        heroPanel={heroPanel}
        primaryResource={primaryResource}
        project={project}
      />

      <ProjectMetricsBar attributes={attributes} categories={categories} />
      <Separator className="bg-border/40 my-6" />

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

      {project.detail.development && project.detail.development.length > 0 && (
        <>
          <Separator className="bg-border/40 my-8" />
          <div className="flex flex-col gap-4">
            <h2 className="text-[20px] font-bold tracking-tight text-foreground">
              开发与演进
            </h2>
            <div className="text-[15px] leading-relaxed text-foreground/90 mt-[-8px]">
              新功能与迭代历史
            </div>
            <div className="flex flex-col gap-8 mt-2">
              {project.detail.development.map((item) => (
                <DevelopmentCard
                  key={`${project.slug}-${item.name}`}
                  item={item}
                />
              ))}
            </div>
          </div>
        </>
      )}

      <Separator className="bg-border/40 my-8" />

      <ProjectInfoList
        attributes={attributes}
        categories={categories}
        imageAttributes={imageAttributes}
        project={project}
      />
    </section>
  );
}
