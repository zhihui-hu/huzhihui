import { BlogLink } from '@/components/blog/blog-link';
import { Button } from '@/components/ui/button';
import {
  GitBranchIcon,
  type LucideIcon,
  MailIcon,
  MapIcon,
  RssIcon,
} from 'lucide-react';

const footerLinks: Array<{
  href: string;
  icon: LucideIcon;
  label: string;
}> = [
  {
    href: '/rss.xml',
    icon: RssIcon,
    label: 'RSS',
  },
  {
    href: '/sitemap.xml',
    icon: MapIcon,
    label: 'Sitemap',
  },
  {
    href: 'mailto:i@huzhihui.com',
    icon: MailIcon,
    label: 'Email',
  },
  {
    href: 'https://github.com/zhihui-hu/',
    icon: GitBranchIcon,
    label: 'GitHub',
  },
];

export function BlogFooter() {
  return (
    <footer className="mt-12 w-full border-t border-border/60">
      <div className="container mx-auto flex flex-col gap-3 px-4 py-5 pb-[calc(env(safe-area-inset-bottom,0px)+0.75rem)] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="text-xs text-muted-foreground sm:text-sm">
          CC BY-NC 4.0 | 2016 - {new Date().getFullYear()} © 胡志辉
        </p>
        <ul className="flex flex-wrap gap-2 text-sm">
          {footerLinks.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Button
                  asChild
                  className=" border-border/60 bg-background/80 text-muted-foreground shadow-none hover:bg-muted/60 hover:text-foreground"
                  size="sm"
                  variant="outline"
                >
                  <BlogLink href={item.href}>
                    <Icon aria-hidden="true" data-icon="inline-start" />
                    {item.label}
                  </BlogLink>
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
