import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { AppRoutes } from '@/App';

// Build-time only: renders a route to static HTML so the initial response
// contains real headings, copy and per-route head tags. The client hydrates it.
export function render(url) {
    const html = renderToString(
        <StaticRouter location={url}>
            <AppRoutes />
        </StaticRouter>
    );
    const helmet = Helmet.renderStatic();
    const head = [helmet.title, helmet.meta, helmet.link]
        .map((part) => part.toString())
        .filter(Boolean)
        .join('\n\t\t');
    return { html, head };
}
