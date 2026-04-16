export type ProjectSourceAttribute = {
  label: string;
  module?: string;
  kind?: string;
  url?: string;
  type?: string;
  text?: string;
};

export type ProjectSourceResource = {
  label: string;
  url?: string;
  kind?: string;
  text?: string;
};

export type ProjectSourceScreenshot = {
  image: string;
};

export type ProjectSourceAsset = {
  label?: string;
  image: string;
};

export type ProjectSourcePeriod = {
  start: string;
  end?: string | null;
  ongoing?: boolean;
  text: string;
};

export type ProjectSourceDevelopment = {
  name: string;
  period?: ProjectSourcePeriod;
  summary: string[];
  techStack?: string[];
  resources?: ProjectSourceResource[];
  screenshots?: ProjectSourceScreenshot[];
  assets?: ProjectSourceAsset[];
};

export type ProjectSourceDetail = {
  logo?: string;
  headline?: string;
  categories?: string[];
  attributes?: ProjectSourceAttribute[];
  introduction: string[];
  development: ProjectSourceDevelopment[];
};

export type ProjectSource = {
  slug: string;
  name: string;
  route?: string;
  url?: string;
  logo?: string;
  overview?: string;
  description?: string;
  tags: string[];
  detail: ProjectSourceDetail;
};
