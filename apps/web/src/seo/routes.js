// Single source of truth for public, indexable routes.
// Used by the client <Seo> component, the prerender step, and sitemap.xml generation.
export const SITE_URL = 'https://stellaragents.in';

export const PUBLIC_ROUTES = ['/', '/careers'];

export const absoluteUrl = (pathname = '/') =>
    SITE_URL + (pathname === '/' ? '/' : pathname.replace(/\/+$/, ''));
