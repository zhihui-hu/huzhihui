'use client';

/* eslint-disable @next/next/no-img-element -- this header uses duplicated icon layers for glow rendering */
import { Button } from '@/components/ui/button';
import type { Project, ProjectResource } from '@/lib/projects';
import { cn } from '@/lib/utils';
import { ExternalLinkIcon, StarIcon } from 'lucide-react';
import Link from 'next/link';
import type { CSSProperties } from 'react';

import type { HeroPanel } from './attributes';
import { ProjectDetailShareButton } from './share-button';
import { isExternalUrl } from './shared';

export function ProjectHeroIcon({
  project,
  imageSrc,
}: {
  project: Project;
  imageSrc?: string;
}) {
  const logoSrc = imageSrc || project.logo;

  if (!logoSrc) {
    return null;
  }

  return (
    <div className="relative shrink-0">
      <div
        className="absolute inset-[14%] rounded-[24%] blur-2xl"
        style={{ backgroundColor: 'var(--project-hero-icon-glow)' }}
      />
      <div className="absolute inset-0 translate-y-2 scale-[0.94] opacity-40 blur-3xl">
        <img
          alt=""
          aria-hidden="true"
          className="size-[128px] sm:size-[164px] rounded-[22.5%] object-cover grayscale saturate-50 contrast-125"
          src={logoSrc}
        />
      </div>
      <div
        className="relative overflow-hidden rounded-[22.5%] p-[1px] backdrop-blur-xl"
        style={{
          backgroundColor: 'var(--project-hero-surface-strong)',
          border: '0.5px solid var(--project-hero-border)',
          boxShadow: '0 24px 60px var(--project-hero-shadow)',
        }}
      >
        <img
          alt={`${project.name} logo`}
          className="size-[126px] sm:size-[162px] rounded-[22%] bg-background object-cover"
          src={logoSrc}
        />
        <div className="pointer-events-none absolute inset-0 rounded-[22.5%] ring-1 ring-inset ring-white/10" />
      </div>
    </div>
  );
}

function StarRating({ score }: { score: number }) {
  const fullStars = Math.floor(score);
  const hasHalfStar = score % 1 >= 0.5;

  return (
    <div className="flex items-center gap-0.5 text-white/85">
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < fullStars) {
          return (
            <StarIcon
              className="fill-current"
              key={i}
              size={14}
              strokeWidth={1.5}
            />
          );
        }
        if (i === fullStars && hasHalfStar) {
          return (
            <div className="relative" key={i}>
              <StarIcon className="text-white/25" size={14} strokeWidth={1.5} />
              <div className="absolute inset-0 overflow-hidden w-[50%]">
                <StarIcon
                  className="fill-current"
                  size={14}
                  strokeWidth={1.5}
                />
              </div>
            </div>
          );
        }
        return (
          <StarIcon
            className="text-white/25"
            key={i}
            size={14}
            strokeWidth={1.5}
          />
        );
      })}
    </div>
  );
}

function ProjectMetadataRow({ panel }: { panel: HeroPanel }) {
  if (!panel.appStoreLike) return null;

  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-white/90">
      {panel.rating && (
        <div className="flex items-center gap-2 border-r border-white/15 pr-4 last:border-0">
          <div className="flex flex-col">
            <span className="text-[17px] font-bold leading-none tracking-tight">
              {panel.rating.score.toFixed(1)}
            </span>
            <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-white/55">
              {panel.rating.count} 个评分
            </span>
          </div>
          <StarRating score={panel.rating.score} />
        </div>
      )}

      {panel.chartPosition && (
        <div className="flex flex-col border-r border-white/15 pr-4 last:border-0">
          <span className="text-[17px] font-bold leading-none tracking-tight">
            #{panel.chartPosition.split(' ').at(-1)}
          </span>
          <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-white/55">
            {panel.chartPosition.split(' ')[0]}
          </span>
        </div>
      )}

      {panel.ageRating && (
        <div className="flex flex-col border-r border-white/15 pr-4 last:border-0">
          <span className="text-[17px] font-bold leading-none tracking-tight">
            {panel.ageRating}
          </span>
          <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-white/55">
            年龄
          </span>
        </div>
      )}
    </div>
  );
}

export function HeroPrimaryAction({
  resource,
  appStoreLike,
}: {
  resource: ProjectResource;
  appStoreLike: boolean;
}) {
  if (!resource.url) {
    return null;
  }

  const isExternal = isExternalUrl(resource.url);

  const buttonContent = (
    <>
      {appStoreLike ? (
        <span className="font-semibold tracking-tight">
          {resource.label || '查看应用'}
        </span>
      ) : (
        <span>{resource.label || '查看'}</span>
      )}
      {isExternal && <ExternalLinkIcon data-icon="inline-end" />}
    </>
  );

  const className = appStoreLike
    ? 'h-9 rounded-full border-white/10 bg-white/96 px-4 text-[13px] font-semibold text-black shadow-[0_14px_40px_rgba(0,0,0,0.25)] hover:bg-white sm:px-5'
    : 'h-8 rounded-full px-4 text-[13px] font-semibold shadow-sm sm:px-5';

  if (isExternal) {
    return (
      <Button asChild className={className} size="sm">
        <a href={resource.url} rel="noreferrer" target="_blank">
          {buttonContent}
        </a>
      </Button>
    );
  }

  return (
    <Button asChild className={className} size="sm">
      <Link href={resource.url}>{buttonContent}</Link>
    </Button>
  );
}

export function ProjectHeroHeader({
  project,
  heroImage,
  heroPanel,
  primaryResource,
  canonicalUrl,
}: {
  project: Project;
  heroImage?: string;
  heroPanel: HeroPanel;
  primaryResource?: ProjectResource;
  canonicalUrl: string;
}) {
  const backgroundImageUrl = heroImage || project.logo;
  const animationStyles = `
    @keyframes shift-background {
      0% {
        background-position: 50% 50%;
        background-size: 100%;
        opacity: 0;
        transform: rotate(0);
      }

      10% {
        opacity: 0.5;
      }

      20% {
        background-position: 65% 25%;
        background-size: 160%;
        transform: rotate(45deg);
      }

      45% {
        background-position: 90% 60%;
        background-size: 250%;
        opacity: 0.5;
        transform: rotate(160deg);
      }

      70% {
        background-position: 70% 40%;
        background-size: 200%;
        opacity: 0.5;
        transform: rotate(250deg);
      }

      100% {
        background-position: 50% 50%;
        background-size: 100%;
        opacity: 0;
        transform: rotate(1turn);
      }
    }
  `;

  return (
    <section className={cn('relative mb-4')}>
      <style dangerouslySetInnerHTML={{ __html: animationStyles }} />
      <div
        style={
          {
            '--background-color': 'rgb(255, 255, 255)',
            '--background-image': `url(${backgroundImageUrl})`,
            '--blend-mode': 'plus-lighter',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          } as CSSProperties
        }
        className={cn(
          'relative flex h-71.5 items-center overflow-hidden',
          'text-(--systemPrimary-onDark)',
          'border-b border-b-(--systemQuaternary-vibrant)',
          'rounded-bl-[2px] rounded-br-[2px]',
          'bg-center bg-cover',
          '[background:linear-gradient(to_bottom,transparent_20%,rgba(0,0,0,.8)_100%),var(--background-image),var(--background-color,#000)]',
          '[transform:translate(0)]',
          'transition-[border-bottom-left-radius,border-bottom-right-radius]',
          'duration-[210ms] ease-out',
        )}
      >
        <div
          style={{
            backdropFilter: 'blur(100px) saturate(1.5)',
            position: 'absolute',
            height: '100%',
            width: '100%',
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />
        <div
          style={{
            animation: 'shift-background 60s linear 10s infinite',
            backgroundImage: 'var(--background-image)',
            backgroundRepeat: 'repeat',
            filter: 'brightness(1.3) saturate(0) blur(50px)',
            height: '500%',
            left: '0',
            mixBlendMode: 'overlay',
            opacity: '0',
            position: 'absolute',
            top: '0',
            transformOrigin: 'top center',
            width: '100%',
            zIndex: 2,
          }}
        />
        <div className="pointer-events-none absolute inset-0 z-3 bg-linear-to-b from-black/10 via-black/30 to-black/75" />
        <div className="relative z-10 flex h-full w-full items-center px-4 py-5 sm:px-8 sm:py-7 lg:px-10">
          <div className="flex w-full flex-col gap-5 sm:flex-row sm:items-end sm:gap-6 lg:gap-8">
            <div className="mx-auto sm:mx-0">
              <ProjectHeroIcon
                imageSrc={backgroundImageUrl}
                project={project}
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col justify-end gap-4">
              <div className="flex flex-col gap-0.5">
                <h1 className="title line-clamp-2 text-[27px] leading-[1.05] font-bold tracking-[-0.04em] text-white sm:text-[32px] lg:text-[36px]">
                  {project.name}
                </h1>
                {heroPanel.subtitle && (
                  <p className="text-[16px] leading-snug font-medium text-white/78 sm:text-[18px]">
                    {heroPanel.subtitle}
                  </p>
                )}
                {heroPanel.lines.length > 0 && (
                  <div className="mt-2 flex flex-col gap-1">
                    {heroPanel.lines.map((line) => (
                      <p
                        className="text-[13px] leading-[1.4] text-white/72 sm:text-[14px]"
                        key={`${project.slug}-${line}`}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                )}
                {heroPanel.appStoreLike && (
                  <ProjectMetadataRow panel={heroPanel} />
                )}
              </div>

              {heroPanel.supportingText && !heroPanel.appStoreLike && (
                <p className="max-w-3xl text-sm leading-6 text-white/72">
                  {heroPanel.supportingText}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3 pt-1">
                {primaryResource && (
                  <HeroPrimaryAction
                    appStoreLike={heroPanel.appStoreLike}
                    resource={primaryResource}
                  />
                )}
                <ProjectDetailShareButton
                  className="size-9 shrink-0 rounded-full border-white/12 bg-white/8 text-white shadow-none backdrop-blur-sm hover:bg-white/14 hover:text-white"
                  title={project.name}
                  url={canonicalUrl}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
