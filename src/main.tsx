import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Amplify } from 'aws-amplify'
import awsConfig from './lib/amplifyConfig'
import './index.css'
import App from './App.tsx'

// Initialize Amplify
Amplify.configure(awsConfig)

// Expose Amplify globally for debugging
if (typeof window !== 'undefined') {
  (window as any).Amplify = Amplify
  
  // Debug logging
  console.log('✅ Amplify initialized')
  console.log('📋 Configuration:', awsConfig)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
