import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faUser, 
  faLock, 
  faAddressBook  // Changed from faEnvelope to match your icon
} from '@fortawesome/free-solid-svg-icons';

library.add(faUser, faLock, faAddressBook);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
