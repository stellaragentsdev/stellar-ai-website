import React from 'react';
import ContentPage, { Prose } from '@/components/ContentPage';
import { DraftBanner } from '@/components/DraftBanner';
import { ADDRESS, EMAIL, LEGAL_NAME } from '@/seo/site';

// DRAFT: written as a starting point only. It must be reviewed by a qualified
// lawyer and confirmed by the owner before it is treated as the site's terms.
const TermsPage = () => (
    <ContentPage
        path="/terms"
        headerSub="LEGAL (DRAFT)"
        hero={{ id: 'terms-top', slot: 'roi', label: 'Legal · Draft', title: 'Terms of use (draft)', sub: 'The rules for using stellaragents.in. This draft is pending legal review and is not yet in effect.' }}
        cta={false}
    >
        <Prose id="terms">
            <DraftBanner />

            <h2>1. About these terms</h2>
            <p>
                These terms apply to your use of stellaragents.in, run by <strong>{LEGAL_NAME}</strong> (&quot;Stellar Agents&quot;, &quot;we&quot;),
                {' '}{ADDRESS.full}. By using the website you agree to them. If you do not agree, please do not use the site.
            </p>

            <h2>2. Information only</h2>
            <p>
                The website describes our services in general terms. It is not medical, legal, financial or other professional advice, and it is not an offer
                that can be accepted. Any work we do for you is covered by a separate written agreement.
            </p>

            <h2>3. Demos, examples and estimates</h2>
            <ul>
                <li>The agent demos on this site are simulations with made-up data. They do not connect to real systems.</li>
                <li>Industry examples, impact figures and the ROI calculator are illustrative estimates, not promises or results from a specific client.</li>
                <li>Prices shown in currencies other than US dollars are converted at approximate fixed rates and are for guidance only.</li>
            </ul>

            <h2>4. Careers and cohorts</h2>
            <p>Job, internship and certification cohort listings, including pay, stipends and fees, may change or close without notice. Final terms are set out in a written offer or enrolment agreement.</p>

            <h2>5. Acceptable use</h2>
            <p>Do not misuse the website, for example by trying to break its security, overload it, scrape it in ways that harm it, or send unlawful or harmful content through its forms.</p>

            <h2>6. Content and trademarks</h2>
            <p>
                The website&apos;s text, design and images belong to us or our licensors. Names and logos of third-party products, such as AI models and automation tools,
                belong to their owners and are shown only to describe what we work with. Their use does not mean those companies endorse us.
            </p>

            <h2>7. Links to other sites</h2>
            <p>We are not responsible for the content or privacy practices of websites we link to.</p>

            <h2>8. Liability</h2>
            <p>The website is provided &quot;as is&quot;. To the extent the law allows, we are not liable for losses arising from your use of it. [Legal review needed: liability wording and limits.]</p>

            <h2>9. Governing law</h2>
            <p>These terms are governed by the laws of India, and courts in Chennai, Tamil Nadu will have jurisdiction. [Legal review needed: confirm.]</p>

            <h2>10. Contact</h2>
            <p>Questions about these terms: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
        </Prose>
    </ContentPage>
);

export default TermsPage;
