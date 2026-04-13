export interface TocItem {
  id: string;
  text: string;
  level: number;
}

const HEADING_PATTERN = /^(#{2,4})\s+(.+)$/;

function stripMarkdown(value: string) {
  return value
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/[*_~]/g, '')
    .replace(/<[^>]+>/g, '')
    .trim();
}

export function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w\u4e00-\u9fa5-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function parseToc(content: string): TocItem[] {
  const items: TocItem[] = [];
  const slugCounts = new Map<string, number>();

  for (const line of content.split('\n')) {
    const match = line.match(HEADING_PATTERN);

    if (!match) {
      continue;
    }

    const level = match[1].length;
    const text = stripMarkdown(match[2]);
    const baseId = slugifyHeading(text);

    if (!text || !baseId) {
      continue;
    }

    const duplicateCount = slugCounts.get(baseId) ?? 0;
    slugCounts.set(baseId, duplicateCount + 1);

    items.push({
      id: duplicateCount === 0 ? baseId : `${baseId}-${duplicateCount}`,
      text,
      level,
    });
  }

  return items;
}

export function getTocIndentClass(level: number) {
  switch (level) {
    case 3:
      return 'pl-5';
    case 4:
      return 'pl-8';
    default:
      return 'pl-2';
  }
}
