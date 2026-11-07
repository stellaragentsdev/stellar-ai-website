import React from 'react';
import { Helmet } from 'react-helmet';
import { absoluteUrl } from '@/seo/routes';

// Social + canonical tags only. The page's own <Helmet> must keep a literal
// <title> and <meta name="description">, because the llms.txt build step reads
// those two tags straight out of the page file's source.
const Seo = ({ title, description, image, url, path = '/', siteName, type = 'website' }) => {
    // Always the production domain, so previews and prerendered HTML never canonicalise elsewhere.
    const canonical = url || absoluteUrl(path);
    const imageUrl = image && image.startsWith('/') ? absoluteUrl('/').replace(/\/$/, '') + image : image;

    return (
        <Helmet>
            <link rel="canonical" href={canonical} />
            <meta property="og:url" content={canonical} />
            <meta property="og:type" content={type} />
            {siteName && <meta property="og:site_name" content={siteName} />}
            {title && <meta property="og:title" content={title} />}
            {description && <meta property="og:description" content={description} />}
            {image && <meta property="og:image" content={imageUrl} />}
            <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
            {title && <meta name="twitter:title" content={title} />}
            {description && <meta name="twitter:description" content={description} />}
            {image && <meta name="twitter:image" content={imageUrl} />}
        </Helmet>
    );
}

export default Seo;

export { Seo };
