import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Briefcase, GraduationCap, Award, ShieldCheck, Sparkles,
    ArrowRight, CheckCircle2, DollarSign, Clock, MapPin, Search,
    Send, ChevronRight, User, Mail, FileText, Code2, Cpu, Orbit,
    BookOpen, Layers, Check, X, Building2, Zap, Trophy, HelpCircle
} from 'lucide-react';
import { toast } from 'sonner';
import Seo from '@/components/Seo';
import Scene from '@/components/Scene';
import { HowItWorks, CtaBand } from '@/components/V2Blocks';
import { SiteFooter, SolutionsMenu, Wordmark } from '@/components/SiteChrome';
import { NAV_SOLUTIONS } from '@/seo/site';
import CurrencySelector from '@/components/CurrencySelector';
import { useCurrency } from '@/contexts/CurrencyContext';

const OPEN_POSITIONS_RAW = [
    {
        id: 'agent-architect',
        title: 'Lead Agentic Systems Architect',
        category: 'Engineering',
        type: 'Full-Time',
        location: 'Remote / Chennai, India',
        minSalaryUSD: 160000,
        maxSalaryUSD: 220000,
        equity: '0.5% Equity',
        desc: 'Lead the design of autonomous multi-agent orchestration frameworks, fallback routing, and sub-30ms execution pipelines.',
        reqs: ['5+ yrs in distributed systems or ML engineering', 'Deep expertise in Python, Rust, LangChain, and CrewAI', 'Experience with local model quantization (7B/14B models)', 'AWS / GCP Machine Learning Certification preferred']
    },
    {
        id: 'healthcare-engineer',
        title: 'Healthcare AI Domain Engineer',
        category: 'Healthcare AI',
        type: 'Full-Time',
        location: 'Hybrid / Remote',
        minSalaryUSD: 140000,
        maxSalaryUSD: 190000,
        equity: 'Equity Offered',
        desc: 'Architect HIPAA and ABDM / ABHA compliant clinical triage agents, RCM claim denial resolution, and EHR connectors.',
        reqs: ['3+ yrs working with healthcare data pipelines (HL7, FHIR, ABDM)', 'Solid understanding of HIPAA privacy rules & DPDP Act 2023', 'Proficiency with Claude 3.5 Sonnet & Vision OCR models']
    },
    {
        id: 'fullstack-ai',
        title: 'Full-Stack Generative AI Engineer',
        category: 'Engineering',
        type: 'Full-Time',
        location: 'Remote (Global)',
        minSalaryUSD: 130000,
        maxSalaryUSD: 175000,
        equity: 'Equity Offered',
        desc: 'Build real-time interactive agent dashboards, visual workflow builders, and GraphRAG knowledge interfaces.',
        reqs: ['Expertise in React, TypeScript, Vite, Next.js, and WebSockets', 'Experience interfacing with vector databases (Qdrant, Pinecone)', 'Demonstrated passion for sleek glassmorphic UI aesthetics']
    },
    {
        id: 'growth-lead',
        title: 'Enterprise AI Growth & Solutions Lead',
        category: 'Growth & Product',
        type: 'Full-Time',
        location: 'Remote / Chennai, India',
        minSalaryUSD: 120000,
        maxSalaryUSD: 160000,
        equity: 'Uncapped Commission',
        desc: 'Partner with enterprise CTOs and healthcare leaders to quantify workflow bottlenecks and scope production agent pilots.',
        reqs: ['3+ yrs in technical B2B SaaS sales or AI consulting', 'Ability to conduct technical discovery workshops', 'Strong network across MSMEs, Startups, or Healthcare enterprise']
    }
];

const INTERNSHIPS_RAW = [
    {
        id: 'ai-intern',
        title: 'AI Systems & Agentic Developer Intern',
        type: 'Paid Internship',
        duration: '3 - 6 Months',
        stipendUSD: 3500,
        desc: 'Build real-world agent tools, test synthetic web browsing agents, and contribute to production client workflows.',
        perks: ['1-on-1 mentorship with Lead Architects', 'Paid certification course access included', 'Direct fast-track to full-time engineering offer']
    },
    {
        id: 'healthcare-intern',
        title: 'Healthcare Data Pipeline & ABDM Intern',
        type: 'Paid Internship',
        duration: '3 - 6 Months',
        stipendUSD: 3200,
        desc: 'Work on ABHA health ID integrations, EHR data normalization, and clinical triage agent benchmarks.',
        perks: ['Hands-on HIPAA & ABDM compliance training', 'Co-authorship on Stellar Agents research briefs']
    },
    {
        id: 'devrel-intern',
        title: 'Technical Content & DevRel AI Intern',
        type: 'Paid Internship',
        duration: '3 - 6 Months',
        stipendUSD: 2800,
        desc: 'Create interactive agent tutorials, document API connectors, and engage with the open-source developer community.',
        perks: ['Build a public portfolio of top-ranking technical guides', 'Flexible part-time or full-time schedule']
    }
];

const CERTIFICATION_COHORTS_RAW = [
    {
        id: 'cohort-architect',
        title: 'Full-Stack Agentic AI Architect Certification',
        badge: 'Most Popular',
        duration: '12 Weeks (Live Cohort)',
        priceUSD: 1499,
        stipendUSD: 500,
        summary: 'Master multi-agent orchestration, tool routing, memory design, and production deployment on real client codebases.',
        modules: [
            'Module 1: Multi-Agent Systems & Supervisor-Worker Swarms',
            'Module 2: GraphRAG & Hybrid Knowledge Graph Retrieval',
            'Module 3: Self-Healing Code Agents & Chain-of-Thought Guardrails',
            'Module 4: Real Client Capstone Project (Earn Stipend)'
        ]
    },
    {
        id: 'cohort-graphrag',
        title: 'Enterprise GraphRAG & MLOps Masterclass',
        badge: 'Advanced MLOps',
        duration: '8 Weeks (Live Cohort)',
        priceUSD: 999,
        stipendUSD: 350,
        summary: 'Learn to build zero-hallucination enterprise memory pipelines combining Knowledge Graphs (Neo4j) and Vector DBs (Qdrant).',
        modules: [
            'Module 1: Vector Storage vs. Knowledge Graph Architecture',
            'Module 2: Hybrid Querying & Context Window Optimization',
            'Module 3: LLM Observability, Cost Tracking & Token Metrics',
            'Module 4: Deploying Quantized 7B/14B Models On-Premises'
        ]
    },
    {
        id: 'cohort-healthcare',
        title: 'HIPAA & ABDM Compliant Healthcare AI Engineering',
        badge: 'Industry Specialized',
        duration: '6 Weeks (Live Cohort)',
        priceUSD: 899,
        stipendUSD: 300,
        summary: 'Deep dive into building compliant clinical agents for Revenue Cycle Management (RCM), claim appeals, and ABDM Health ID mapping.',
        modules: [
            'Module 1: HIPAA Security Rule & DPDP Act 2023 Data Controls',
            'Module 2: RCM Claim Denial Resolution & Automated Appeals',
            'Module 3: E-Prescriptions & Clinical Triage Human-in-the-Loop',
            'Module 4: ABHA / ABDM API Integration Protocols'
        ]
    }
];

const COMPLIANCE_CREDENTIALS = [
    { name: 'HIPAA-aligned Practices', tag: 'Healthcare Security', desc: 'We design to HIPAA administrative, physical, and technical safeguards for PHI data.' },
    { name: 'ABDM / ABHA Interoperable', tag: 'Health Registry API', desc: 'Unified health interface integration standards for patient data exchange.' },
    { name: 'DPDP Act 2023 Ready', tag: 'Data Protection', desc: 'Comprehensive data principal consent management and audit logging.' },
    { name: 'Built for SOC 2 Practices', tag: 'Enterprise Trust', desc: 'Security, availability, and confidentiality controls modelled on SOC 2 criteria.' },
    { name: 'OWASP LLM Top 10 Guardrails', tag: 'AI Safety', desc: 'Protection against prompt injection, data poisoning, and unauthorized tool calls.' },
    { name: 'AWS & GCP ML Engineers', tag: 'Cloud Expertise', desc: 'Our engineers build and deploy on AWS and Google Cloud ML services.' }
];

const CareersPage = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { format, current } = useCurrency();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [applyModalOpen, setApplyModalOpen] = useState(false);
    const [selectedRoleTitle, setSelectedRoleTitle] = useState('');
    
    // Form state
    const [candidateName, setCandidateName] = useState('');
    const [candidateEmail, setCandidateEmail] = useState('');
    const [candidatePortfolio, setCandidatePortfolio] = useState('');
    const [candidateNotes, setCandidateNotes] = useState('');

    const handleOpenApply = (title) => {
        setSelectedRoleTitle(title);
        setApplyModalOpen(true);
    };

    const handleSubmitApplication = (e) => {
        e.preventDefault();
        toast.success(`Application submitted for "${selectedRoleTitle}"! We will reach out within 48 hours.`);
        setApplyModalOpen(false);
        setCandidateName('');
        setCandidateEmail('');
        setCandidatePortfolio('');
        setCandidateNotes('');
    };

    const filteredPositions = selectedCategory === 'All'
        ? OPEN_POSITIONS_RAW
        : OPEN_POSITIONS_RAW.filter(p => p.category === selectedCategory);

    return (
        <div className="min-h-screen bg-black text-[#e5e5e5] font-sans">
            <Seo path="/careers" />

            {/* Glowing Navbar */}
            <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
                <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-8">
                    <Wordmark sub="CAREERS & ACADEMY" />

                    <nav className="ml-10 mr-6 hidden items-center gap-6 xl:flex">
                        <a href="/" className="nav-link">Home Platform</a>
                        <a href="#positions" className="nav-link">Startup Roles</a>
                        <a href="#internships" className="nav-link">Paid Internships</a>
                        <a href="#certifications" className="nav-link">Paid Certifications</a>
                        <a href="#credentials" className="nav-link">Industry Standards</a>
                        <SolutionsMenu />
                    </nav>

                    <div className="flex items-center gap-2 sm:gap-4">
                        {/* Currency Selector */}
                        <CurrencySelector />

                        <a
                            href="#positions"
                            className="hidden sm:inline-flex items-center gap-2 whitespace-nowrap rounded-none border-2 border-white px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-white hover:text-black"
                        >
                            <span>View Open Roles</span>
                        </a>
                        <button type="button" className="xl:hidden inline-flex h-11 w-11 items-center justify-center text-white" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen((o) => !o)}>
                            <span className="relative block h-3.5 w-6" aria-hidden="true">
                                <span className={`absolute left-0 top-0 h-0.5 w-6 bg-white transition ${menuOpen ? 'translate-y-[6px] rotate-45' : ''}`} />
                                <span className={`absolute left-0 top-[6px] h-0.5 w-6 bg-white transition ${menuOpen ? 'opacity-0' : ''}`} />
                                <span className={`absolute left-0 top-3 h-0.5 w-6 bg-white transition ${menuOpen ? '-translate-y-[6px] -rotate-45' : ''}`} />
                            </span>
                        </button>
                    </div>
                </div>
                {menuOpen && (
                    <nav id="mobile-menu" className="xl:hidden border-t border-white/10 bg-black px-6 py-6" onClick={() => setMenuOpen(false)}>
                        <ul className="flex flex-col gap-5">
                            <li><a href="/" className="nav-link">Home Platform</a></li>
                            <li><a href="#positions" className="nav-link">Startup Roles</a></li>
                            <li><a href="#internships" className="nav-link">Paid Internships</a></li>
                            <li><a href="#certifications" className="nav-link">Paid Certifications</a></li>
                            <li><a href="#credentials" className="nav-link">Industry Standards</a></li>
                            {NAV_SOLUTIONS.map((l) => <li key={l.href}><a href={l.href} className="nav-link">{l.label}</a></li>)}
                            <li><a href="#positions" className="nav-link">View Open Roles</a></li>
                        </ul>
                    </nav>
                )}
            </header>

            <main>
            {/* Hero Scene */}
            <Scene id="careers-top" slot="careers" as="h1" eager label="Careers at Stellar Agents" title="Build the future of AI agents with Stellar Agents" sub="Whether you are an experienced systems architect looking for full-time startup equity, a developer seeking a paid internship, or an engineer enrolling in our project-based certification cohorts, Stellar Agents is your launching pad." cta="Explore 4 Open Roles" href="#positions" secondary={{ label: "Paid Certification Cohorts", href: "#certifications" }} />

            <section id="positions" className="py-20 max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
                    <div>
                        <span className="eyebrow">FULL-TIME & CONTRACT ROLES</span>
                        <h2 className="mt-2 section-title">
                            Startup Career Opportunities
                        </h2>
                    </div>

                    {/* Filter Category */}
                    <div className="flex items-center gap-2 rounded-xl bg-[#050505] p-1.5 border border-white/10">
                        {['All', 'Engineering', 'Healthcare AI', 'Growth & Product'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${selectedCategory === cat ? 'bg-teal-500/10 text-neutral-300 border border-teal-400/30' : 'text-[#a3a3a3] hover:text-[#e5e5e5]'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {filteredPositions.map((pos) => (
                        <div
                            key={pos.id}
                            className="rounded-2xl cyber-glass border border-white/10 p-6 flex flex-col justify-between hover:border-white/40 transition group"
                        >
                            <div>
                                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                                    <span className="rounded-full bg-teal-500/10 px-3 py-1 text-[11px] font-mono text-neutral-300 border border-teal-500/30">
                                        {pos.category}
                                    </span>
                                    <span className="text-xs font-mono text-[#a3a3a3] flex items-center gap-1">
                                        <MapPin className="h-3.5 w-3.5 text-[#a3a3a3]" /> {pos.location}
                                    </span>
                                </div>

                                <h3 className="font-display text-xl font-bold text-[#e5e5e5] group-hover:text-white transition mb-2">
                                    {pos.title}
                                </h3>
                                <p className="text-xs font-mono text-neutral-300 font-semibold mb-3">
                                    {format(pos.minSalaryUSD, { compact: true })} - {format(pos.maxSalaryUSD, { compact: true })} + {pos.equity}
                                </p>
                                <p className="text-sm text-[#a3a3a3] mb-6 leading-relaxed">
                                    {pos.desc}
                                </p>

                                <div className="border-t border-white/10 pt-4 mb-6">
                                    <p className="text-[11px] font-mono text-[#a3a3a3] uppercase tracking-wider mb-2">KEY REQUIREMENTS:</p>
                                    <ul className="space-y-1.5">
                                        {pos.reqs.map((req, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-xs text-[#a3a3a3]">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-neutral-300 shrink-0 mt-0.5" />
                                                <span>{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <button
                                onClick={() => handleOpenApply(pos.title)}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#050505] border border-white/10 py-3 text-xs font-bold uppercase tracking-wider text-[#e5e5e5] hover:bg-teal-300 hover:text-white hover:border-white/40 transition"
                            >
                                <span>Apply For Position</span>
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Paid Startup Internships */}
            <section id="internships" className="py-20 border-t border-white/10 bg-[#050505]">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="eyebrow">EARN WHILE YOU LEARN</span>
                        <h2 className="mt-2 section-title">
                            Paid Startup Internship Program
                        </h2>
                        <p className="mt-4 text-[#a3a3a3] text-sm sm:text-base">
                            Gain hands-on experience on live client agentic pipelines with dedicated 1-on-1 mentorship and monthly stipends.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        {INTERNSHIPS_RAW.map((intern) => (
                            <div key={intern.id} className="rounded-2xl cyber-glass p-6 border border-white/10 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="rounded-full bg-teal-500/10 px-3 py-1 text-[11px] font-mono text-neutral-300 border border-teal-500/30">
                                            {intern.type}
                                        </span>
                                        <span className="text-xs font-mono text-[#a3a3a3] flex items-center gap-1">
                                            <Clock className="h-3.5 w-3.5 text-[#a3a3a3]" /> {intern.duration}
                                        </span>
                                    </div>

                                    <h3 className="font-display text-lg font-bold text-[#e5e5e5] mb-2">{intern.title}</h3>
                                    <p className="text-xs font-mono text-neutral-300 font-bold mb-4">
                                        {format(intern.stipendUSD)} / Month + Mentorship
                                    </p>
                                    <p className="text-xs text-[#a3a3a3] leading-relaxed mb-6">{intern.desc}</p>

                                    <div className="border-t border-white/10 pt-4 mb-6">
                                        <p className="text-[10px] font-mono text-[#a3a3a3] uppercase tracking-wider mb-2">INTERNSHIP PERKS:</p>
                                        <ul className="space-y-1.5">
                                            {intern.perks.map((perk, idx) => (
                                                <li key={idx} className="flex items-center gap-2 text-xs text-[#a3a3a3]">
                                                    <Sparkles className="h-3.5 w-3.5 text-neutral-300 shrink-0" />
                                                    <span>{perk}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleOpenApply(intern.title)}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-500/10 border border-teal-500/30 py-3 text-xs font-bold uppercase tracking-wider text-neutral-300 hover:bg-teal-300 hover:text-[#e5e5e5] transition"
                                >
                                    <span>Apply for Internship</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Paid Project Certification Courses */}
            <section id="certifications" className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="eyebrow">ACADEMY & CAPSTONE STIPENDS</span>
                    <h2 className="mt-2 section-title">
                        Paid Project Certification Cohorts
                    </h2>
                    <p className="mt-4 text-[#a3a3a3] text-base leading-relaxed">
                        Production-focused certifications taught by senior agent architects. Complete real client capstone projects and earn stipends.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {CERTIFICATION_COHORTS_RAW.map((cohort) => (
                        <div key={cohort.id} className="rounded-2xl cyber-glass p-8 border border-white/10 hover:border-white/40 transition relative flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="rounded-full bg-teal-500/10 px-3 py-1 text-[11px] font-mono text-neutral-300 border border-teal-500/30">
                                        {cohort.badge}
                                    </span>
                                    <span className="text-xs font-mono text-[#a3a3a3]">{cohort.duration}</span>
                                </div>

                                <h3 className="font-display text-xl font-bold text-[#e5e5e5] mb-2">{cohort.title}</h3>
                                <div className="flex items-baseline gap-2 mb-2">
                                    <span className="font-display text-3xl font-extrabold text-[#e5e5e5]">{format(cohort.priceUSD)}</span>
                                    <span className="text-xs text-[#a3a3a3]">/ cohort</span>
                                </div>
                                <p className="text-xs font-mono text-neutral-300 bg-teal-500/10 p-2.5 rounded-lg border border-teal-500/30 mb-4">
                                    💰 Includes {format(cohort.stipendUSD)} Real Client Project Stipend
                                </p>
                                <p className="text-xs text-[#a3a3a3] leading-relaxed mb-6">{cohort.summary}</p>

                                <div className="border-t border-white/10 pt-4 mb-6">
                                    <p className="text-[10px] font-mono text-[#a3a3a3] uppercase tracking-wider mb-2">SYLLABUS HIGHLIGHTS:</p>
                                    <ul className="space-y-2">
                                        {cohort.modules.map((mod, mIdx) => (
                                            <li key={mIdx} className="flex items-start gap-2 text-xs text-[#a3a3a3] leading-tight">
                                                <Check className="h-3.5 w-3.5 text-neutral-300 shrink-0 mt-0.5" />
                                                <span>{mod}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <button
                                onClick={() => handleOpenApply(`Enroll: ${cohort.title}`)}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-400 py-3.5 text-xs font-bold uppercase tracking-wider text-black hover:bg-teal-300 transition"
                            >
                                <span>Apply for Cohort Enrollment</span>
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Technical Specs & Industry Certifications Required */}
            <section id="credentials" className="py-20 border-t border-white/10 bg-[#050505]">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="eyebrow">SECURITY & INDUSTRY STANDARDS</span>
                        <h2 className="mt-2 section-title">
                            Standards We Build Towards
                        </h2>
                        <p className="mt-4 text-[#a3a3a3] text-sm sm:text-base">
                            Our platform architecture and engineering staff operate strictly under enterprise compliance frameworks.
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {COMPLIANCE_CREDENTIALS.map((cred, cIdx) => (
                            <div key={cIdx} className="rounded-2xl border border-white/10 bg-[#050505] p-6 flex items-start gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-neutral-300 border border-teal-500/30 shrink-0">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>
                                <div>
                                    <span className="rounded bg-[#0a0a0a] px-2 py-0.5 text-[10px] font-mono text-neutral-300">{cred.tag}</span>
                                    <h4 className="font-display text-base font-bold text-[#e5e5e5] mt-1">{cred.name}</h4>
                                    <p className="text-xs text-[#a3a3a3] mt-1 leading-relaxed">{cred.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Candidate / Enrollment Application Modal */}
            <AnimatePresence>
                {applyModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050505]">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-lg rounded-2xl cyber-glass border border-white/10 p-6 sm:p-8"
                        >
                            <button
                                onClick={() => setApplyModalOpen(false)}
                                className="absolute top-4 right-4 text-[#a3a3a3] hover:text-[#e5e5e5]"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <h3 className="font-display text-xl font-bold text-[#e5e5e5] mb-1">
                                Application Form
                            </h3>
                            <p className="text-xs font-mono text-neutral-300 mb-6">{selectedRoleTitle}</p>

                            <form onSubmit={handleSubmitApplication} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-mono text-[#a3a3a3] mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={candidateName}
                                        onChange={(e) => setCandidateName(e.target.value)}
                                        placeholder="Jane Doe"
                                        className="w-full rounded-xl border border-white/10 bg-[#050505] px-4 py-2.5 text-sm text-[#e5e5e5] placeholder-[#737373] focus:border-teal-400 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-[#a3a3a3] mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={candidateEmail}
                                        onChange={(e) => setCandidateEmail(e.target.value)}
                                        placeholder="jane@example.com"
                                        className="w-full rounded-xl border border-white/10 bg-[#050505] px-4 py-2.5 text-sm text-[#e5e5e5] placeholder-[#737373] focus:border-teal-400 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-[#a3a3a3] mb-1">GitHub / LinkedIn / Portfolio URL</label>
                                    <input
                                        type="url"
                                        required
                                        value={candidatePortfolio}
                                        onChange={(e) => setCandidatePortfolio(e.target.value)}
                                        placeholder="https://github.com/janedoe"
                                        className="w-full rounded-xl border border-white/10 bg-[#050505] px-4 py-2.5 text-sm text-[#e5e5e5] placeholder-[#737373] focus:border-teal-400 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-[#a3a3a3] mb-1">Brief Note / Experience</label>
                                    <textarea
                                        rows={3}
                                        value={candidateNotes}
                                        onChange={(e) => setCandidateNotes(e.target.value)}
                                        placeholder="Tell us about your background or why you'd like to join..."
                                        className="w-full rounded-xl border border-white/10 bg-[#050505] px-4 py-2.5 text-sm text-[#e5e5e5] placeholder-[#737373] focus:border-teal-400 focus:outline-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full rounded-xl bg-teal-400 py-3 text-xs font-bold uppercase tracking-wider text-black hover:bg-teal-300 transition mt-4"
                                >
                                    Submit Candidate Application
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <CtaBand primaryHref="#positions" primaryLabel="See open roles" title="Build AI agents with us" sub="Roles, paid internships and certification cohorts. Questions? Write to us." />
            </main>

            <SiteFooter label="Stellar Agents Academy & Careers" />
        </div>
    );
};

export default CareersPage;
