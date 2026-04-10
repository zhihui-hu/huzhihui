import { CodeCopyButton } from '@/components/blog/code-copy-button';
import { isSensitiveCodeSample } from '@/components/blog/code-safety';
import { cn } from '@/lib/utils';
import { cache } from 'react';
import { codeToHtml } from 'shiki';

type CodeBlockProps = {
  code: string;
  language?: string;
  className?: string;
};

function normalizeLanguage(language?: string) {
  return language?.trim().toLowerCase() || 'text';
}

function formatLanguageLabel(language: string) {
  if (language === 'text' || language === 'plaintext') {
    return 'text';
  }

  if (language === 'shell' || language === 'sh') {
    return 'bash';
  }

  return language;
}

const renderHighlightedCode = cache(async (code: string, language: string) => {
  const themes = {
    light: 'github-light',
    dark: 'github-dark',
  } as const;

  try {
    return await codeToHtml(code, {
      lang: language,
      themes,
      defaultColor: false,
    });
  } catch {
    return await codeToHtml(code, {
      lang: 'text',
      themes,
      defaultColor: false,
    });
  }
});

export async function CodeBlock({ code, language, className }: CodeBlockProps) {
  const normalizedLanguage = normalizeLanguage(language);
  const html = await renderHighlightedCode(code, normalizedLanguage);
  const allowCopy = !isSensitiveCodeSample(code);

  return (
    <div
      className={cn(
        'github-code-block my-6 overflow-hidden rounded-md border border-border/70 bg-background',
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-border/60 bg-muted/20 px-3 py-1.5">
        <span className="font-mono text-[10px] font-medium tracking-wide text-muted-foreground/80">
          {formatLanguageLabel(normalizedLanguage)}
        </span>
        {allowCopy ? <CodeCopyButton value={code} /> : null}
      </div>
      <div
        className="github-code-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
