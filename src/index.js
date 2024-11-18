import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClinet = new QueryClient();
root.render(
    <QueryClientProvider client={queryClinet}>
    <App />
    </QueryClientProvider>
);

serviceWorkerRegistration.register();
// serviceWorkerRegistration.unregister();


// reportWebVitals();
