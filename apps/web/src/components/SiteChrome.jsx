import React, { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { FooterCompany } from '@/components/CompanyContact';
import { NAV_COMPANY, NAV_LEGAL, NAV_SOLUTIONS } from '@/seo/site';

// "Solutions" dropdown. The links are always in the HTML (hidden with CSS until
// opened), so crawlers and keyboard users can reach every page.
export const SolutionsMenu = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="solutions-menu relative" onMouseLeave={() => setOpen(false)}>
            <button type="button" className="nav-link inline-flex items-center gap-1" aria-expanded={open} aria-controls="solutions-panel" onClick={() => setOpen((o) => !o)}>
                Solutions <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <div id="solutions-panel" className={`solutions-panel absolute left-1/2 top-full z-50 mt-3 w-72 -translate-x-1/2 border border-white/10 bg-black p-2 ${open ? 'is-open' : ''}`}>
                <ul>
                    {NAV_SOLUTIONS.map((l) => (
                        <li key={l.href}><a href={l.href} className="block px-4 py-3 text-sm text-[#d4d4d4] hover:bg-white/5 hover:text-white">{l.label}</a></li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export const Wordmark = ({ sub }) => (
    <a href="/" className="flex items-center gap-3 group" aria-label="Stellar Agents home">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-teal-400 p-[1px]">
            <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-[#050505]">
                <Sparkles className="h-5 w-5 text-neutral-300" aria-hidden="true" />
            </div>
        </div>
        <div>
            <span className="font-display text-lg font-bold tracking-tight text-[#e5e5e5] flex items-center gap-1.5">
                Stellar<span className="glow-gradient-text">Agents</span>
            </span>
            {sub && <span className="block text-[10px] font-mono tracking-widest text-neutral-300 uppercase">{sub}</span>}
        </div>
    </a>
);

const Burger = ({ open }) => (
    <span className="relative block h-3.5 w-6" aria-hidden="true">
        <span className={`absolute left-0 top-0 h-0.5 w-6 bg-white transition ${open ? 'translate-y-[6px] rotate-45' : ''}`} />
        <span className={`absolute left-0 top-[6px] h-0.5 w-6 bg-white transition ${open ? 'opacity-0' : ''}`} />
        <span className={`absolute left-0 top-3 h-0.5 w-6 bg-white transition ${open ? '-translate-y-[6px] -rotate-45' : ''}`} />
    </span>
);

// Header for the content pages (keyword pages, privacy, terms, 404).
export const SiteHeader = ({ sub }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
            <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-8">
                <Wordmark sub={sub} />
                <nav className="ml-10 mr-6 hidden items-center gap-6 xl:flex" aria-label="Main">
                    <a href="/" className="nav-link">Home</a>
                    <SolutionsMenu />
                    <a href="/careers" className="nav-link">Careers</a>
                    <a href="/#contact" className="nav-link">Contact</a>
                </nav>
                <div className="flex items-center gap-2 sm:gap-4">
                    <a href="/#contact" className="hidden sm:inline-flex items-center gap-2 whitespace-nowrap rounded-none border-2 border-white px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-white hover:text-black">
                        Book a free call
                    </a>
                    <button type="button" className="xl:hidden inline-flex h-11 w-11 items-center justify-center text-white" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen((o) => !o)}>
                        <Burger open={menuOpen} />
                    </button>
                </div>
            </div>
            {menuOpen && (
                <nav id="mobile-menu" className="xl:hidden border-t border-white/10 bg-black px-6 py-6" aria-label="Mobile" onClick={() => setMenuOpen(false)}>
                    <ul className="flex flex-col gap-5">
                        <li><a href="/" className="nav-link">Home</a></li>
                        {NAV_SOLUTIONS.map((l) => <li key={l.href}><a href={l.href} className="nav-link">{l.label}</a></li>)}
                        <li><a href="/careers" className="nav-link">Careers & internships</a></li>
                        <li><a href="/#contact" className="nav-link">Book a free call</a></li>
                    </ul>
                </nav>
            )}
        </header>
    );
};

const FooterCol = ({ title, links }) => (
    <div>
        <p className="text-[11px] font-mono uppercase tracking-widest text-[#8a8a8a]">{title}</p>
        <ul className="mt-3 space-y-2">
            {links.map((l) => <li key={l.href}><a href={l.href} className="text-xs text-[#a3a3a3] hover:text-white transition">{l.label}</a></li>)}
        </ul>
    </div>
);

export const SiteFooter = ({ label = 'Stellar Agents' }) => (
    <footer className="border-t border-white/10 bg-[#050505] py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid gap-10 md:grid-cols-4">
            <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-neutral-300" aria-hidden="true" />
                <span className="font-display font-bold text-[#e5e5e5]">{label}</span>
            </div>
            <FooterCol title="Solutions" links={NAV_SOLUTIONS} />
            <FooterCol title="Company" links={NAV_COMPANY} />
            <FooterCol title="Legal" links={NAV_LEGAL} />
        </div>
        <FooterCompany />
    </footer>
);
