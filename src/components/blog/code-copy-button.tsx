'use client';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Check, Copy } from 'lucide-react';
import { startTransition, useEffect, useRef, useState } from 'react';

type CopyStatus = 'idle' | 'copied' | 'error';

type CodeCopyButtonProps = {
  value: string;
  className?: string;
};

export function CodeCopyButton({ value, className }: CodeCopyButtonProps) {
  const [status, setStatus] = useState<CopyStatus>('idle');
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);

      startTransition(() => {
        setStatus('copied');
      });
    } catch {
      startTransition(() => {
        setStatus('error');
      });
    }

    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = window.setTimeout(() => {
      startTransition(() => {
        setStatus('idle');
      });
    }, 2000);
  }

  const label =
    status === 'copied'
      ? '已复制'
      : status === 'error'
        ? '复制失败'
        : '复制代码';

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            aria-label={label}
            className={cn(
              'border-border/60 bg-background/80 text-muted-foreground hover:bg-muted hover:text-foreground',
              className,
            )}
            onClick={handleCopy}
            size="icon-xs"
            type="button"
            variant="outline"
          >
            {status === 'copied' ? <Check /> : <Copy />}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" sideOffset={8}>
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
