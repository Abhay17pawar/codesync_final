import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ClerkProvider } from '@clerk/clerk-react';  // Import ClerkProvider

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error('Missing Clerk publishable key in environment variables.');
}

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>  {/* Wrap your app with ClerkProvider */}
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
