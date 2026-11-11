import React from 'react';
import sceneImages from '@/sceneImages';

const Scene = ({ id, slot, label, title, sub, cta, href, as = 'h2', eager = false, secondary }) => {
    const H = as;
    const cfg = sceneImages[slot] || {};
    const right = cfg.align === 'right';
    return (
        <section id={id} className="scene relative isolate flex min-h-[100svh] items-end overflow-hidden bg-black" aria-labelledby={`${id}-title`}>
            {cfg.layered ? (
                <div className="hero-stage-wrap absolute inset-0 -z-20">
                    <div className="hero-stage">
                        <picture>
                            <source media="(max-width: 767px)" srcSet="/images/scenes/hero-stars-mobile.webp" />
                            <img src="/images/scenes/hero-stars.webp" alt="" aria-hidden="true" className="hero-stars" />
                        </picture>
                        <img src="/images/scenes/hero-ring-1600.webp" srcSet="/images/scenes/hero-ring-1000.webp 1000w, /images/scenes/hero-ring-1600.webp 1600w"
                            sizes="(max-width: 767px) 85vw, 40vw" alt="Slowly rotating ring of connected teal and violet modules, representing a team of AI agents" fetchpriority="high" decoding="async" className="hero-ring" />
                        <img src="/images/scenes/hero-wordmark.webp" alt="Stellar Agents" decoding="async" className="hero-wordmark" />
                    </div>
                </div>
            ) : cfg.src ? (
                <picture>
                    {cfg.mobileSrc && <source media="(max-width: 767px)" srcSet={cfg.mobileSrc} />}
                    <img src={cfg.src} srcSet={cfg.srcSet} sizes={cfg.srcSet ? "100vw" : undefined} alt={cfg.alt || ''} aria-hidden={cfg.alt ? undefined : 'true'} loading={eager ? 'eager' : 'lazy'} decoding="async" fetchpriority={eager ? 'high' : 'auto'}
                        style={{ '--pos': cfg.position || 'center', '--pos-m': cfg.mobilePosition || cfg.position || 'center', ...(cfg.shift ? { translate: cfg.shift, scale: String(cfg.zoom || 1.2) } : {}) }}
                        className="scene-img absolute inset-0 -z-20 h-full w-full object-cover" />
                </picture>
            ) : (
                <div className="absolute inset-0 -z-20 scene-plain" aria-hidden="true" />
            )}
            <div className={`absolute inset-0 -z-10 ${right ? 'scene-overlay-r' : 'scene-overlay'}`} aria-hidden="true" />
            <div className="mx-auto w-full max-w-7xl px-6 pb-20 sm:pb-24 lg:px-10">
                <div className={`max-w-3xl ${right ? 'ml-auto text-left md:max-w-xl' : ''}`}>
                    {label && <p className="scene-label">{label}</p>}
                    <H id={`${id}-title`} className="scene-title mt-3">{title}</H>
                    {sub && <p className="mt-4 max-w-xl text-base text-[#d4d4d4] sm:text-lg">{sub}</p>}
                    <div className="mt-8 flex flex-wrap gap-4">
                        {cta && <a href={href} className="scene-btn">{cta}</a>}
                        {secondary && <a href={secondary.href} className="scene-btn">{secondary.label}</a>}
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Scene;
