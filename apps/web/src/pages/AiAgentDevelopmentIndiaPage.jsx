import React from 'react';
import { Network, Layers, Workflow, HeartPulse, Code2, Lock } from 'lucide-react';
import ContentPage, { CardGrid, Faq, Prose } from '@/components/ContentPage';

const SERVICES = [
    { icon: Workflow, title: 'Task agents for operations', desc: 'Agents that take on one repetitive job, such as ticket triage, data entry or report drafting, inside the tools your team already uses.' },
    { icon: Layers, title: 'Assistants grounded in your data', desc: 'Search and answer over your own documents (often called RAG), with sources shown so people can check the answer.' },
    { icon: Network, title: 'Multi-agent workflows', desc: 'Several specialised agents, for example a researcher, a writer and a reviewer, coordinated for longer tasks, with approval gates between steps.' },
    { icon: HeartPulse, title: 'Healthcare workflows', desc: 'Agents that support revenue cycle and intake teams, with a qualified person approving every decision that matters.' },
    { icon: Code2, title: 'Code review and security agents', desc: 'Agents that scan code for common issues, suggest fixes and run tests, with an engineer reviewing every change.' },
    { icon: Lock, title: 'Private deployment', desc: 'When data must not leave your environment, we can run open-source models in a private cloud or on your own servers.' },
];

const FAQ = [
    { q: 'Do you only work with companies in India?', a: 'No. Our team is based in Chennai and works in Indian Standard Time, and we can work remotely with teams in other countries. Tell us your time zone and requirements when you get in touch.' },
    { q: 'Which AI models do you use?', a: 'We choose per task. That can be a commercial model such as GPT-4o, Claude or Gemini, or an open-source model such as Llama or Mistral when data has to stay in your environment.' },
    { q: 'Can the agent work with our existing software?', a: 'Usually, yes, if the software has an API, a database we can safely read, or an automation tool such as n8n, Zapier or Make. We confirm this during scoping.' },
    { q: 'What does a project cost?', a: 'It depends on the workflow, the systems involved and how the agent will run. We share an estimate after the scoping call, before any build work starts.' },
];

const AiAgentDevelopmentIndiaPage = () => (
    <ContentPage
        path="/ai-agent-development-company-india"
        headerSub="AI AGENT DEVELOPMENT"
        hero={{
            id: 'india-top', slot: 'industries', label: 'AI agent development',
            title: 'AI agent development company in India',
            sub: 'Stellar Agents is a Chennai-based team that designs, builds and connects custom AI agents, with guardrails and human review, for teams in India and around the world.',
            cta: 'What we build', href: '#services', secondary: { label: 'Book a free call', href: '/#contact' },
        }}
    >
        <Prose id="intro">
            <p className="eyebrow">Who we are</p>
            <h2>Custom AI agents, built around your workflow</h2>
            <p>
                Stellar Agents is a brand of StellarOne Health Technologies Private Limited, registered in Chennai, Tamil Nadu.
                We build AI agents for businesses that want to hand repetitive work to software without losing control of the result.
            </p>
            <p>
                We do not sell a one-size-fits-all product. Each agent is designed for one workflow, connected to the systems that workflow already uses,
                and given clear limits on what it can do on its own.
            </p>
        </Prose>

        <CardGrid id="services" eyebrow="What we build" title="AI agent development services" items={SERVICES} />

        <Prose id="process">
            <h2>How a project runs</h2>
            <ol>
                <li><strong>Discovery call.</strong> A free 30-minute call to understand the task, the people involved and the systems it touches.</li>
                <li><strong>Scoping.</strong> We agree the goal, how success is measured, the access the agent needs and where people must review its work.</li>
                <li><strong>Build.</strong> We build the agent and connect it to your tools, starting with a small, testable version.</li>
                <li><strong>Test and review.</strong> We run it on real or realistic examples with your team and adjust it based on what you see.</li>
                <li><strong>Go live.</strong> The agent runs with logging, guardrails and human approval steps in place.</li>
                <li><strong>Handover.</strong> You get documentation of what the agent does, how to change it and how to switch it off.</li>
            </ol>

            <h2>What to prepare before the first call</h2>
            <ul>
                <li>One workflow you want help with, and roughly how much time it takes today</li>
                <li>The tools involved, for example email, a CRM, an ERP, spreadsheets or a document store</li>
                <li>A few example inputs and the output you would expect, with personal data removed</li>
                <li>Who on your team would review the agent&apos;s work</li>
            </ul>

            <h2>Working with an India-based team</h2>
            <p>
                For teams in India, we work in your time zone and can meet in person in Chennai. We design with India&apos;s
                Digital Personal Data Protection Act, 2023 in mind, and we can keep data inside your own environment when needed.
                For teams elsewhere, we work remotely and agree overlap hours at the start.
            </p>
            <p>
                New to the topic? Start with our plain-language guide, <a href="/agentic-ai">What is agentic AI?</a>
                In Chennai? See <a href="/agentic-ai-chennai">agentic AI solutions in Chennai</a>.
            </p>
        </Prose>

        <Faq items={FAQ} />
    </ContentPage>
);

export default AiAgentDevelopmentIndiaPage;
