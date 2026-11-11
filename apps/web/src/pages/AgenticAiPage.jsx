import React from 'react';
import { Target, ListChecks, Plug, ShieldCheck, Undo2 } from 'lucide-react';
import ContentPage, { CardGrid, Faq, Prose } from '@/components/ContentPage';

const STEPS = [
    { icon: Target, title: '1. A clear goal', desc: 'A person gives the agent a task with a defined finish line, such as "sort today\'s support emails and draft replies for the simple ones".' },
    { icon: ListChecks, title: '2. A plan', desc: 'The agent breaks the task into smaller steps and decides what information and which tools each step needs.' },
    { icon: Plug, title: '3. Action through tools', desc: 'It reads and writes through the tools it has been allowed to use: an inbox, a CRM, a spreadsheet, a document store or an API.' },
    { icon: ShieldCheck, title: '4. Checks and approval', desc: 'It checks its own output against rules, and pauses for a person to approve anything important or uncertain.' },
    { icon: Undo2, title: '5. Hand back', desc: 'It records what it did and why, so the team can review, correct and improve the workflow over time.' },
];

const FAQ = [
    { q: 'Is agentic AI the same as generative AI?', a: 'Not quite. Generative AI creates text, images or code when asked. Agentic AI uses a generative model as its "reasoning" part, but adds planning, tool use and checks so it can carry a task through several steps.' },
    { q: 'Will an AI agent replace my team?', a: 'That is not how we design them. Agents take on the repetitive parts of a workflow, and people keep the decisions, the exceptions and the final say.' },
    { q: 'Which AI model does an agent use?', a: 'It depends on the task, the data and the budget. An agent can use a commercial model such as GPT-4o, Claude or Gemini, or an open-source model such as Llama or Mistral when data must stay inside your own environment.' },
    { q: 'How long does a pilot take?', a: 'It depends on the workflow, the systems involved and how many review steps you need. We agree a timeline with you after the first scoping call.' },
];

const AgenticAiPage = () => (
    <ContentPage
        path="/agentic-ai"
        headerSub="GUIDE"
        hero={{
            id: 'agentic-top', slot: 'build', label: 'Guide',
            title: 'What is agentic AI?',
            sub: 'Agentic AI is software that can plan and act toward a goal. Instead of only answering a question, an AI agent breaks a task into steps, uses tools such as your inbox, CRM or documents, checks its work and asks a person to approve anything important.',
            cta: 'Read the guide', href: '#guide', secondary: { label: 'Talk to us', href: '/#contact' },
        }}
        cta={{ title: 'Want to try agentic AI on one workflow?', sub: 'Tell us about one repetitive task. We will tell you honestly whether an agent is a good fit.' }}
    >
        <Prose id="guide">
            <p className="eyebrow">Agentic AI in plain words</p>
            <h2>A short definition</h2>
            <p>
                Most people first met AI through chat: you ask a question and get an answer. <strong>Agentic AI</strong> goes one step further.
                You give it a goal, and it works out the steps, uses the software it has been given access to, and reports back.
                The software that does this is usually called an <strong>AI agent</strong>.
            </p>
            <p>
                An agent is not magic and it is not a person. It is a program built around a large language model (LLM), with a set of tools,
                rules about what it may and may not do, and checkpoints where a human reviews its work. Good agents are narrow: they do one job well.
            </p>

            <h2>AI agent or chatbot: what is the difference?</h2>
            <div className="mt-6 overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                    <thead>
                        <tr className="border-b border-white/15 text-[#e5e5e5]">
                            <th scope="col" className="py-3 pr-4 font-semibold">&nbsp;</th>
                            <th scope="col" className="py-3 pr-4 font-semibold">Chatbot</th>
                            <th scope="col" className="py-3 font-semibold">AI agent</th>
                        </tr>
                    </thead>
                    <tbody className="text-[#a3a3a3]">
                        <tr className="border-b border-white/10"><th scope="row" className="py-3 pr-4 font-medium text-[#d4d4d4]">Main job</th><td className="py-3 pr-4">Answers questions</td><td className="py-3">Completes a task</td></tr>
                        <tr className="border-b border-white/10"><th scope="row" className="py-3 pr-4 font-medium text-[#d4d4d4]">Steps</th><td className="py-3 pr-4">Usually one reply at a time</td><td className="py-3">Plans and runs several steps</td></tr>
                        <tr className="border-b border-white/10"><th scope="row" className="py-3 pr-4 font-medium text-[#d4d4d4]">Tools</th><td className="py-3 pr-4">Few or none</td><td className="py-3">Reads and writes in approved systems</td></tr>
                        <tr className="border-b border-white/10"><th scope="row" className="py-3 pr-4 font-medium text-[#d4d4d4]">Human role</th><td className="py-3 pr-4">Asks the questions</td><td className="py-3">Sets the goal and approves key steps</td></tr>
                        <tr><th scope="row" className="py-3 pr-4 font-medium text-[#d4d4d4]">Main risk</th><td className="py-3 pr-4">A wrong answer</td><td className="py-3">A wrong action, so permissions and checks matter more</td></tr>
                    </tbody>
                </table>
            </div>
        </Prose>

        <CardGrid id="how-agents-work" eyebrow="How it works" title="How an AI agent handles a task" items={STEPS} />

        <Prose id="human-review">
            <h2>Where human review fits</h2>
            <p>
                We build agents on a simple rule: <strong>the agent does the work, a person makes the call.</strong> Review points are placed where a mistake
                would cost money, affect a customer or patient, or be hard to undo. For example, an agent may draft a refund, but a person approves it
                before it is sent. Over time, as the team trusts a step, it can choose to review less of it.
            </p>

            <h2>Risks to plan for</h2>
            <ul>
                <li><strong>Wrong or made-up answers.</strong> Language models can sound confident and still be wrong. Grounding the agent in your own documents and checking its output reduces this.</li>
                <li><strong>Too much access.</strong> An agent should only be able to touch the systems and records its task needs, nothing more.</li>
                <li><strong>Personal data.</strong> Sensitive fields can be masked before they reach a model, and some workloads can run in a private cloud or on your own servers.</li>
                <li><strong>No paper trail.</strong> Every action should be logged so you can see what the agent did and why.</li>
                <li><strong>Running costs.</strong> Model usage is billed per use, so we size the model to the job and track cost from day one.</li>
            </ul>

            <h2>Good first tasks for an agent</h2>
            <p>The best first projects are repetitive, follow clear rules, and have an obvious way to check the result. Common examples:</p>
            <ul>
                <li>Sorting and drafting replies to support emails or tickets</li>
                <li>Pulling fields out of invoices, claims or forms and entering them into a system</li>
                <li>Preparing first drafts of reports or summaries from many documents</li>
                <li>Researching leads and keeping a CRM up to date</li>
            </ul>

            <h2>How Stellar Agents scopes a pilot</h2>
            <ol>
                <li>We pick <strong>one workflow</strong> with you and agree how success will be measured.</li>
                <li>We list the systems the agent needs, the access it should have, and where a person must review.</li>
                <li>We build a small pilot, test it on real (or realistic) examples, and show you the results and the logs.</li>
                <li>You decide whether to go live, change the scope or stop. There is no obligation to continue.</li>
            </ol>
            <p>
                Want to see what this looks like for a business like yours? Read about our <a href="/ai-agent-development-company-india">AI agent development work in India</a>,
                our <a href="/agentic-ai-chennai">Chennai team</a>, or <a href="/ai-agents-healthcare-rcm">agents for healthcare revenue cycle teams</a>.
            </p>
        </Prose>

        <Faq items={FAQ} />
    </ContentPage>
);

export default AgenticAiPage;
