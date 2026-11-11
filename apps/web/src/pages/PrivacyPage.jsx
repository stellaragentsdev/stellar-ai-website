import React from 'react';
import ContentPage, { Prose } from '@/components/ContentPage';
import { DraftBanner } from '@/components/DraftBanner';
import { ADDRESS, EMAIL, GSTIN, LEGAL_NAME } from '@/seo/site';

// DRAFT: written as a starting point only. It must be reviewed by a qualified
// lawyer and confirmed by the owner before it is treated as the site's policy.
const PrivacyPage = () => (
    <ContentPage
        path="/privacy"
        headerSub="LEGAL (DRAFT)"
        hero={{ id: 'privacy-top', slot: 'roi', label: 'Legal · Draft', title: 'Privacy policy (draft)', sub: 'How stellaragents.in handles the information you share with us. This draft is pending legal review and is not yet in effect.' }}
        cta={false}
    >
        <Prose id="policy">
            <DraftBanner />

            <h2>1. Who we are</h2>
            <p>
                stellaragents.in is run by <strong>{LEGAL_NAME}</strong> (&quot;Stellar Agents&quot;, &quot;we&quot;, &quot;us&quot;),
                {' '}{ADDRESS.full}. GSTIN: {GSTIN}. You can reach us about privacy at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
            </p>

            <h2>2. What we collect</h2>
            <ul>
                <li><strong>Contact form.</strong> Your name, work email, company, phone number (optional), the area you are interested in and your message.</li>
                <li><strong>Emails you send us.</strong> Whatever you include, for example a CV or project details.</li>
                <li><strong>Technical data.</strong> Like most websites, our hosting provider records basic request data such as IP address, browser type, pages requested and time of visit, to run and secure the site.</li>
                <li><strong>Saved preference.</strong> If you pick a currency on the site, your browser stores that choice locally (local storage). It is not sent to us.</li>
            </ul>
            <p>We do not currently use analytics, advertising or tracking cookies on this website. [Owner to confirm, and update this section if that changes.]</p>

            <h2>3. Why we use it</h2>
            <ul>
                <li>To reply to your enquiry and, if you ask, to arrange a call or prepare a proposal</li>
                <li>To consider job, internship or cohort applications you send us</li>
                <li>To keep the website working and secure</li>
                <li>To meet our legal obligations</li>
            </ul>
            <p>We do not sell your personal data, and we do not use it to train AI models.</p>

            <h2>4. Legal basis</h2>
            <p>
                We process personal data with your consent (for example, when you submit the contact form) and, where permitted, for legitimate uses
                under India&apos;s Digital Personal Data Protection Act, 2023. [Legal review needed: confirm basis and wording, and whether other laws, such as the GDPR, apply to visitors outside India.]
            </p>

            <h2>5. Who we share it with</h2>
            <ul>
                <li><strong>Service providers</strong> who host the website and deliver email for us, only as needed to provide those services. [Owner to list providers, for example the web host and email provider.]</li>
                <li><strong>Fonts.</strong> The site loads fonts from Google Fonts, so your browser connects to Google&apos;s servers when you visit.</li>
                <li><strong>Authorities</strong>, if the law requires it.</li>
            </ul>

            <h2>6. How long we keep it</h2>
            <p>We keep enquiry details only as long as needed to respond and follow up, and then delete them. [Owner to confirm a retention period.]</p>

            <h2>7. Your rights</h2>
            <p>
                Subject to applicable law, you can ask us to tell you what personal data we hold about you, correct or update it, erase it, or withdraw
                your consent. You can also raise a grievance with us, and if you are not satisfied, with the Data Protection Board of India. To make a request,
                email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
            </p>
            <p>Grievance contact: [Owner to confirm name and contact details].</p>

            <h2>8. Security</h2>
            <p>We use reasonable technical and organisational measures to protect personal data. No website or email system is completely secure.</p>

            <h2>9. Children</h2>
            <p>This website is meant for businesses and adult job seekers. We do not knowingly collect personal data from children.</p>

            <h2>10. Changes</h2>
            <p>We may update this policy. The current version will always be on this page with its effective date.</p>
        </Prose>
    </ContentPage>
);

export default PrivacyPage;
