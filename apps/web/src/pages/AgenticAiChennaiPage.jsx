import React from 'react';
import { Inbox, FileText, BarChart3, Search, BookOpen, HeartPulse, MapPin, Mail } from 'lucide-react';
import ContentPage, { CardGrid, Faq, Prose } from '@/components/ContentPage';
import { ADDRESS, EMAIL } from '@/seo/site';

const PROJECTS = [
    { icon: Inbox, title: 'Inbox and ticket triage', desc: 'Sort incoming emails or tickets, pull out the key details and draft replies for a person to approve.' },
    { icon: FileText, title: 'Document data entry', desc: 'Read invoices, claims, purchase orders or forms and enter the fields into your system, flagging anything unclear.' },
    { icon: BarChart3, title: 'Report drafting', desc: 'Pull figures and notes from several sources into a first-draft weekly or monthly report.' },
    { icon: Search, title: 'Lead research', desc: 'Research prospects from public sources, summarise what matters and keep your CRM records tidy.' },
    { icon: BookOpen, title: 'Internal knowledge assistant', desc: 'Answer staff questions from your own policies and manuals, with the source document shown for every answer.' },
    { icon: HeartPulse, title: 'Healthcare billing support', desc: 'Help revenue cycle teams with claim checks and denial follow-up, with staff approving each step.' },
];

const FAQ = [
    { q: 'Can we meet in person?', a: 'Yes. Our office is at WeWork Olympia Cyberspace in Guindy. Please email us first so we can set a time.' },
    { q: 'Do you work only with Chennai businesses?', a: 'No. We work with teams across India and abroad, but Chennai and Tamil Nadu businesses can meet us face to face for workshops and reviews.' },
    { q: 'What happens on the first call?', a: 'We spend about 30 minutes on one workflow: what it involves, which tools it uses and where a person needs to stay in control. There is no charge for this call.' },
];

const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('WeWork Olympia Cyberspace, Guindy, Chennai 600032')}`;

const AgenticAiChennaiPage = () => (
    <ContentPage
        path="/agentic-ai-chennai"
        headerSub="CHENNAI"
        hero={{
            id: 'chennai-top', slot: 'contact', label: 'Chennai, Tamil Nadu',
            title: 'Agentic AI solutions in Chennai',
            sub: 'Meet our team at WeWork Olympia Cyberspace in Guindy to map one workflow and plan a human-in-the-loop AI agent that runs in the tools you already use.',
            cta: 'Typical first projects', href: '#projects', secondary: { label: 'Visit us', href: '#visit' },
        }}
    >
        <Prose id="intro">
            <p className="eyebrow">A local team</p>
            <h2>Agentic AI, planned with you in the room</h2>
            <p>
                Stellar Agents builds AI agents that take on repetitive, rule-based work while your people keep the final say.
                Our team is based in Guindy, Chennai, so local businesses can work with us in person: whiteboard a workflow, review a pilot together,
                and train the people who will supervise the agent.
            </p>
            <p>
                An agent we build is connected to the systems you already use, given only the access its task needs, and set up so a person approves
                anything important. If you are new to the idea, our guide <a href="/agentic-ai">What is agentic AI?</a> explains it in plain words.
            </p>
        </Prose>

        <CardGrid id="projects" eyebrow="Where to start" title="Typical first projects" intro="Good first projects are repetitive, follow clear rules and have an easy way to check the result." items={PROJECTS} />

        <Prose id="how">
            <h2>How we work with Chennai teams</h2>
            <ol>
                <li><strong>Free discovery call or visit.</strong> We pick one workflow together.</li>
                <li><strong>Scoping workshop.</strong> We map the steps, the systems, the access the agent needs and the review points.</li>
                <li><strong>Pilot.</strong> We build a small version and test it with your team on real or realistic examples.</li>
                <li><strong>Go live and hand over.</strong> The agent runs with logs and approvals in place, and your team knows how to change or pause it.</li>
            </ol>
            <p>
                For a broader view of our services, see <a href="/ai-agent-development-company-india">AI agent development in India</a>.
            </p>
        </Prose>

        <section id="visit" aria-labelledby="visit-title" className="border-y border-white/10 bg-[#050505] py-20">
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
                <p className="eyebrow">Visit or write to us</p>
                <h2 id="visit-title" className="section-title mt-3">Our Chennai office</h2>
                <address className="mt-8 not-italic text-[#a3a3a3]">
                    <p className="flex gap-3"><MapPin className="mt-1 h-5 w-5 shrink-0 text-neutral-300" aria-hidden="true" /><span><span className="block font-semibold text-[#e5e5e5]">Stellar Agents</span>{ADDRESS.full}</span></p>
                    <p className="mt-4 flex gap-3"><Mail className="mt-1 h-5 w-5 shrink-0 text-neutral-300" aria-hidden="true" /><a href={`mailto:${EMAIL}`} className="text-neutral-300 underline-offset-4 hover:text-white hover:underline">{EMAIL}</a></p>
                </address>
                <p className="mt-6 text-sm text-[#8a8a8a]">Please email before visiting so we can set a time.</p>
                <a href={MAP_URL} className="scene-btn mt-8" rel="noopener noreferrer" target="_blank">Open in Google Maps</a>
            </div>
        </section>

        <Faq items={FAQ} />
    </ContentPage>
);

export default AgenticAiChennaiPage;
