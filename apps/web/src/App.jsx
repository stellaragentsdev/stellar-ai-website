import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import FadeInSections from './components/FadeInSections';
import HomePage from './pages/HomePage';
import CareersPage from './pages/CareersPage';
import { CurrencyProvider } from './contexts/CurrencyContext';

// Shared by the browser entry (BrowserRouter) and the build-time prerender (StaticRouter).
export function AppRoutes() {
    return (
        <CurrencyProvider>
            <ScrollToTop />
            <FadeInSections />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/careers" element={<CareersPage />} />
            </Routes>
        </CurrencyProvider>
    );
}

function App() {
    return (
        <Router>
            <AppRoutes />
        </Router>
    );
}

export default App;
