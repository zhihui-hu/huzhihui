'use client';

import { useBlogExternalLinkWarning } from '@/components/blog/blog-link';
import { Button } from '@/components/ui/button';
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from '@/components/ui/responsive-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import { CopyCheckIcon, CopyIcon, Share2Icon } from 'lucide-react';
import { motion } from 'motion/react';
import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

function QrDialog({
  open,
  onOpenChange,
  url,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string;
}) {
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=12&data=${encodeURIComponent(url)}`;

  return (
    <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
      <ResponsiveDialogContent
        className="sm:max-w-xs"
        drawerClassName="pb-[calc(env(safe-area-inset-bottom,0px)+0.75rem)]"
      >
        <ResponsiveDialogHeader className="items-center text-center">
          <ResponsiveDialogTitle>微信扫码分享</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            打开微信扫一扫，把这篇文章发给朋友或留着稍后再读。
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>

        <div className="mx-auto rounded-xl border border-border/70 bg-background p-3">
          <QrCodePreview key={qrSrc} src={qrSrc} />
        </div>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}

function QrCodePreview({ src }: { src: string }) {
  const [qrState, setQrState] = useState<'loading' | 'loaded' | 'error'>(
    'loading',
  );
  const prefersReducedMotion = useMediaQuery(
    '(prefers-reduced-motion: reduce)',
  );

  return (
    <div className="relative size-[200px]">
      {qrState === 'loading' && (
        <QrCodeSkeleton prefersReducedMotion={prefersReducedMotion} />
      )}

      {qrState === 'error' ? (
        <div className="flex size-full items-center justify-center rounded-md bg-muted px-4 text-center text-sm text-muted-foreground">
          二维码加载失败，请稍后重试。
        </div>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          alt="文章分享二维码"
          className={cn(
            'size-[200px] rounded-md transition-opacity duration-200',
            qrState === 'loaded' ? 'opacity-100' : 'opacity-0',
          )}
          decoding="async"
          height={200}
          onError={() => setQrState('error')}
          onLoad={() => setQrState('loaded')}
          src={src}
          width={200}
        />
      )}
    </div>
  );
}

function QrCodeSkeleton({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden rounded-md"
    >
      <Skeleton
        className="absolute inset-0 rounded-md bg-muted/80"
        style={prefersReducedMotion ? { animation: 'none' } : undefined}
      />

      {!prefersReducedMotion && (
        <motion.div
          animate={{ opacity: [0.5, 0], scale: [0.82, 1.08] }}
          aria-hidden="true"
          className="pointer-events-none absolute inset-5 rounded-xl border border-border/55"
          transition={{
            duration: 1.7,
            ease: 'easeOut',
            repeat: Infinity,
          }}
        />
      )}
    </div>
  );
}

function BrandIcon({ alt, src }: { alt: string; src: string }) {
  return (
    <span
      data-icon="inline-start"
      className="flex size-4 shrink-0 items-center"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={alt}
        className="size-4 shrink-0"
        height={16}
        src={src}
        width={16}
      />
    </span>
  );
}

function ActionButton({
  active = false,
  icon,
  label,
  onClick,
}: {
  active?: boolean;
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <Button
      aria-label={label}
      className={cn(
        'rounded-full text-muted-foreground shadow-none',
        active && 'border-border/90 bg-muted text-foreground',
      )}
      onClick={onClick}
      title={label}
      type="button"
      variant="outline"
      size="sm"
    >
      {icon}
      {label}
    </Button>
  );
}

// ---------------------------------------------------------------------------
// ShareBar
// ---------------------------------------------------------------------------

interface ShareBarProps {
  title: string;
  url: string;
}

export function ShareBar({ title, url }: ShareBarProps) {
  const { dialog: externalLinkDialog, openWarning } =
    useBlogExternalLinkWarning();
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [hasNativeShare, setHasNativeShare] = useState(false);
  const copyResetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setHasNativeShare(!!navigator.share);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (copyResetTimerRef.current) {
        clearTimeout(copyResetTimerRef.current);
      }
    };
  }, []);

  // ── Copy URL ──────────────────────────────────────────────────────────────
  const copyUrl = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = url;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }

    setCopied(true);

    if (copyResetTimerRef.current) {
      clearTimeout(copyResetTimerRef.current);
    }

    copyResetTimerRef.current = setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [url]);

  // ── Weibo ─────────────────────────────────────────────────────────────────
  const shareWeibo = useCallback(() => {
    const shareUrl = new URL('https://service.weibo.com/share/share.php');
    shareUrl.searchParams.set('url', url);
    shareUrl.searchParams.set('title', title);

    openWarning(shareUrl.toString());
  }, [openWarning, url, title]);

  // ── Native share ──────────────────────────────────────────────────────────
  const nativeShare = useCallback(async () => {
    if (!navigator.share) {
      return;
    }

    try {
      await navigator.share({ title, url });
    } catch {
      // user cancelled or not supported
    }
  }, [title, url]);

  return (
    <>
      {externalLinkDialog}
      <QrDialog open={showQr} onOpenChange={setShowQr} url={url} />

      <div className="share-bar mt-12 border-t border-border/70 pt-8">
        <p className="mb-3 text-[0.7rem] font-semibold tracking-[0.08em] text-muted-foreground/70 uppercase">
          分享这篇文章
        </p>

        <div className="flex flex-wrap gap-2">
          <ActionButton
            active={copied}
            icon={
              copied ? (
                <CopyCheckIcon data-icon="inline-start" />
              ) : (
                <CopyIcon data-icon="inline-start" />
              )
            }
            label={copied ? '已复制' : '复制链接'}
            onClick={copyUrl}
          />
          <ActionButton
            icon={
              <BrandIcon
                alt="微博"
                src="https://cdn.simpleicons.org/sinaweibo/E6162D"
              />
            }
            label="微博"
            onClick={shareWeibo}
          />
          <ActionButton
            icon={
              <BrandIcon
                alt="微信"
                src="https://cdn.simpleicons.org/wechat/07C160"
              />
            }
            label="微信"
            onClick={() => setShowQr(true)}
          />
          {hasNativeShare && (
            <ActionButton
              icon={<Share2Icon data-icon="inline-start" />}
              label="其他方式"
              onClick={nativeShare}
            />
          )}
        </div>
      </div>
    </>
  );
}
