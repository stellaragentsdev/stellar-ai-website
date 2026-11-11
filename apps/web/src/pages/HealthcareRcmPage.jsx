import React from 'react';
import { FileSearch, FileSignature, ClipboardCheck, ScanText, Stethoscope, Link2 } from 'lucide-react';
import ContentPage, { CardGrid, Faq, Prose } from '@/components/ContentPage';

const USES = [
    { icon: FileSearch, title: 'Denial triage', desc: 'Read denial and remittance details, group claims by reason, and suggest the next step for a billing specialist to confirm.' },
    { icon: FileSignature, title: 'Appeal drafts', desc: 'Prepare a draft appeal letter from the claim and the supporting records, for your staff to check, edit and sign.' },
    { icon: ClipboardCheck, title: 'Pre-submission checks', desc: 'Flag missing fields, mismatched details or missing documents before a claim goes out, so fewer come back.' },
    { icon: ScanText, title: 'Document intake', desc: 'Pull fields from referrals, prescriptions, insurance cards and forms into your system, and flag anything unclear for a person.' },
    { icon: Stethoscope, title: 'Intake and triage support', desc: 'Collect structured intake details and route them to the right person. The agent does not diagnose or give medical advice.' },
    { icon: Link2, title: 'ABDM-aware data flows', desc: 'In India, connect to Ayushman Bharat Digital Mission (ABDM) and ABHA health ID flows where your systems and patient consent allow.' },
];

const FAQ = [
    { q: 'Does the agent make clinical or coding decisions?', a: 'No. Clinical decisions, code sign-off and claim submission stay with your qualified staff. The agent prepares, checks and drafts; people approve.' },
    { q: 'Is it HIPAA or DPDP compliant?', a: 'Compliance depends on your whole environment, contracts and processes, not on one piece of software. We design agents to support HIPAA, ABDM and DPDP Act 2023 requirements where they apply, and confirm what is needed for your setup during scoping.' },
    { q: 'Where does patient data go?', a: 'Only where the workflow needs it. We can mask personal details before they reach a model, and run models in a private cloud or on your own servers when data must stay with you.' },
    { q: 'Will this work with our billing or EHR system?', a: 'That depends on how the system can be accessed, for example through an API, an export or an integration tool. We check this in the first scoping call.' },
];

const HealthcareRcmPage = () => (
    <ContentPage
        path="/ai-agents-healthcare-rcm"
        headerSub="HEALTHCARE"
        hero={{
            id: 'rcm-top', slot: 'careers', label: 'Healthcare revenue cycle',
            title: 'Healthcare RCM AI agents with human review',
            sub: 'AI agents that help revenue cycle teams prepare claims, work denials and keep records in order, with a qualified person approving every decision that matters.',
            cta: 'Where agents help', href: '#uses', secondary: { label: 'Talk to us', href: '/#contact' },
        }}
        cta={{ title: 'Start with one billing workflow', sub: 'Tell us where your revenue cycle team loses the most time. We will tell you whether an agent can help, and how it would be reviewed.' }}
    >
        <Prose id="intro">
            <p className="eyebrow">Revenue cycle management</p>
            <h2>Where the time goes in RCM</h2>
            <p>
                Revenue cycle management (RCM) covers everything between a patient visit and the payment for it: registration, eligibility checks,
                coding, claim submission, denials, appeals and follow-up. Much of that work is careful, repetitive checking of documents against rules,
                which is exactly the kind of work an AI agent can prepare for a person to approve.
            </p>
            <p>
                Stellar Agents builds these agents in Chennai for healthcare providers and billing teams. Each one is designed for a single workflow,
                connected to the systems you already use, and set up so your staff review its work before anything leaves your organisation.
            </p>
        </Prose>

        <CardGrid id="uses" eyebrow="Where agents help" title="RCM tasks an agent can prepare" intro="These describe what such agents can be designed to do. They are examples, not results from a specific client." items={USES} />

        <Prose id="control">
            <h2>What stays with your team</h2>
            <ul>
                <li>All clinical decisions and anything said to a patient about their care</li>
                <li>Final coding sign-off and claim submission</li>
                <li>Approval of every appeal before it is sent</li>
                <li>Decisions on exceptions, write-offs and disputes</li>
            </ul>

            <h2>How we handle health data</h2>
            <ul>
                <li><strong>Minimum data.</strong> The agent only gets the records and fields its task needs.</li>
                <li><strong>Masking.</strong> Personal details can be masked before text is sent to a model.</li>
                <li><strong>Your environment.</strong> Where required, models run in a private cloud or on your own servers.</li>
                <li><strong>No training on your data.</strong> Your data is not used to train AI models.</li>
                <li><strong>Audit trail.</strong> Every action the agent takes is logged for review.</li>
            </ul>
            <p>
                New to AI agents? Read <a href="/agentic-ai">What is agentic AI?</a> or see our wider <a href="/ai-agent-development-company-india">AI agent development services</a>.
            </p>
        </Prose>

        <Faq items={FAQ} />
    </ContentPage>
);

export default HealthcareRcmPage;
