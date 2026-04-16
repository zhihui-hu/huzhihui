'use client';

/* eslint-disable @next/next/no-img-element -- project archives mix local and remote images */
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { XIcon } from 'lucide-react';

type ProjectImagePreviewProps = {
  alt: string;
  buttonClassName?: string;
  caption?: string;
  imageClassName?: string;
  src: string;
};

export function ProjectImagePreview({
  alt,
  buttonClassName,
  caption,
  imageClassName,
  src,
}: ProjectImagePreviewProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          aria-label={`查看大图：${alt}`}
          className={cn(
            'group relative block w-full cursor-zoom-in overflow-hidden',
            buttonClassName,
          )}
          type="button"
        >
          <img
            alt={alt}
            className={cn(
              'h-auto w-full object-cover transition-transform duration-200 group-hover:scale-[1.01]',
              imageClassName,
            )}
            loading="lazy"
            src={src}
          />
          <span className="pointer-events-none absolute right-3 bottom-3 rounded-full bg-black/55 px-2 py-1 text-[11px] font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            查看大图
          </span>
        </button>
      </DialogTrigger>
      <DialogContent
        className="max-w-[calc(100vw-1rem)] border-0 bg-black/92 p-2 text-white ring-1 ring-white/10 sm:max-w-5xl"
        showCloseButton={false}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{alt}</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <DialogClose asChild>
            <Button
              className="absolute top-2 right-2 z-10 rounded-full bg-black/55 text-white hover:bg-black/75 hover:text-white"
              size="icon-sm"
              variant="ghost"
            >
              <XIcon />
              <span className="sr-only">关闭预览</span>
            </Button>
          </DialogClose>
          <div className="overflow-hidden rounded-lg">
            <img
              alt={alt}
              className="max-h-[85vh] w-full object-contain"
              src={src}
            />
          </div>
        </div>
        {caption ? (
          <p className="px-2 pb-1 text-center text-xs text-white/70">
            {caption}
          </p>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
