import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: ['/'],
            disallow: ['/login/', '/sorter/'],
        },
        sitemap: 'https://collinsruto.vercel.app/sitemap.xml',
    };
}