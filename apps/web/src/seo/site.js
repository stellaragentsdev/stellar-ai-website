// Single source of truth for page metadata. Plain ESM with no JSX or path
// aliases, so build tools (prerender, sitemap, llms.txt) can import it in Node.

export const SITE_URL = 'https://stellaragents.in';
export const BRAND = 'Stellar Agents';
export const LEGAL_NAME = 'STELLARONE HEALTH TECHNOLOGIES PRIVATE LIMITED';
export const EMAIL = 'support@stellaragents.in';
export const GSTIN = '33ABQCS1066G1Z9';
export const ADDRESS = {
    street: 'WeWork Olympia Cyberspace, No 21/22, Arulayiammanpet 2nd St, Alandur Rd, Guindy',
    locality: 'Chennai',
    region: 'Tamil Nadu',
    postalCode: '600032',
    country: 'IN',
    full: 'WeWork Olympia Cyberspace, No 21/22, Arulayiammanpet 2nd St, Alandur Rd, Guindy, Chennai, Tamil Nadu 600032, India',
};

// `path` is the public URL path. `file` is the prerendered HTML file written to
// the build output. `ogImage` lives in public/og/.
export const PAGES = [
    {
        path: '/',
        file: 'index.html',
        title: 'Stellar Agents | Custom AI Agents for Business',
        description: 'Stellar Agents in Chennai builds human-in-the-loop AI agents for healthcare, operations and growth. You approve; the agent works in tools you already use.',
        ogImage: '/og/home.jpg',
        ogHeading: 'Custom AI agents for business',
        llmsSummary: 'Homepage. What Stellar Agents builds (custom, human-in-the-loop AI agents and copilots), how an engagement works, industries, demos and the contact form.',
        changefreq: 'monthly',
        priority: '1.0',
    },
    {
        path: '/agentic-ai',
        file: 'agentic-ai.html',
        title: 'What Is Agentic AI? | Stellar Agents Guide',
        description: 'Agentic AI is software that can plan and act toward a goal, with tools and human checks. Learn how it works and how Stellar Agents builds it for business.',
        ogImage: '/og/agentic-ai.jpg',
        ogHeading: 'What is agentic AI?',
        llmsSummary: 'Plain-language guide: what agentic AI is, how an AI agent differs from a chatbot, where human review fits, the main risks and how a pilot is scoped.',
        changefreq: 'monthly',
        priority: '0.8',
    },
    {
        path: '/ai-agent-development-company-india',
        file: 'ai-agent-development-company-india.html',
        title: 'AI Agent Development Company in India | Stellar Agents',
        description: 'Stellar Agents is a Chennai company that designs, connects and guards custom AI agents for healthcare, operations and growth teams in India and abroad.',
        ogImage: '/og/ai-agent-development-company-india.jpg',
        ogHeading: 'AI agent development company in India',
        llmsSummary: 'Services page: what Stellar Agents designs and builds, how a project runs from scoping to handover, and what clients should prepare.',
        changefreq: 'monthly',
        priority: '0.8',
    },
    {
        path: '/agentic-ai-chennai',
        file: 'agentic-ai-chennai.html',
        title: 'Agentic AI Solutions in Chennai | Stellar Agents',
        description: 'Work with a Chennai team at WeWork Olympia, Guindy, to scope and launch human-in-the-loop agentic AI inside the tools you already use.',
        ogImage: '/og/agentic-ai-chennai.jpg',
        ogHeading: 'Agentic AI solutions in Chennai',
        llmsSummary: 'Location page for the Chennai office (WeWork Olympia Cyberspace, Guindy): in-person scoping, typical first projects and how to get in touch.',
        changefreq: 'monthly',
        priority: '0.7',
    },
    {
        path: '/ai-agents-healthcare-rcm',
        file: 'ai-agents-healthcare-rcm.html',
        title: 'Healthcare RCM AI Agents | Stellar Agents, Chennai',
        description: 'Human-reviewed AI agents for claim denial work, billing document checks and patient-intake support, built in Chennai for healthcare revenue cycle teams.',
        ogImage: '/og/ai-agents-healthcare-rcm.jpg',
        ogHeading: 'Healthcare RCM AI agents with human review',
        llmsSummary: 'Industry page: where AI agents can help healthcare revenue cycle (RCM) teams, the human review built into each step, and how data is handled.',
        changefreq: 'monthly',
        priority: '0.7',
    },
    {
        path: '/careers',
        file: 'careers.html',
        title: 'Careers & AI Agent Certifications | Stellar Agents',
        description: 'Join Stellar Agents in Chennai for startup roles, paid internships and live agentic-AI certification cohorts with client stipends.',
        ogImage: '/og/careers.jpg',
        ogHeading: 'Careers & AI agent certifications',
        llmsSummary: 'Open roles, paid internships and paid project-based certification cohorts in agentic AI.',
        changefreq: 'monthly',
        priority: '0.6',
    },
    {
        path: '/privacy',
        file: 'privacy.html',
        title: 'Privacy Policy (Draft) | Stellar Agents',
        description: 'Draft privacy policy for stellaragents.in: what the contact form collects, why, how long it is kept and how to reach us. Pending legal review.',
        ogImage: '/og/privacy.jpg',
        ogHeading: 'Privacy policy (draft)',
        llmsSummary: 'Draft privacy policy, pending legal review. Not yet in effect.',
        changefreq: 'yearly',
        priority: '0.3',
    },
    {
        path: '/terms',
        file: 'terms.html',
        title: 'Terms of Use (Draft) | Stellar Agents',
        description: 'Draft terms of use for stellaragents.in, covering use of the website, demos, estimates and content. Pending legal review.',
        ogImage: '/og/terms.jpg',
        ogHeading: 'Terms of use (draft)',
        llmsSummary: 'Draft terms of use for the website, pending legal review. Not yet in effect.',
        changefreq: 'yearly',
        priority: '0.3',
    },
];

export const NOT_FOUND = {
    path: '/404',
    file: '404.html',
    title: 'Page not found | Stellar Agents',
    description: 'The page you were looking for does not exist on stellaragents.in.',
    ogImage: '/og/home.jpg',
    noindex: true,
};

export const getPage = (path) => PAGES.find((p) => p.path === path);

export const canonicalFor = (path) => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`);

export const organizationJsonLd = () => ({
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: BRAND,
    legalName: LEGAL_NAME,
    alternateName: ['stellaragents', 'StellarOne Health Technologies Pvt Ltd'],
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/icon-512.png`,
    email: EMAIL,
    address: {
        '@type': 'PostalAddress',
        streetAddress: ADDRESS.street,
        addressLocality: ADDRESS.locality,
        addressRegion: ADDRESS.region,
        postalCode: ADDRESS.postalCode,
        addressCountry: ADDRESS.country,
    },
    vatID: GSTIN,
});

export const websiteJsonLd = () => ({
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: BRAND,
    inLanguage: 'en',
    publisher: { '@id': `${SITE_URL}/#organization` },
});

export const jsonLdFor = (page) => ({
    '@context': 'https://schema.org',
    '@graph': [
        organizationJsonLd(),
        websiteJsonLd(),
        {
            '@type': 'WebPage',
            '@id': `${canonicalFor(page.path)}#webpage`,
            url: canonicalFor(page.path),
            name: page.title,
            description: page.description,
            inLanguage: 'en',
            isPartOf: { '@id': `${SITE_URL}/#website` },
            about: { '@id': `${SITE_URL}/#organization` },
            primaryImageOfPage: { '@type': 'ImageObject', url: `${SITE_URL}${page.ogImage}`, width: 1200, height: 630 },
        },
    ],
});

// Footer/nav groups shared across pages.
export const NAV_SOLUTIONS = [
    { href: '/agentic-ai', label: 'What is agentic AI?' },
    { href: '/ai-agent-development-company-india', label: 'AI agent development in India' },
    { href: '/agentic-ai-chennai', label: 'Agentic AI in Chennai' },
    { href: '/ai-agents-healthcare-rcm', label: 'Healthcare RCM agents' },
];
export const NAV_COMPANY = [
    { href: '/', label: 'Home' },
    { href: '/careers', label: 'Careers & internships' },
    { href: '/careers#certifications', label: 'Certifications' },
    { href: '/#contact', label: 'Contact' },
];
export const NAV_LEGAL = [
    { href: '/privacy', label: 'Privacy (draft)' },
    { href: '/terms', label: 'Terms (draft)' },
];
