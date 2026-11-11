import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App';
import '@/index.css';

const container = document.getElementById('root');
const app = (
	<BrowserRouter>
		<App />
	</BrowserRouter>
);

// Pages are prerendered at build time; hydrate them instead of re-rendering.
if (container.firstElementChild) {
	ReactDOM.hydrateRoot(container, app);
} else {
	ReactDOM.createRoot(container).render(app);
}
