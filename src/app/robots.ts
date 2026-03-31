import type { MetadataRoute } from 'next';

import pkg from '../../package.json';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${pkg.seo.og.url}/sitemap.xml`,
    host: pkg.seo.og.url,
  };
}
