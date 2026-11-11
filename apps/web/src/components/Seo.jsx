import React from 'react';
import { Helmet } from 'react-helmet';
import { BRAND, SITE_URL, canonicalFor, getPage, jsonLdFor } from '@/seo/site';

// All head tags for a page come from src/seo/site.js, so the prerendered HTML,
// the sitemap and llms.txt always agree. Canonicals are hard-coded to
// https://stellaragents.in and never derived from the requested host.
const Seo = ({ path, page: pageOverride }) => {
    const page = pageOverride || getPage(path);
    if (!page) return null;
    const canonical = canonicalFor(page.path);
    const image = `${SITE_URL}${page.ogImage}`;

    return (
        <Helmet htmlAttributes={{ lang: 'en' }}>
            <title>{page.title}</title>
            <meta name="description" content={page.description} />
            {page.noindex ? <meta name="robots" content="noindex, follow" /> : <link rel="canonical" href={canonical} />}
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={BRAND} />
            <meta property="og:locale" content="en_IN" />
            <meta property="og:title" content={page.title} />
            <meta property="og:description" content={page.description} />
            {!page.noindex && <meta property="og:url" content={canonical} />}
            <meta property="og:image" content={image} />
            <meta property="og:image:type" content="image/jpeg" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={`${BRAND}: ${page.ogHeading || page.title}`} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={page.title} />
            <meta name="twitter:description" content={page.description} />
            <meta name="twitter:image" content={image} />
            {!page.noindex && <script type="application/ld+json">{JSON.stringify(jsonLdFor(page))}</script>}
        </Helmet>
    );
};

export default Seo;

export { Seo };
