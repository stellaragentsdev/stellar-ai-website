#!/usr/bin/env node
// Writes public/llms.txt from the page list in src/seo/site.js.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PAGES, SITE_URL, BRAND, LEGAL_NAME, EMAIL, ADDRESS, canonicalFor } from '../src/seo/site.js';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const section = (title, pages) => [`## ${title}`, ...pages.map((p) => `- [${p.title}](${canonicalFor(p.path)}): ${p.llmsSummary}`)].join('\n');

const byPath = (paths) => paths.map((p) => PAGES.find((x) => x.path === p)).filter(Boolean);

const content = `# ${BRAND}

> ${BRAND} builds custom, human-in-the-loop AI agents and copilots for businesses. Agents take on repetitive, rule-based work inside the tools a team already uses, and a person approves anything important. Based in Chennai, India; works with teams in India and abroad.

## Key facts
- Brand: ${BRAND} (website: ${SITE_URL}/)
- Legal entity: ${LEGAL_NAME}
- Registered office: ${ADDRESS.full}
- Contact: ${EMAIL}
- What we build: task agents for operations, assistants grounded in a client's own documents (RAG), multi-agent workflows, healthcare revenue cycle (RCM) support agents, code review and security agents, and private deployments of open-source models.
- How we work: free discovery call, scoping of one workflow, small pilot, review with the client's team, go live with logging and human approval steps, handover.
- Figures on the site (ROI calculator, industry impact numbers, demo outputs) are illustrative, not client results.

${section('Main pages', byPath(['/', '/agentic-ai', '/ai-agent-development-company-india', '/agentic-ai-chennai', '/ai-agents-healthcare-rcm']))}

${section('Careers', byPath(['/careers']))}

${section('Optional', byPath(['/privacy', '/terms']))}
`;

fs.writeFileSync(path.join(root, 'public', 'llms.txt'), content, 'utf8');
console.log('llms.txt written');
