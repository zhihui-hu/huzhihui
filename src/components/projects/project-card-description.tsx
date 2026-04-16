'use client';

import { startTransition, useEffect, useRef, useState } from 'react';

import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

type ProjectCardDescriptionProps = {
  description: string;
};

export function ProjectCardDescription({
  description,
}: ProjectCardDescriptionProps) {
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const element = descriptionRef.current;

    if (!element) {
      return;
    }

    const updateTruncation = () => {
      const nextValue =
        element.scrollHeight > element.clientHeight + 1 ||
        element.scrollWidth > element.clientWidth + 1;

      startTransition(() => {
        setIsTruncated((currentValue) =>
          currentValue === nextValue ? currentValue : nextValue,
        );
      });
    };

    updateTruncation();

    const resizeObserver =
      typeof ResizeObserver === 'undefined'
        ? undefined
        : new ResizeObserver(updateTruncation);

    resizeObserver?.observe(element);
    window.addEventListener('resize', updateTruncation);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', updateTruncation);
    };
  }, [description]);

  const paragraph = (
    <p
      ref={descriptionRef}
      className="mt-1 line-clamp-2 text-[0.82rem] font-normal text-muted-foreground"
    >
      {description}
    </p>
  );

  if (!isTruncated) {
    return paragraph;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{paragraph}</TooltipTrigger>
      <TooltipContent
        align="start"
        className="max-w-sm"
        side="bottom"
        sideOffset={8}
      >
        <p className="text-left leading-relaxed whitespace-normal">
          {description}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}
