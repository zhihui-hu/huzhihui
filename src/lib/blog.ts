import { format } from 'date-fns';
import fs from 'node:fs';
import path from 'node:path';
import { cache } from 'react';

const BLOG_DIRECTORY = path.join(process.cwd(), 'posts');
const FRONTMATTER_REGEX = /^---\s*([\s\S]*?)\s*---\s*/;

export type BlogMetadata = {
  title: string;
  summary: string;
  publishedAt: string;
  slug: string;
  image?: string;
  keywords?: string[];
  tags?: string[];
};

export type BlogPost = {
  slug: string;
  metadata: BlogMetadata;
  content: string;
  fileName: string;
};

function getMarkdownFiles() {
  return fs
    .readdirSync(BLOG_DIRECTORY)
    .filter((file) => ['.md', '.mdx'].includes(path.extname(file)));
}

function extractFrontmatter(fileContent: string) {
  const match = fileContent.match(FRONTMATTER_REGEX);

  if (!match) {
    return {
      frontmatter: {} as Partial<BlogMetadata>,
      content: fileContent.trim(),
    };
  }

  const metadata = {} as Partial<BlogMetadata>;
  let currentListKey: 'keywords' | 'tags' | null = null;

  match[1].split('\n').forEach((line) => {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      currentListKey = null;
      return;
    }

    if (currentListKey && trimmedLine.startsWith('- ')) {
      const value = trimmedLine
        .slice(2)
        .trim()
        .replace(/^['"](.*)['"]$/, '$1');

      const list = metadata[currentListKey] || [];
      metadata[currentListKey] = [...list, value];
      return;
    }

    currentListKey = null;

    const separatorIndex = trimmedLine.indexOf(':');

    if (separatorIndex === -1) {
      return;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const rawValue = trimmedLine.slice(separatorIndex + 1).trim();
    const value = rawValue.replace(/^['"](.*)['"]$/, '$1');

    if (
      key === 'title' ||
      key === 'summary' ||
      key === 'publishedAt' ||
      key === 'slug' ||
      key === 'image'
    ) {
      metadata[key] = value;
      return;
    }

    if (key === 'keywords' || key === 'tags') {
      currentListKey = key;
      metadata[key] = rawValue
        ? rawValue
            .split(',')
            .map((item) => item.trim().replace(/^['"](.*)['"]$/, '$1'))
            .filter(Boolean)
        : [];
    }
  });

  return {
    frontmatter: metadata,
    content: fileContent.replace(FRONTMATTER_REGEX, '').trim(),
  };
}

function stripMarkdown(content: string) {
  return content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_~>-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function createSummary(content: string) {
  const plainText = stripMarkdown(content);

  if (plainText.length <= 120) {
    return plainText;
  }

  return `${plainText.slice(0, 120).trim()}...`;
}

function createTitle(content: string, fallback: string) {
  const title = content.match(/^#\s+(.+)$/m)?.[1]?.trim();

  return title || fallback;
}

function parsePublishedAt(value: string) {
  if (!value) {
    return null;
  }

  const date = value.includes('T')
    ? new Date(value)
    : new Date(`${value}T00:00:00`);

  return Number.isNaN(date.getTime()) ? null : date;
}

function normalizePost(fileName: string) {
  const rawContent = fs.readFileSync(
    path.join(BLOG_DIRECTORY, fileName),
    'utf-8',
  );
  const { frontmatter, content } = extractFrontmatter(rawContent);
  const fallbackSlug = path.basename(fileName, path.extname(fileName));
  const slug = frontmatter.slug || fallbackSlug;

  return {
    slug,
    fileName,
    content,
    metadata: {
      title: frontmatter.title || createTitle(content, slug),
      summary: frontmatter.summary || createSummary(content),
      publishedAt: frontmatter.publishedAt || '',
      slug,
      image: frontmatter.image,
      keywords: frontmatter.keywords,
      tags: frontmatter.tags,
    },
  } satisfies BlogPost;
}

export const getBlogPosts = cache(() => {
  return getMarkdownFiles()
    .map((fileName) => normalizePost(fileName))
    .sort((left, right) => {
      const leftDate = parsePublishedAt(left.metadata.publishedAt);
      const rightDate = parsePublishedAt(right.metadata.publishedAt);

      if (!leftDate && !rightDate) {
        return left.metadata.title.localeCompare(right.metadata.title, 'zh-CN');
      }

      if (!leftDate) {
        return 1;
      }

      if (!rightDate) {
        return -1;
      }

      return rightDate.getTime() - leftDate.getTime();
    });
});

export const getBlogPostBySlug = cache((slug: string) => {
  return getBlogPosts().find((post) => post.slug === slug);
});

export function formatBlogDate(date: string) {
  const parsedDate = parsePublishedAt(date);

  if (!parsedDate) {
    return '未标注日期';
  }

  return format(parsedDate, 'yyyy-MM-dd');
}

export function getBlogLastModified(date: string) {
  return parsePublishedAt(date) || new Date();
}
