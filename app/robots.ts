import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/teacher/', "/student/", '/page/'],
        },
        sitemap: 'https://learnhq.vercel.app/sitemap.xml',
    };
}