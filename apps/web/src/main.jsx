import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';

const container = document.getElementById('root');

// Prerendered routes ship real HTML in #root; hydrate it. Otherwise render normally.
if (container.hasChildNodes()) {
	ReactDOM.hydrateRoot(container, <App />);
} else {
	ReactDOM.createRoot(container).render(<App />);
}
