import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { cache } from 'react';

import { PROJECT_SOURCES } from './projects-source';
import type {
  ProjectSource,
  ProjectSourceAttribute,
  ProjectSourceDevelopment,
  ProjectSourcePeriod,
  ProjectSourceResource,
} from './projects-source';

type ProjectScreenshot = {
  image: string;
};

type ProjectAsset = {
  label?: string;
  image: string;
};

export type ProjectAttribute = {
  label: string;
  module?: string;
  value?: string;
  url?: string;
  kind?: string;
  type?: string;
};

export type ProjectResource = {
  label: string;
  url?: string;
  kind?: string;
  text?: string;
};

export type ProjectPeriod = {
  start: string;
  end?: string | null;
  ongoing?: boolean;
  text: string;
};

export type ProjectDevelopment = {
  name: string;
  period?: ProjectPeriod;
  summary: string[];
  techStack?: string[];
  resources?: ProjectResource[];
  screenshots?: ProjectScreenshot[];
  assets?: ProjectAsset[];
};

export type ProjectDetail = {
  logo?: string;
  headline?: string;
  categories?: string[];
  attributes?: ProjectAttribute[];
  introduction: string[];
  development: ProjectDevelopment[];
};

const PUBLIC_ROOT = join(process.cwd(), 'public');

export type Project = {
  slug: string;
  name: string;
  route: string;
  sourceRoute?: string;
  logo?: string;
  description: string;
  tags: string[];
  listTags: string[];
  url?: string;
  repo?: string;
  publishedAt?: string;
  timeLabel?: string;
  detail: ProjectDetail;
};

function compareProjectByStartedAtDesc(left: Project, right: Project) {
  const leftStart = left.publishedAt || '';
  const rightStart = right.publishedAt || '';

  const dateDiff = rightStart.localeCompare(leftStart);

  if (dateDiff !== 0) {
    return dateDiff;
  }

  return left.name.localeCompare(right.name, 'zh-CN');
}

function normalizeTagKey(tag: string) {
  return tag.trim().toLowerCase();
}

function appendProjectTag(result: string[], seen: Set<string>, tag?: string) {
  if (!tag) {
    return;
  }

  const value = tag.trim();

  if (!value) {
    return;
  }

  const key = normalizeTagKey(value);

  if (seen.has(key)) {
    return;
  }

  seen.add(key);
  result.push(value);
}

function collectProjectTags(
  tagGroups: Array<readonly string[] | undefined>,
  limit?: number,
) {
  const tags: string[] = [];
  const seen = new Set<string>();

  for (const group of tagGroups) {
    for (const tag of group || []) {
      appendProjectTag(tags, seen, tag);

      if (limit && tags.length >= limit) {
        return tags;
      }
    }
  }

  return tags;
}

function getProjectListTags(projectSource: ProjectSource) {
  return collectProjectTags([projectSource.tags]);
}

function getProjectTags(projectSource: ProjectSource) {
  return collectProjectTags(
    [
      projectSource.tags,
      ...(projectSource.detail.development || []).map(
        (development) => development.techStack,
      ),
    ],
    8,
  );
}

function getProjectOverview(projectSource: ProjectSource) {
  return projectSource.overview || projectSource.description || '';
}

function getPrimaryProjectUrl(projectSource: ProjectSource) {
  if (projectSource.url) {
    return projectSource.url;
  }

  return projectSource.detail.attributes?.find(
    (attribute) => attribute.kind === 'website',
  )?.url;
}

function getRepositoryUrl(projectSource: ProjectSource) {
  return projectSource.detail.attributes?.find(
    (attribute) => attribute.kind === 'repository',
  )?.url;
}

function readProjectSources(): ProjectSource[] {
  return PROJECT_SOURCES;
}

function getFileName(filePath: string) {
  const segments = filePath.split(/[\\/]/).filter(Boolean);

  return segments.at(-1) || filePath;
}

function hasPublicAsset(publicPath: string) {
  return existsSync(join(PUBLIC_ROOT, publicPath.replace(/^\//, '')));
}

function normalizePublicAssetPath(image: string) {
  if (image.startsWith('/')) {
    return hasPublicAsset(image) ? image : undefined;
  }

  if (image.startsWith('public/')) {
    const publicPath = `/${image.slice('public/'.length)}`;

    return hasPublicAsset(publicPath) ? publicPath : undefined;
  }

  if (image.startsWith('src/public/')) {
    const publicPath = `/${image.slice('src/public/'.length)}`;

    return hasPublicAsset(publicPath) ? publicPath : undefined;
  }

  const fallbackPath = `/assets/projects/${getFileName(image)}`;

  return hasPublicAsset(fallbackPath) ? fallbackPath : undefined;
}

function normalizeLogoPath(image?: string) {
  if (!image) {
    return undefined;
  }

  if (/^https?:\/\//.test(image)) {
    return image;
  }

  return normalizePublicAssetPath(image);
}

function normalizeImagePath(image?: string) {
  if (!image) {
    return undefined;
  }

  if (/^https?:\/\//.test(image)) {
    return image;
  }

  return normalizePublicAssetPath(image);
}

function isNonEmptyString(value: string | undefined): value is string {
  return Boolean(value);
}

function normalizeAttribute(
  attribute: ProjectSourceAttribute,
): ProjectAttribute {
  return {
    label: attribute.label,
    module: attribute.module,
    value: attribute.text || attribute.module || attribute.url,
    url: attribute.url,
    kind: attribute.kind,
    type: attribute.type,
  };
}

function normalizeResource(resource: ProjectSourceResource): ProjectResource {
  return {
    label: resource.label,
    url: resource.url,
    kind: resource.kind,
    text: resource.text,
  };
}

function normalizeDevelopment(
  development: ProjectSourceDevelopment,
): ProjectDevelopment {
  return {
    name: development.name,
    period: development.period,
    summary: development.summary || [],
    techStack: development.techStack || [],
    resources: (development.resources || []).map(normalizeResource),
    screenshots: (development.screenshots || [])
      .map((item) => normalizeImagePath(item.image))
      .filter(isNonEmptyString)
      .map((image) => ({
        image,
      })),
    assets: (development.assets || []).reduce<ProjectAsset[]>(
      (result, item) => {
        const image = normalizeImagePath(item.image);

        if (!image) {
          return result;
        }

        result.push({
          label: item.label,
          image,
        });

        return result;
      },
      [],
    ),
  };
}

function getProjectTimeline(projectSource: ProjectSource) {
  const periods = (projectSource.detail.development || [])
    .map((item) => item.period)
    .filter((period): period is ProjectSourcePeriod => Boolean(period?.start));

  if (periods.length === 0) {
    return {
      publishedAt: undefined,
      timeLabel: undefined,
    };
  }

  const starts = periods
    .map((period) => period.start)
    .sort((a, b) => a.localeCompare(b));
  const hasOngoing = periods.some((period) => period.ongoing || !period.end);
  const ends = periods
    .map((period) => period.end)
    .filter((end): end is string => Boolean(end))
    .sort((a, b) => a.localeCompare(b));
  const startedAt = starts[0];
  const endedAt = hasOngoing ? undefined : ends.at(-1);

  return {
    publishedAt: startedAt,
    timeLabel: startedAt ? `${startedAt} ～ ${endedAt || '至今'}` : undefined,
  };
}

function toProject(projectSource: ProjectSource): Project {
  const timeline = getProjectTimeline(projectSource);

  return {
    slug: projectSource.slug,
    name: projectSource.name,
    route: `/projects/${projectSource.slug}`,
    sourceRoute: projectSource.route,
    logo: normalizeLogoPath(projectSource.logo || projectSource.detail.logo),
    description: getProjectOverview(projectSource),
    tags: getProjectTags(projectSource),
    listTags: getProjectListTags(projectSource),
    url: getPrimaryProjectUrl(projectSource),
    repo: getRepositoryUrl(projectSource),
    publishedAt: timeline.publishedAt,
    timeLabel: timeline.timeLabel,
    detail: {
      logo: normalizeLogoPath(projectSource.detail.logo || projectSource.logo),
      headline:
        projectSource.detail.headline || getProjectOverview(projectSource),
      categories: projectSource.detail.categories || [],
      attributes: (projectSource.detail.attributes || []).map(
        normalizeAttribute,
      ),
      introduction: projectSource.detail.introduction || [
        getProjectOverview(projectSource),
      ],
      development: (projectSource.detail.development || []).map(
        normalizeDevelopment,
      ),
    },
  };
}

export const getProjects = cache((): Project[] => {
  return readProjectSources()
    .map(toProject)
    .sort(compareProjectByStartedAtDesc);
});

export const getProjectBySlug = cache((slug: string): Project | undefined => {
  return getProjects().find((project) => project.slug === slug);
});

export const getProjectSlugs = cache((): string[] => {
  return getProjects().map((project) => project.slug);
});
