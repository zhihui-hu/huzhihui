import { BackToTop } from '@/components/blog/back-to-top';
import { BlogFooter } from '@/components/blog/footer';
import { BlogNavbar } from '@/components/blog/nav';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col text-foreground">
        <BlogNavbar />
        <main className="flex-1">{children}</main>
        <BlogFooter />
      </div>
      <BackToTop />
    </>
  );
}
