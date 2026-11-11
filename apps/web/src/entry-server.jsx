import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import App from '@/App';

// Used only at build time by tools/prerender.js.
export function render(url) {
    const html = renderToString(
        <StaticRouter location={url}>
            <App />
        </StaticRouter>
    );
    const helmet = Helmet.renderStatic();
    return {
        html,
        head: [helmet.title.toString(), helmet.meta.toString(), helmet.link.toString(), helmet.script.toString()].join('\n'),
        htmlAttributes: helmet.htmlAttributes.toString(),
    };
}
