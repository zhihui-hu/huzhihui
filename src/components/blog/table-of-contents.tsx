'use client';

import { cn } from '@/lib/utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { type TocItem, parseToc } from './toc';

interface TableOfContentsProps {
  content: string;
  initialItems?: TocItem[];
}

function findScrollableAncestor(element: HTMLElement | null) {
  let current = element?.parentElement ?? null;

  while (current) {
    const overflowY = window.getComputedStyle(current).overflowY;
    const isScrollable =
      (overflowY === 'auto' || overflowY === 'scroll') &&
      current.scrollHeight > current.clientHeight;

    if (isScrollable) {
      return current;
    }

    current = current.parentElement;
  }

  return null;
}

export function TableOfContents({
  content,
  initialItems,
}: TableOfContentsProps) {
  const items = useMemo(
    () => (initialItems?.length ? initialItems : parseToc(content)),
    [content, initialItems],
  );
  const [activeId, setActiveId] = useState('');
  const navRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Track which heading is in view
  useEffect(() => {
    if (items.length === 0) return;

    const els = items
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost intersecting heading
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      // Trigger when heading crosses the top third of the viewport
      { rootMargin: '0px 0px -66% 0px', threshold: 0 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.map((i) => i.id).join(',')]);

  useEffect(() => {
    if (!activeId) {
      return;
    }

    const activeItem = itemRefs.current[activeId];
    const scrollContainer = findScrollableAncestor(navRef.current);

    if (!activeItem || !scrollContainer) {
      return;
    }

    const itemRect = activeItem.getBoundingClientRect();
    const containerRect = scrollContainer.getBoundingClientRect();
    const padding = 12;

    if (itemRect.top < containerRect.top + padding) {
      scrollContainer.scrollBy({
        top: itemRect.top - containerRect.top - padding,
        behavior: 'auto',
      });
      return;
    }

    if (itemRect.bottom > containerRect.bottom - padding) {
      scrollContainer.scrollBy({
        top: itemRect.bottom - containerRect.bottom + padding,
        behavior: 'auto',
      });
    }
  }, [activeId]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    el.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
    setActiveId(id);
    window.history.replaceState(null, '', `#${id}`);
  }, []);

  if (items.length === 0) return null;

  const indent: Record<number, string> = { 2: '0', 3: '0.85rem', 4: '1.7rem' };

  return (
    <nav aria-label="文章目录" className="toc-sidebar" ref={navRef}>
      <div>
        <p className="mb-3 text-[0.7rem] font-bold tracking-[0.1em] text-muted-foreground uppercase opacity-55">
          目录
        </p>

        <ul className="m-0 list-none p-0">
          {items.map((item) => {
            const isActive = item.id === activeId;

            return (
              <li
                key={item.id}
                style={{ paddingLeft: indent[item.level] ?? 0 }}
              >
                <button
                  aria-current={isActive ? 'location' : undefined}
                  className={cn(
                    'focus-visible:ring-ring/50 block w-full bg-transparent py-[3px] text-left leading-6 transition-[color,opacity] hover:text-foreground hover:opacity-100 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 cursor-pointer',
                    item.level === 2 ? 'text-[0.8rem]' : 'text-[0.76rem]',
                    isActive
                      ? 'font-medium text-foreground opacity-100'
                      : 'font-normal text-muted-foreground opacity-70',
                  )}
                  ref={(node) => {
                    itemRefs.current[item.id] = node;
                  }}
                  onClick={() => scrollTo(item.id)}
                  type="button"
                >
                  {item.text}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
