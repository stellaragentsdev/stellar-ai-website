import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import FadeInSections from './components/FadeInSections';
import HomePage from './pages/HomePage';
import CareersPage from './pages/CareersPage';
import AgenticAiPage from './pages/AgenticAiPage';
import AiAgentDevelopmentIndiaPage from './pages/AiAgentDevelopmentIndiaPage';
import AgenticAiChennaiPage from './pages/AgenticAiChennaiPage';
import HealthcareRcmPage from './pages/HealthcareRcmPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';
import { CurrencyProvider } from './contexts/CurrencyContext';

// The router itself is supplied by the caller: BrowserRouter in main.jsx,
// StaticRouter in entry-server.jsx (build-time prerendering).
// Keep this list in sync with PAGES in src/seo/site.js and public/.htaccess.
function App() {
    return (
        <CurrencyProvider>
            <ScrollToTop />
            <FadeInSections />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/agentic-ai" element={<AgenticAiPage />} />
                <Route path="/ai-agent-development-company-india" element={<AiAgentDevelopmentIndiaPage />} />
                <Route path="/agentic-ai-chennai" element={<AgenticAiChennaiPage />} />
                <Route path="/ai-agents-healthcare-rcm" element={<HealthcareRcmPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </CurrencyProvider>
    );
}

export default App;
