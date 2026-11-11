import React from 'react';

export const DraftBanner = () => (
    <div role="note" className="draft-banner mb-10 rounded-xl p-5 text-sm leading-relaxed">
        <strong className="block text-[#fde68a]">Draft: pending legal review</strong>
        This page is a draft and has not yet been reviewed by a lawyer. It is not yet in effect. Text in [square brackets] still needs the owner&apos;s input.
    </div>
);

export default DraftBanner;
