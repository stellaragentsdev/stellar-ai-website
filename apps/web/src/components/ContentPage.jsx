import React from 'react';
import Seo from '@/components/Seo';
import Scene from '@/components/Scene';
import { CtaBand } from '@/components/V2Blocks';
import { SiteFooter, SiteHeader } from '@/components/SiteChrome';

// Shared shell for the content pages: same black/teal scene style as the home
// page, a crawlable H1 in the hero, then long-form sections.
export const ContentPage = ({ path, page, headerSub, hero, children, cta }) => (
    <div className="min-h-screen bg-black text-[#e5e5e5] font-sans">
        <Seo path={path} page={page} />
        <SiteHeader sub={headerSub} />
        <main>
            <Scene as="h1" eager {...hero} />
            {children}
            {cta !== false && <CtaBand primaryHref="/#contact" {...(cta || {})} />}
        </main>
        <SiteFooter />
    </div>
);

export const Prose = ({ id, children, className = '' }) => (
    <section id={id} className={`py-16 sm:py-20 ${className}`}>
        <div className="prose-dark mx-auto max-w-3xl px-6 lg:px-8">{children}</div>
    </section>
);

export const CardGrid = ({ id, eyebrow, title, intro, items, cols = 3 }) => (
    <section id={id} aria-labelledby={`${id}-title`} className="border-y border-white/10 bg-[#050505] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h2 id={`${id}-title`} className="section-title mt-3">{title}</h2>
            {intro && <p className="mt-4 max-w-2xl text-[#a3a3a3]">{intro}</p>}
            <ul className={`mt-12 grid gap-6 ${cols === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
                {items.map((it) => {
                    const Icon = it.icon;
                    return (
                        <li key={it.title} className="icon-card">
                            {Icon && <span className="icon-chip"><Icon className="h-5 w-5" aria-hidden="true" /></span>}
                            <h3 className="mt-5 text-lg font-semibold text-[#f5f5f5]">{it.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-[#a3a3a3]">{it.desc}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    </section>
);

export const Faq = ({ id = 'faq', title = 'Common questions', items }) => (
    <section id={id} aria-labelledby={`${id}-title`} className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <p className="eyebrow">FAQ</p>
            <h2 id={`${id}-title`} className="section-title mt-3">{title}</h2>
            <dl className="mt-10 divide-y divide-white/10 border-y border-white/10">
                {items.map((q) => (
                    <div key={q.q} className="py-6">
                        <dt className="text-base font-semibold text-[#f5f5f5]">{q.q}</dt>
                        <dd className="mt-2 text-sm leading-relaxed text-[#a3a3a3]">{q.a}</dd>
                    </div>
                ))}
            </dl>
        </div>
    </section>
);

export default ContentPage;
