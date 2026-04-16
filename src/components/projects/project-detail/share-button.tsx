'use client';

import { Button } from '@/components/ui/button';
import { Share2Icon } from 'lucide-react';
import { toast } from 'sonner';

type ProjectDetailShareButtonProps = {
  title: string;
  url: string;
  className?: string;
};

export function ProjectDetailShareButton({
  title,
  url,
  className,
}: ProjectDetailShareButtonProps) {
  async function handleShare() {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      toast.success('项目链接已复制');
    } catch {
      toast.error('复制链接失败，请稍后再试');
    }
  }

  return (
    <Button
      aria-label="分享项目"
      className={className}
      onClick={handleShare}
      size="icon-lg"
      type="button"
      variant="outline"
    >
      <Share2Icon data-icon="inline-start" />
    </Button>
  );
}
