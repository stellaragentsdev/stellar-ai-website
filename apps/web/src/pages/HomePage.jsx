import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
    Orbit, Rocket, Cpu, CircuitBoard, Workflow, BookOpen,
    ArrowUpRight, ShieldCheck, Gauge, Sparkles,
    Terminal, Play, CheckCircle2, Zap, Layers, RefreshCw, Activity,
    ArrowRight, Check, ChevronRight, Sliders, Server, Lock, Code2, Copy,
    GraduationCap, Briefcase, Award, Network, Eye, Bot, Wrench, FileCode, CheckSquare, Globe,
    Building2, ShoppingBag, Landmark, Scale, Truck, BookMarked, BarChart3, Radio
} from 'lucide-react';
import { toast } from 'sonner';
import Reveal from '@/components/Reveal';
import CountUp from '@/components/CountUp';
import Seo from '@/components/Seo';
import Scene from '@/components/Scene';
import { HowItWorks, CtaBand } from '@/components/V2Blocks';
import { ContactCard, FooterCompany } from '@/components/CompanyContact';
import ContactForm from '@/components/ContactForm';
import CurrencySelector from '@/components/CurrencySelector';
import { useCurrency } from '@/contexts/CurrencyContext';

import gpt4oLogo from '../assets/brands/gpt4o.svg';
import claudeLogo from '../assets/brands/claude.svg';
import geminiLogo from '../assets/brands/gemini.svg';
import llamaLogo from '../assets/brands/llama.svg';
import mistralLogo from '../assets/brands/mistral.svg';
import n8nLogo from '../assets/brands/n8n.svg';
import zapierLogo from '../assets/brands/zapier.svg';
import makeLogo from '../assets/brands/make.svg';
import langchainLogo from '../assets/brands/langchain.svg';
import crewaiLogo from '../assets/brands/crewai.svg';
import midjourneyLogo from '../assets/brands/midjourney.svg';
import runwayLogo from '../assets/brands/runway.svg';

const HERO_IMG = 'https://images.hostinger.com/33c9faca-ec5f-454f-bca0-1fedf56573f6.png';

const INDUSTRY_SHOWCASES = {
    healthcare: {
        id: 'healthcare',
        icon: Orbit,
        sector: 'Healthcare & Clinical',
        badge: 'HIPAA & ABDM-aligned',
        headline: 'Revenue Cycle Management (RCM) & Clinical Triage Agents',
        problem: 'Hospitals lose 12-15% of revenue due to claim denials, manual code audits, and slow E-Prescription data entry.',
        solution: 'Autonomous RCM agents audit rejected claims against CMS guidelines, generate formal medical necessity appeal packages, and map ABHA health IDs straight-through.',
        impactUSD: 450000,
        impactMetric: 'Illustrative: potential yearly recovered claims for a 100-bed hospital',
        inputSample: `POST /api/rcm/audit
Claim: CLM-90812 | Code: 99214 | Denial Reason: CO-50 (Non-covered)
Patient ABHA: 91-8810-4910-1200`,
        outputSample: `✅ APPEAL GENERATED & FILED VIA API
Insurer: BlueCross Health | Status: Claim Reopened
Recovery Amount: $4,850.00 | Medical Necessity Attached.`
    },
    fintech: {
        id: 'fintech',
        icon: Landmark,
        sector: 'FinTech & BFSI',
        badge: 'SOC 2 & DPDP-aligned',
        headline: 'Automated KYC/AML Underwriting & Fraud Triage',
        problem: 'Manual compliance review of loan documents, passport scans, and AML watchlist screening takes 48-72 hours per applicant.',
        solution: 'Agentic document pipelines extract identity fields, cross-check OFAC/PEP watchlists in real-time, and flag suspicious transactions in real time.',
        impactUSD: 680000,
        impactMetric: 'Illustrative: potential reduction in compliance review costs',
        inputSample: `EVENT: LoanApplicationSubmitted
Applicant: Apex Capital LLC | Tax ID: 84-99182
Document: Passport_Scan_v2.pdf`,
        outputSample: `🛡️ AML CHECK PASSED | RISK SCORE: 0.02
Watchlist: Cleared (OFAC, Interpol, PEP)
Income Verification: $240,000 Verified via Bank API.`
    },
    ecommerce: {
        id: 'ecommerce',
        icon: ShoppingBag,
        sector: 'E-Commerce & Retail',
        badge: 'Omnichannel Agents',
        headline: 'WhatsApp & Email Customer Support Agents',
        problem: 'Customer support teams are overwhelmed during peak sales events with repetitive order tracking and refund queries.',
        solution: 'AI agent teams triage incoming WhatsApp and email messages, verify Shopify order statuses, process automated refunds under threshold, and update Zendesk CRM.',
        impactUSD: 320000,
        impactMetric: 'Illustrative: potential savings in support labour',
        inputSample: `WHATSAPP INCOMING: +1 (415) 882-9012
"Where is my order #ST-9912? I need a refund if it hasn't shipped!"`,
        outputSample: `💬 AUTO-RESOLVED & NOTIFIED
"Hi Sarah! Order #ST-9912 shipped via FedEx (Tracking #991024). Estimated delivery: Today 3 PM."`
    },
    legal: {
        id: 'legal',
        icon: Scale,
        sector: 'Legal & Real Estate',
        badge: 'DPDP 2023 Redliner',
        headline: 'Contract Redlining & Regulatory Compliance Auditor',
        problem: 'Reviewing 50-page Master Services Agreements and lease deeds for DPDP Act 2023 and indemnity risks takes hours of legal counsel time.',
        solution: 'Legal agents extract clauses, highlight liability caps exceeding policy limits, redline non-compliant data retention terms, and export DOCX summaries.',
        impactUSD: 510000,
        impactMetric: 'Illustrative: potential yearly reduction in outside legal review fees',
        inputSample: `DOCUMENT: Master_Services_Agreement_2026.docx
Check: DPDP Act 2023 Section 8 & Indemnity Clause 12.1`,
        outputSample: `⚖️ REDLINE COMPLETE: 2 CLAUSES MODIFIED
Clause 8.2: Data Retention capped at 180 days (DPDP compliant).
Clause 12.1: Liability capped at 2x annual contract value.`
    },
    logistics: {
        id: 'logistics',
        icon: Truck,
        sector: 'Logistics & Supply Chain',
        badge: 'Customs & ERP STP',
        headline: 'Customs Documentation & PO Cross-Referencing',
        problem: 'Mismatched line items between bills of lading, commercial invoices, and ERP purchase orders cause port delays and storage fines.',
        solution: 'Vision OCR agents parse multi-lingual shipping manifests, cross-reference line items against SAP / Oracle ERP, and auto-correct customs tariff codes.',
        impactUSD: 420000,
        impactMetric: 'Illustrative: potential yearly savings in demurrage & port penalties',
        inputSample: `MANIFEST PARSED: BOL_Shipment_9901.pdf
Items: 400 Units Microcontrollers (HS Code 8542.31)`,
        outputSample: `📦 ERP MATCH CONFIRMED (PO #PO-8812)
Customs Tariff: Standardized to 8542.31.00
Status: Cleared for automated warehouse intake.`
    },
    edtech: {
        id: 'edtech',
        icon: BookMarked,
        sector: 'EdTech & Research',
        badge: 'Academic Copilot',
        headline: 'Research Synthesis & Study Copilot Agents',
        problem: 'Researchers and students struggle to synthesize hundreds of academic papers into structured literature reviews and course briefs.',
        solution: 'Agentic paper summarizers query arXiv and PubMed, extract methodology parameters, synthesize comparative tables, and draft publication briefs.',
        impactUSD: 190000,
        impactMetric: 'Illustrative: potential value of hours saved per research department',
        inputSample: `QUERY: "Synthesize 10 recent papers on LLM Quantization techniques for edge devices."`,
        outputSample: `📚 LITERATURE BRIEF GENERATED
Top Method: AWQ vs. GPTQ 4-bit Quantization
Comparative Table: Memory footprint, perplexity scores, & vLLM benchmark links.`
    }
};

const SERVICES_2026 = [
    {
        id: 'swarms',
        icon: Network,
        title: 'Multi-Agent Teams (Agentic Workflows)',
        badge: 'Supervisor-Worker Pattern',
        summary:
            'Deploy coordinated teams of specialized agents (Researcher, Writer, Reviewer, Security Gate) operating under a supervisor controller to solve complex tasks.',
        points: ['Autonomous task decomposition & parallel sub-agent dispatch', 'Self-correcting feedback loops with human approval gates', 'State synchronization across distributed worker nodes'],
        codeSnippet: `const crew = new HierarchicalCrew({
  supervisor: new ManagerAgent({ model: "gpt-4o" }),
  workers: [
    new ResearchAgent(),
    new PythonCodeAgent(),
    new SecurityAuditAgent()
  ],
  process: Process.sequential
});
await crew.kickoff({ task: "Audit smart contract security" });`
    },
    {
        id: 'graphrag',
        icon: Layers,
        title: 'RAG Over Your Data (GraphRAG)',
        badge: 'Grounded, Cited Answers',
        summary:
            'Combine Knowledge Graphs (entity relationships) with Vector Search (semantic similarity) so answers stay grounded in your own documents.',
        points: ['Knowledge Graph entity extraction & relationship mapping', 'Hybrid dense + sparse vector index matching (Qdrant + Neo4j)', 'Dynamic context window pruning to reduce LLM token overhead'],
        codeSnippet: `const graphRAG = new HybridMemorySystem({
  graphDB: new Neo4jClient({ uri: process.env.NEO4J_URI }),
  vectorDB: new QdrantClient({ collection: "enterprise_docs" }),
  hybridAlpha: 0.75 // 75% graph, 25% vector
});`
    },
    {
        id: 'healthcare',
        icon: Orbit,
        title: 'Healthcare AI & Clinical RCM Automation',
        badge: 'HIPAA & ABDM-aligned',
        summary:
            'Agent suites for Revenue Cycle Management (RCM), claim denial resolution, clinical triage automation, and EHR integrations.',
        points: ['RCM claim denial analysis & automated appeal generation', 'E-Prescription & triage workflows with doctor review gates', 'ABHA / ABDM health ID data pipeline integration'],
        codeSnippet: `const rcmAgent = new HealthcareRCMAgent({
  compliance: ["HIPAA", "ABDM_DPDP"],
  rulesEngine: "CMS-2026-Guidelines",
  tools: [EHRConnector, ClaimsEngine, AppealGenerator]
});`
    },
    {
        id: 'selfhealing',
        icon: Wrench,
        title: 'AI Code Review & Security Agent',
        badge: 'OWASP LLM Guardrails',
        summary:
            'Autonomous agents that scan repositories, detect syntax/security vulnerabilities, generate fixes, run test suites, and open PRs.',
        points: ['Automated AST analysis & OWASP Top 10 for LLMs vulnerability scans', 'Self-correcting code generation with automated test execution', 'Zero-breakage refactoring & dependency upgrade pipelines'],
        codeSnippet: `const auditor = new DevSecOpsAgent();
const audit = await auditor.scanRepo("./src");
if (audit.vulnerabilities.length > 0) {
  await auditor.autoRepairAndTest({ branch: "security-fix" });
}`
    },
    {
        id: 'growth',
        icon: Rocket,
        title: 'Growth & Revenue Automation',
        badge: 'Growth Copilots',
        summary:
            'AI copilots for founders and growth teams — grant and pitch generation, lead enrichment, and sales pipeline execution.',
        points: ['Pitch deck & grant proposal generation', 'Multi-channel lead enrichment & scoring', 'Automated personalized sales outreach'],
        codeSnippet: `const growthAgent = new GrowthEngine({
  role: "Chief Growth Officer",
  capabilities: ["prospecting", "pitch_decks", "crm_sync"]
});`
    },
    {
        id: 'onprem',
        icon: Lock,
        title: 'Private AI Models (On-Prem or Private Cloud)',
        badge: 'Your Data Stays With You',
        summary:
            'Deploy fine-tuned 7B and 14B quantized models (DeepSeek-R1, Llama 3) inside private VPCs or on-prem servers so your data never leaves your environment.',
        points: ['Private vLLM & Ollama inference server deployment', 'Domain-specific dataset distillation & LoRA fine-tuning', 'Isolated data boundaries aligned with DPDP and SOC 2 practices'],
        codeSnippet: `const localInference = new PrivateVLLMServer({
  model: "deepseek-r1-distill-llama-8b-q4",
  maxGPUVideoRAM: "16GB",
  dataIsolation: "strict_airgap"
});`
    }
];

const STACK_ITEMS = [
    { name: 'GPT-4o', tag: 'Reasoning + Multimodal', logo: gpt4oLogo },
    { name: 'Claude 3.5', tag: 'Long-Context Analysis', logo: claudeLogo },
    { name: 'Gemini 1.5', tag: 'Google Ecosystem AI', logo: geminiLogo },
    { name: 'Llama 3', tag: 'Open-Source Privacy', logo: llamaLogo },
    { name: 'Mistral', tag: 'Ultra-Fast Inference', logo: mistralLogo },
    { name: 'n8n', tag: 'Workflow Automation', logo: n8nLogo },
    { name: 'Zapier', tag: 'Cloud Integrations', logo: zapierLogo },
    { name: 'Make', tag: 'Visual Orchestration', logo: makeLogo },
    { name: 'LangChain', tag: 'Agent Framework', logo: langchainLogo },
    { name: 'CrewAI', tag: 'Multi-Agent Teams', logo: crewaiLogo },
    { name: 'Midjourney', tag: 'Visual Generation', logo: midjourneyLogo },
    { name: 'Runway', tag: 'AI Video Production', logo: runwayLogo },
];

const OUTCOMES = [
    { icon: Gauge, value: 62, suffix: '%', label: 'Average reduction in manual handling time across automated processes' },
    { icon: ShieldCheck, value: 99.4, suffix: '%', label: 'Straight-through processing accuracy with review gates' },
    { icon: Sparkles, value: 3, suffix: ' wks', label: 'Speed from discovery workshop to first live production agent' },
    { icon: Zap, value: 10, suffix: 'x', label: 'Throughput increase for claims, support, and document workflows' }
];

const CERTIFICATION_COHORTS_PREVIEW = [
    {
        title: 'Full-Stack Agentic AI Architect',
        duration: '12 Weeks (Live Cohort)',
        priceUSD: 1499,
        stipendUSD: 500,
        desc: 'Master multi-agent orchestration, tool routing, memory design, and production deployment on real client codebases.'
    },
    {
        title: 'Enterprise GraphRAG & MLOps',
        duration: '8 Weeks (Live Cohort)',
        priceUSD: 999,
        stipendUSD: 350,
        desc: 'Learn to build zero-hallucination enterprise memory pipelines combining Knowledge Graphs (Neo4j) and Vector DBs.'
    },
    {
        title: 'HIPAA & ABDM Healthcare AI',
        duration: '6 Weeks (Live Cohort)',
        priceUSD: 899,
        stipendUSD: 300,
        desc: 'Deep dive into building compliant clinical agents for RCM claim denial resolution and ABDM Health ID mapping.'
    }
];

const DEMO_PRESETS = {
    rcm: {
        id: 'rcm',
        name: 'Healthcare RCM Agent',
        prompt: 'Audit claim #CLM-94021 rejected under code CO-50 (non-covered service) and draft formal appeal.',
        logs: [
            '[0.01s] Ingesting claim payload CLM-94021...',
            '[0.12s] Context retrieved: Policy #HC-882, Patient ABHA #91-8821-4921...',
            '[0.34s] Agent Rule Evaluation: Procedure Code 99214 meets emergency criteria under Section 4-B.',
            '[0.68s] Generating CMS-compliant formal appeal letter with medical necessity citations...',
            '[0.95s] Verification complete. Appeal package dispatched to insurer portal API.'
        ],
        output: `✅ APPEAL GENERATED & SENT
Claim ID: CLM-94021 | Status: Auto-Submitted
Reason: Medical necessity established via clinical EHR attachment.
Estimated Recovery: $4,850.00`
    },
    growth: {
        id: 'growth',
        name: 'Growth Co-Founder',
        prompt: 'Research top 5 prospective B2B healthtech leads in San Francisco and draft personalized emails.',
        logs: [
            '[0.05s] Scanning Crunchbase & LinkedIn API for Series-A HealthTech startups...',
            '[0.21s] Found 5 matches matching ICP (Revenue > $2M, Team > 15)...',
            '[0.45s] Extracting VP Operations contact info & verifying SMTP delivery...',
            '[0.82s] Crafting hyper-personalized value props based on recent press releases...'
        ],
        output: `🚀 5 LEADS ENRICHED & OUTREACH QUEUED
1. Apex Health (VP Ops) - "Loved your launch on ABDM interoperability..."
2. CareFlow Inc (COO) - "Automating claims processing with 99.4% accuracy..."
Outreach scheduled for Tuesday 09:00 AM PST.`
    },
    doc: {
        id: 'doc',
        name: 'Doc Intelligence',
        prompt: 'Extract line items, tax IDs, and total due from scanned invoice PDF.',
        logs: [
            '[0.03s] Loading document: invoice_aug_2026_vendor_99.pdf (3 pages)...',
            '[0.18s] Executing Vision OCR & Layout parser...',
            '[0.42s] Standardizing vendor Tax ID & line-item table struct...',
            '[0.77s] Cross-checking purchase order PO-1102 in ERP database...'
        ],
        output: `📄 EXTRACTED INVOICE DATA
Vendor: Nova Tech Solutions (EIN: 84-2918471)
Total Amount: $14,250.00 | Tax: $1,140.00
Status: Matches PO-1102. Approved for accounts payable execution.`
    },
    code: {
        id: 'code',
        name: 'Self-Healing Code Agent',
        prompt: 'Scan auth service repository for OWASP vulnerabilities and auto-fix SQL injection flaw.',
        logs: [
            '[0.02s] Parsing AST for /src/services/auth.ts...',
            '[0.15s] Vulnerability Detected: Raw SQL string concatenation at L42.',
            '[0.38s] Generating parameterized query patch using Prisma ORM...',
            '[0.72s] Running test suite: 14/14 tests PASSED. Creating GitHub PR #104.'
        ],
        output: `🛡️ SECURITY VULNERABILITY REPAIRED
File: /src/services/auth.ts (Line 42)
Type: CWE-89 (SQL Injection) -> Fixed via Parameterized Prepared Statement.
PR Link: https://github.com/stellar/auth-service/pull/104 [Merged]`
    },
    legal: {
        id: 'legal',
        name: 'Contract Compliance Agent',
        prompt: 'Audit vendor Master Services Agreement for DPDP Act 2023 compliance and indemnity risk.',
        logs: [
            '[0.04s] Reading contract payload: MSA_Vendor_2026.pdf (18 pages)...',
            '[0.22s] Identifying Clause 8.2: Data Retention period exceeds DPDP statutory limit.',
            '[0.51s] Redlining Clause 12.1 (Indemnity) to cap liability at 2x annual contract value...',
            '[0.89s] Exporting redlined DOCX with legal counsel summary notes.'
        ],
        output: `⚖️ CONTRACT AUDIT COMPLETE
Status: 2 High Risk Clauses Flagged
1. Clause 8.2: Data Retention updated to comply with DPDP Act 2023.
2. Clause 12.1: Liability capped at $250,000. Redlined document ready for review.`
    },
    support: {
        id: 'support',
        name: 'Omnichannel Customer Swarm',
        prompt: 'Handle customer WhatsApp request regarding refund status and update CRM ticket.',
        logs: [
            '[0.01s] Incoming WhatsApp event: User +1 (415) 882-9012...',
            '[0.14s] Querying Shopify Order DB: Order #ST-8810 shipped 2 days ago...',
            '[0.35s] Generating conversational WhatsApp response with real-time tracking link...',
            '[0.68s] Syncing ticket status in Zendesk API to "Resolved".'
        ],
        output: `💬 WHATSAPP RESPONSE DISPATCHED
Message: "Hi Sarah! Your order #ST-8810 is out for delivery today via FedEx (Tracking #991024). Let us know if you need anything else!"
Zendesk Ticket #9912 updated -> Resolved.`
    }
};

const HomePage = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { format, current } = useCurrency();
    const [activeDemo, setActiveDemo] = useState('rcm');
    const [demoInput, setDemoInput] = useState(DEMO_PRESETS.rcm.prompt);
    const [isExecuting, setIsExecuting] = useState(false);
    const [activeLogs, setActiveLogs] = useState(DEMO_PRESETS.rcm.logs);
    const [activeOutput, setActiveOutput] = useState(DEMO_PRESETS.rcm.output);
    const [activeService, setActiveService] = useState(SERVICES_2026[0]);
    const [activeIndustryKey, setActiveIndustryKey] = useState('healthcare');
    
    // ROI Calculator State
    const [manualHours, setManualHours] = useState(120);
    const [hourlyCostUSD, setHourlyCostUSD] = useState(45);

    const activeIndustry = INDUSTRY_SHOWCASES[activeIndustryKey];

    const handleSelectDemo = (key) => {
        setActiveDemo(key);
        setDemoInput(DEMO_PRESETS[key].prompt);
        setActiveLogs(DEMO_PRESETS[key].logs);
        setActiveOutput(DEMO_PRESETS[key].output);
    };

    const handleRunDemo = () => {
        setIsExecuting(true);
        setActiveLogs(['[0.01s] Initializing execution session...']);
        setActiveOutput('⏳ Agent reasoning in progress...');

        setTimeout(() => {
            setActiveLogs(DEMO_PRESETS[activeDemo].logs);
            setActiveOutput(DEMO_PRESETS[activeDemo].output);
            setIsExecuting(false);
            toast.success('Agent execution completed successfully!');
        }, 1100);
    };

    const copyCode = (code) => {
        navigator.clipboard.writeText(code);
        toast.success('Code snippet copied to clipboard!');
    };

    const monthlySavingsUSD = Math.round(manualHours * hourlyCostUSD * 0.65);
    const hoursSavedYearly = Math.round(manualHours * 12 * 0.65);

    return (
        <div className="min-h-screen bg-black text-[#e5e5e5] font-sans">
            <Helmet>
                <title>Stellar AI | AI Agents & Copilots for Business</title>
                <meta
                    name="description"
                    content="LLM-powered AI agents and copilots for healthcare, finance, retail, legal, logistics and education. RAG over your data, human-in-the-loop, live in days."
                />
            </Helmet>

            <Seo
                title="Stellar AI — AI Agents & Copilots for Business"
                description="LLM-powered AI agents and copilots with guardrails and human review."
                image={HERO_IMG}
                siteName="Stellar AI"
                path="/"
            />

            {/* Glowing Reordered Navbar */}
            <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
                <div className="mx-auto flex h-18 max-w-7xl items-center justify-end gap-2 px-4 sm:px-6 lg:px-8">

                    {/* Reasonably Reordered Header Tabs */}
                    <nav className="ml-10 mr-6 hidden items-center gap-6 xl:flex">
                        <a href="#demo" className="nav-link">Demos</a>
                        <a href="#capabilities" className="nav-link">What we build</a>
                        <a href="#industries" className="nav-link">Industries</a>
                        <a href="#calculator" className="nav-link">ROI calculator</a>
                        <a href="#certifications" className="nav-link">Certifications</a>
                        <a href="/careers" className="nav-link flex items-center gap-1">
                            <Briefcase className="h-3.5 w-3.5" /> Careers & Internships
                        </a>
                    </nav>

                    <div className="flex items-center gap-2 sm:gap-4">
                        <CurrencySelector />
                        <button type="button" className="xl:hidden inline-flex h-11 w-11 items-center justify-center text-white" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen((o) => !o)}>
                            <span className="relative block h-3.5 w-6" aria-hidden="true">
                                <span className={`absolute left-0 top-0 h-0.5 w-6 bg-white transition ${menuOpen ? 'translate-y-[6px] rotate-45' : ''}`} />
                                <span className={`absolute left-0 top-[6px] h-0.5 w-6 bg-white transition ${menuOpen ? 'opacity-0' : ''}`} />
                                <span className={`absolute left-0 top-3 h-0.5 w-6 bg-white transition ${menuOpen ? '-translate-y-[6px] -rotate-45' : ''}`} />
                            </span>
                        </button>
                        <a
                            href="#contact"
                            className="relative inline-flex items-center gap-2 hidden sm:inline-flex overflow-hidden whitespace-nowrap rounded-none border-2 border-white px-3 py-2 uppercase tracking-widest text-xs sm:px-4 font-medium text-white transition-all hover:bg-white hover:text-black"
                        >
                            <Zap className="hidden h-3.5 w-3.5 sm:block" />
                            <span>Book a free call</span>
                        </a>
                    </div>
                </div>
                {menuOpen && (
                    <nav id="mobile-menu" className="xl:hidden border-t border-white/10 bg-black px-6 py-6" onClick={() => setMenuOpen(false)}>
                        <ul className="flex flex-col gap-5">
                            <li><a href="#demo" className="nav-link">Demos</a></li>
                            <li><a href="#capabilities" className="nav-link">What we build</a></li>
                            <li><a href="#industries" className="nav-link">Industries</a></li>
                            <li><a href="#calculator" className="nav-link">ROI calculator</a></li>
                            <li><a href="#certifications" className="nav-link">Certifications</a></li>
                            <li><a href="/careers" className="nav-link">Careers & Internships</a></li>
                            <li><a href="#contact" className="nav-link">Book a free call</a></li>
                        </ul>
                    </nav>
                )}
            </header>

            {/* Hero Section */}
            <Scene id="top" slot="hero" as="h1" eager title="AI agents that do the busywork. You keep control." sub="Human-in-the-loop agents and copilots. Live in days, not months." cta="Try 6 live agent demos" href="#demo" />

            <section id="sandbox" className="relative overflow-hidden py-20 lg:py-28 bg-black">
                <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-teal-500/10 opacity-60 hidden" />

                <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">

                    {/* Interactive Hero Agent Playground Window (6 Scenarios) */}
                    <section id="demo" className="mt-16 sm:mt-20">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="relative mx-auto max-w-5xl rounded-2xl cyber-glass border border-white/10 p-4 sm:p-6 text-left"
                        >
                            {/* Window Header */}
                            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-red-500/10" />
                                    <div className="h-3 w-3 rounded-full bg-yellow-50" />
                                    <div className="h-3 w-3 rounded-full bg-green-50" />
                                    <span className="ml-2 font-mono text-xs text-[#a3a3a3] flex items-center gap-1.5">
                                        <Terminal className="h-3.5 w-3.5 text-neutral-300" />
                                        stellar-agent-sandbox-control.v2
                                    </span>
                                </div>

                                <span className="text-[11px] font-mono text-neutral-300 bg-teal-500/10 px-2.5 py-1 rounded border border-teal-500/30">
                                    6 Live Agent Presets Available
                                </span>
                            </div>

                            {/* 6 Scenario Selector Tabs */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
                                {Object.values(DEMO_PRESETS).map((preset) => (
                                    <button
                                        key={preset.id}
                                        onClick={() => handleSelectDemo(preset.id)}
                                        className={`rounded-lg px-2.5 py-2 text-xs font-mono font-medium transition text-center truncate ${activeDemo === preset.id ? 'bg-teal-500/10 text-neutral-300 border border-teal-400/30' : 'bg-[#050505] text-[#a3a3a3] hover:text-[#e5e5e5] border border-white/10'}`}
                                    >
                                        {preset.name}
                                    </button>
                                ))}
                            </div>

                            {/* Prompt Input Line */}
                            <div className="mb-4 flex gap-3">
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        value={demoInput}
                                        onChange={(e) => setDemoInput(e.target.value)}
                                        className="w-full rounded-xl border border-white/10 bg-[#050505] px-4 py-3 font-mono text-xs sm:text-sm text-neutral-300 placeholder-[#737373] focus:border-teal-400 focus:outline-none"
                                        placeholder="Type an agent instruction..."
                                    />
                                </div>
                                <button
                                    onClick={handleRunDemo}
                                    disabled={isExecuting}
                                    className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-bold text-black transition hover:bg-neutral-200 disabled:opacity-50"
                                >
                                    {isExecuting ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4 fill-current" />}
                                    <span>Execute</span>
                                </button>
                            </div>

                            {/* Execution Grid: Logs & Output */}
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="rounded-xl border border-white/10 bg-[#050505] p-4 font-mono text-xs">
                                    <div className="flex items-center justify-between text-[#a3a3a3] mb-2 border-b border-white/10 pb-2">
                                        <span className="flex items-center gap-1.5 text-neutral-300 font-semibold">
                                            <Activity className="h-3.5 w-3.5" /> Reasoning Node Trace
                                        </span>
                                        <span className="text-[10px] text-[#a3a3a3]">Latency: 24ms</span>
                                    </div>
                                    <div className="space-y-1.5 text-[#a3a3a3] max-h-44 overflow-y-auto">
                                        {activeLogs.map((log, idx) => (
                                            <p key={idx} className="leading-relaxed">
                                                <span className="text-neutral-300">&gt;</span> {log}
                                            </p>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-xl border border-teal-500/30 bg-teal-500/10 p-4 font-mono text-xs">
                                    <div className="flex items-center justify-between text-neutral-300 mb-2 border-b border-teal-500/30 pb-2">
                                        <span className="flex items-center gap-1.5 font-semibold">
                                            <CheckCircle2 className="h-3.5 w-3.5 text-neutral-300" /> Output Payload
                                        </span>
                                        <span className="rounded bg-teal-500/10 px-1.5 py-0.5 text-[10px] text-neutral-300">STP Verified</span>
                                    </div>
                                    <pre className="text-[#e5e5e5] whitespace-pre-wrap leading-relaxed">
                                        {activeOutput}
                                    </pre>
                                </div>
                            </div>
                        </motion.div>
                    </section>
                </div>
            </section>

            {/* Animated SVG Workflow Node Particles Graph */}
            <Scene id="scene-how" slot="how" label="How it works" title="Tell us the task. We build the agent." sub="You approve, it runs, inside the tools you already use." cta="See the 3 steps" href="#how-it-works" />

            <HowItWorks />

            <section className="py-16 border-y border-white/10 bg-[#050505] relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <span className="eyebrow mb-2 block">HOW AN AGENT HANDLES A TASK</span>
                    <h3 className="font-display text-2xl font-bold text-[#e5e5e5] mb-8">From trigger to verified result</h3>

                    {/* SVG Flow Connections */}
                    <div className="relative mx-auto max-w-4xl rounded-2xl cyber-glass border border-white/10 p-8 overflow-hidden">
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M 120 70 Q 250 20 400 70 T 700 70" stroke="rgba(45, 212, 191, 0.35)" strokeWidth="2" fill="none" className="animate-dash-flow" />
                            <path d="M 120 70 Q 250 120 400 70 T 700 70" stroke="rgba(45, 212, 191, 0.2)" strokeWidth="2" fill="none" className="animate-dash-flow" />
                        </svg>

                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 relative z-10">
                            <div className="rounded-xl border border-white/10 bg-[#050505] p-4 text-center">
                                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-neutral-300 border border-teal-500/30 mb-2">
                                    <Radio className="h-5 w-5 animate-pulse" />
                                </div>
                                <h4 className="font-mono text-xs font-bold text-[#e5e5e5]">1. Event Trigger</h4>
                                <p className="text-[10px] text-[#a3a3a3] mt-1">Email, form, API or document</p>
                            </div>

                            <div className="rounded-xl border border-white/10 bg-[#050505] p-4 text-center">
                                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-neutral-300 border border-teal-500/30 mb-2">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>
                                <h4 className="font-mono text-xs font-bold text-[#e5e5e5]">2. Security Gate</h4>
                                <p className="text-[10px] text-[#a3a3a3] mt-1">Personal data masked, guardrails on</p>
                            </div>

                            <div className="rounded-xl border border-white/10 bg-[#050505] p-4 text-center">
                                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-neutral-300 border border-teal-500/30 mb-2">
                                    <Bot className="h-5 w-5" />
                                </div>
                                <h4 className="font-mono text-xs font-bold text-[#e5e5e5]">3. Agent Team</h4>
                                <p className="text-[10px] text-[#a3a3a3] mt-1">Best-fit LLM for each step</p>
                            </div>

                            <div className="rounded-xl border border-white/10 bg-[#050505] p-4 text-center">
                                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600 border border-green-200 mb-2">
                                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                                </div>
                                <h4 className="font-mono text-xs font-bold text-[#e5e5e5]">4. Verified Writeback</h4>
                                <p className="text-[10px] text-[#a3a3a3] mt-1">Written back to your CRM, ERP or EHR</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Model Marquee */}
            <section className="border-y border-white/10 bg-[#050505] py-8 overflow-hidden">
                <div className="mx-auto max-w-7xl px-6 mb-4 text-center">
                    <p className="text-xs font-mono tracking-widest text-[#a3a3a3] uppercase">WORKS WITH LEADING AI MODELS & TOOLS</p>
                </div>

                <div className="flex w-max animate-marquee gap-8">
                    {[...STACK_ITEMS, ...STACK_ITEMS].map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#050505] px-5 py-3 hover:border-white/40 transition"
                        >
                            <img src={item.logo} alt={item.name} className="h-6 w-6 object-contain" />
                            <div>
                                <h4 className="text-xs font-semibold text-[#e5e5e5]">{item.name}</h4>
                                <p className="text-[10px] text-[#a3a3a3] font-mono">{item.tag}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 2026 Up-To-Date Capabilities Grid with 3D Tilt Hover */}
            <Scene id="scene-build" slot="build" label="What we build" title="AI agents for real work" sub="Agent teams, RAG over your own data, code-review agents and healthcare workflows." cta="Explore what we build" href="#capabilities" />

            <section id="capabilities" className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
                <Reveal>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="eyebrow">WHAT WE BUILD</span>
                        <p className="mt-4 text-[#a3a3a3] text-base sm:text-lg">
                            Agent teams, RAG over your own data, code-review agents and healthcare workflows, each with guardrails and human review built in.
                        </p>
                    </div>
                </Reveal>

                <div className="grid gap-8 lg:grid-cols-3 perspective-1000">
                    {SERVICES_2026.map((service, idx) => {
                        const Icon = service.icon;
                        const isSelected = activeService.id === service.id;
                        return (
                            <Reveal key={service.id} delay={idx * 0.1}>
                                <div
                                    onClick={() => setActiveService(service)}
                                    className={`group cursor-pointer rounded-2xl cyber-glass p-8 transition-all duration-300 relative card-3d-tilt ${isSelected ? 'border-teal-500/30' : 'border-white/10 hover:border-white/10'}`}
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 text-neutral-300 border border-teal-500/30">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <span className="rounded-full bg-[#0a0a0a] px-3 py-1 text-[11px] font-mono text-neutral-300 border border-white/10">
                                            {service.badge}
                                        </span>
                                    </div>

                                    <h3 className="font-display text-xl font-bold text-[#e5e5e5] group-hover:text-white transition">
                                        {service.title}
                                    </h3>
                                    <p className="mt-3 text-sm text-[#a3a3a3] leading-relaxed">
                                        {service.summary}
                                    </p>

                                    <ul className="mt-6 space-y-2.5">
                                        {service.points.map((pt, pIdx) => (
                                            <li key={pIdx} className="flex items-start gap-2 text-xs text-[#a3a3a3]">
                                                <CheckCircle2 className="h-4 w-4 text-neutral-300 shrink-0 mt-0.5" />
                                                <span>{pt}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>

                {/* Selected Service Code Viewer */}
                <div className="mt-12 rounded-2xl border border-white/10 bg-[#050505] p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
                        <div className="flex items-center gap-3">
                            <Code2 className="h-5 w-5 text-neutral-300" />
                            <h4 className="font-mono text-sm font-semibold text-[#e5e5e5]">
                                Architecture Spec: <span className="text-neutral-300">{activeService.title}</span>
                            </h4>
                        </div>
                        <button
                            onClick={() => copyCode(activeService.codeSnippet)}
                            className="flex items-center gap-1.5 text-xs font-mono text-[#a3a3a3] hover:text-white transition"
                        >
                            <Copy className="h-3.5 w-3.5" /> Copy Snippet
                        </button>
                    </div>
                    <pre className="overflow-x-auto rounded-xl bg-[#050505] p-4 font-mono text-xs text-neutral-300 leading-relaxed border border-white/10">
                        {activeService.codeSnippet}
                    </pre>
                </div>
            </section>

            {/* REAL-WORLD MULTI-INDUSTRY SHOWCASES SECTION */}
            <Scene id="scene-industries" slot="industries" label="Industries" title="Built for your industry" sub="Healthcare, FinTech, E-Commerce, Legal, Logistics and EdTech." cta="See industries" href="#industries" />

            <section id="industries" className="py-24 border-t border-white/10 bg-[#050505] grid-lines">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="eyebrow">INDUSTRIES</span>
                        <p className="mt-4 text-[#a3a3a3] text-base sm:text-lg">
                            See how AI agents take on everyday workflow problems in Healthcare, FinTech, E-Commerce, Legal, Logistics, and EdTech.
                        </p>
                    </div>

                    {/* Sector Tabs */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
                        {Object.values(INDUSTRY_SHOWCASES).map((item) => {
                            const Icon = item.icon;
                            const isSelected = activeIndustryKey === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveIndustryKey(item.id)}
                                    className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition ${isSelected ? 'bg-teal-400 text-black' : 'bg-[#050505] text-[#a3a3a3] border border-white/10 hover:border-white/10'}`}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span>{item.sector}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Active Industry Deep-Dive Box */}
                    <div className="rounded-3xl cyber-glass border border-white/10 p-8 lg:p-12">
                        <div className="grid gap-8 lg:grid-cols-2 items-start">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="rounded-full bg-teal-500/10 px-3 py-1 text-xs font-mono text-neutral-300 border border-teal-500/30">
                                        {activeIndustry.badge}
                                    </span>
                                </div>

                                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#e5e5e5] mb-4">
                                    {activeIndustry.headline}
                                </h3>

                                <div className="space-y-4 text-sm leading-relaxed mb-6">
                                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
                                        <p className="font-mono text-xs font-bold text-red-400 mb-1">🔴 THE PROBLEM:</p>
                                        <p className="text-[#a3a3a3]">{activeIndustry.problem}</p>
                                    </div>

                                    <div className="rounded-xl border border-teal-500/30 bg-teal-500/10 p-4">
                                        <p className="font-mono text-xs font-bold text-neutral-300 mb-1">⚡ HOW AGENTS SOLVE IT:</p>
                                        <p className="text-[#a3a3a3]">{activeIndustry.solution}</p>
                                    </div>
                                </div>

                                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                                    <p className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest">ESTIMATED IMPACT (ILLUSTRATIVE)</p>
                                    <h4 className="font-display text-2xl font-extrabold text-emerald-400 mt-1">
                                        +{format(activeIndustry.impactUSD)}
                                    </h4>
                                    <p className="text-xs text-[#a3a3a3] mt-0.5">{activeIndustry.impactMetric}</p>
                                </div>
                            </div>

                            {/* Interactive Input/Output Payload Showcase */}
                            <div className="rounded-2xl border border-white/10 bg-[#050505] p-6 font-mono text-xs">
                                <div className="border-b border-white/10 pb-3 mb-4 flex items-center justify-between text-[#a3a3a3]">
                                    <span className="flex items-center gap-1.5 text-neutral-300 font-semibold">
                                        <Terminal className="h-4 w-4" /> Real Event Payload Trace
                                    </span>
                                    <span className="text-[10px] text-[#a3a3a3]">STP Verified</span>
                                </div>

                                <div className="mb-4">
                                    <p className="text-[10px] text-[#a3a3a3] uppercase mb-1">INCOMING EVENT / API TRIGGER:</p>
                                    <pre className="rounded-xl bg-[#050505] p-3 text-[#a3a3a3] leading-relaxed overflow-x-auto border border-white/10">
                                        {activeIndustry.inputSample}
                                    </pre>
                                </div>

                                <div>
                                    <p className="text-[10px] text-neutral-300 uppercase mb-1">OUTGOING AGENT RESPONSE:</p>
                                    <pre className="rounded-xl bg-teal-500/10 p-3 text-neutral-300 leading-relaxed overflow-x-auto border border-teal-500/30">
                                        {activeIndustry.outputSample}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Paid Project Certification Cohorts Section */}
            <Scene id="scene-careers" slot="careers" label="Learn with us" title="Paid AI Certification Cohorts" sub="Live cohorts, paid internships and startup roles." cta="View cohorts" href="#certifications" secondary={{ label: "Careers", href: "/careers" }} />

            <section id="certifications" className="py-24 border-t border-white/10 bg-[#050505]">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
                        <div>
                            <span className="eyebrow">LEARN WITH US</span>
                        </div>
                        <a
                            href="/careers#certifications"
                            className="inline-flex items-center gap-2 rounded-xl bg-teal-500/10 border border-teal-500/30 px-5 py-2.5 text-xs font-bold text-neutral-300 hover:bg-teal-500/10 transition"
                        >
                            <span>Explore Full Syllabus & Cohorts</span>
                            <ArrowRight className="h-4 w-4" />
                        </a>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {CERTIFICATION_COHORTS_PREVIEW.map((c, idx) => (
                            <div key={idx} className="rounded-2xl cyber-glass p-6 border border-white/10 flex flex-col justify-between">
                                <div>
                                    <span className="text-[11px] font-mono text-neutral-300 bg-teal-500/10 px-2.5 py-1 rounded border border-teal-500/30">
                                        {c.duration}
                                    </span>
                                    <h3 className="font-display text-lg font-bold text-[#e5e5e5] mt-3 mb-1">{c.title}</h3>
                                    <p className="text-xs font-mono text-neutral-300 font-bold mb-3">{format(c.priceUSD)} / cohort</p>
                                    <p className="text-xs text-[#a3a3a3] leading-relaxed mb-4">{c.desc}</p>
                                    <p className="text-[11px] font-mono text-neutral-300 bg-[#050505] p-2 rounded border border-white/10 mb-6">
                                        💰 Includes {format(c.stipendUSD)} Real Client Stipend
                                    </p>
                                </div>
                                <a
                                    href="/careers#certifications"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#050505] border border-white/10 py-2.5 text-xs font-bold text-[#e5e5e5] hover:bg-teal-300 hover:text-white transition"
                                >
                                    <span>Apply For Cohort</span>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Dynamic Multi-Currency ROI Calculator */}
            <Scene id="scene-roi" slot="roi" label="ROI calculator" title="Estimate what AI agents could save you" sub="Prices in USD, INR, EUR, GBP or AED." cta="Open the calculator" href="#calculator" />

            <section id="calculator" className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
                <div className="rounded-3xl border border-teal-500/30 bg-[#0a0a0a] p-8 lg:p-12">
                    <div className="grid gap-12 lg:grid-cols-2 items-center">
                        <div>
                            <span className="eyebrow">ROI CALCULATOR</span>
                            <p className="mt-4 text-sm text-[#a3a3a3] leading-relaxed">
                                See how much operational cost and time your team reclaims by switching manual claims, lead generation, and document processing to AI agents with human review.
                            </p>

                            <div className="mt-8 space-y-6">
                                <div>
                                    <div className="flex justify-between text-xs font-mono text-[#a3a3a3] mb-2">
                                        <span>Monthly Manual Process Hours:</span>
                                        <span className="text-neutral-300 font-bold">{manualHours} hrs</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="20"
                                        max="1000"
                                        step="10"
                                        value={manualHours}
                                        onChange={(e) => setManualHours(Number(e.target.value))}
                                        className="w-full h-2 bg-[#0a0a0a] rounded-lg appearance-none cursor-pointer accent-teal-400"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between text-xs font-mono text-[#a3a3a3] mb-2">
                                        <span>Fully Loaded Hourly Cost ({current.code}):</span>
                                        <span className="text-neutral-300 font-bold">{format(hourlyCostUSD)}/hr</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="20"
                                        max="150"
                                        step="5"
                                        value={hourlyCostUSD}
                                        onChange={(e) => setHourlyCostUSD(Number(e.target.value))}
                                        className="w-full h-2 bg-[#0a0a0a] rounded-lg appearance-none cursor-pointer accent-teal-400"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-[#050505] p-6 sm:p-8 text-center">
                            <p className="text-xs font-mono text-[#a3a3a3] uppercase tracking-widest">ESTIMATED MONTHLY SAVINGS ({current.code})</p>
                            <h3 className="mt-2 font-display text-4xl sm:text-5xl font-extrabold glow-gradient-text">
                                {format(monthlySavingsUSD)} / mo
                            </h3>

                            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 text-left">
                                <div>
                                    <p className="text-[10px] font-mono text-[#a3a3a3] uppercase">YEARLY HOURS RECLAIMED</p>
                                    <p className="text-xl font-bold text-[#e5e5e5] font-mono">{hoursSavedYearly.toLocaleString()} hrs</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-mono text-[#a3a3a3] uppercase">TARGET STP ACCURACY</p>
                                    <p className="text-xl font-bold text-neutral-300 font-mono">99.4%</p>
                                </div>
                            </div>

                            <a
                                href="#contact"
                                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-400 py-3.5 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-teal-300"
                            >
                                <span>Lock In Your Automation Plan</span>
                                <ArrowRight className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Audit & Contact Section */}
            <Scene id="scene-contact" slot="contact" label="Get started" title="Book a free 30-minute discovery call" sub="Write to support@stellaragents.in or use the form below." cta="Contact us" href="#contact" />

            <section id="contact" className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2 items-center">
                    <div>
                        <span className="eyebrow">GET STARTED</span>
                        <p className="mt-4 text-[#a3a3a3] text-base leading-relaxed">
                            Tell us which tasks eat your team's time. We'll map where AI agents fit and propose a small, scoped pilot.
                        </p>

                        <div className="mt-8 space-y-4">
                            <div className="flex items-center gap-3 text-sm text-[#a3a3a3]">
                                <ShieldCheck className="h-5 w-5 text-neutral-300" />
                                <span>Built for HIPAA, ABDM & DPDP-aligned data practices</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-[#a3a3a3]">
                                <Lock className="h-5 w-5 text-neutral-300" />
                                <span>Your data is never used to train models</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-[#a3a3a3]">
                                <Server className="h-5 w-5 text-neutral-300" />
                                <span>Run in our cloud or your own private cloud</span>
                            </div>
                        </div>

                        <ContactCard />
                    </div>

                    <div className="rounded-2xl cyber-glass border border-white/10 p-8">
                        <ContactForm />
                    </div>
                </div>
            </section>

            <CtaBand />

            {/* Footer */}
            <footer className="border-t border-white/10 bg-[#050505] py-12">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-wrap items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <Sparkles className="h-5 w-5 text-neutral-300" />
                        <span className="font-display font-bold text-[#e5e5e5]">Stellar AI Agents</span>
                                            </div>

                    <div className="flex items-center gap-6 text-xs text-[#a3a3a3]">
                        <a href="/careers" className="hover:text-white transition">Careers & Internships</a>
                        <a href="/careers#certifications" className="hover:text-white transition">Certifications</a>
                        <a href="#top" className="hover:text-white transition">Data Security</a>
                    </div>
                </div>
                <FooterCompany />
            </footer>
        </div>
    );
};

export default HomePage;
