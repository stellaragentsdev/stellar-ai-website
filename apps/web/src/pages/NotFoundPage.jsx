import React from 'react';
import ContentPage, { Prose } from '@/components/ContentPage';
import { NAV_SOLUTIONS, NOT_FOUND } from '@/seo/site';

const NotFoundPage = () => (
    <ContentPage
        page={NOT_FOUND}
        path="/404"
        headerSub="PAGE NOT FOUND"
        hero={{ id: 'notfound-top', slot: 'roi', label: 'Error 404', title: 'Page not found', sub: 'The page you were looking for does not exist or has moved.', cta: 'Go to the home page', href: '/' }}
        cta={false}
    >
        <Prose id="links">
            <h2>Try one of these pages</h2>
            <ul>
                <li><a href="/">Home</a></li>
                {NAV_SOLUTIONS.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
                <li><a href="/careers">Careers & internships</a></li>
            </ul>
        </Prose>
    </ContentPage>
);

export default NotFoundPage;
