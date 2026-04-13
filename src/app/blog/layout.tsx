import { BackToTop } from '@/components/blog/back-to-top';
import { BlogFooter } from '@/components/blog/footer';
import { BlogNavbar } from '@/components/blog/nav';

const blogLayoutStyle = {
  '--blog-sticky-offset': 'calc(env(safe-area-inset-top, 0px) + 5rem)',
  '--blog-sticky-max-height':
    'calc(100vh - var(--blog-sticky-offset, 5rem) - 2rem)',
} as React.CSSProperties;

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className="mx-auto mt-8 min-h-screen w-full max-w-[1280px] px-4 text-foreground sm:px-6"
      style={blogLayoutStyle}
    >
      <div className="mt-6 flex min-w-0 flex-col">
        <BlogNavbar />
        {children}
        <BlogFooter />
      </div>
      <BackToTop />
    </main>
  );
}
