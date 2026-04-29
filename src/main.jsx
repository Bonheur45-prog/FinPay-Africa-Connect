import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './assets/styles/global.css'
import App from './App.jsx'
import { initI18n } from './i18n.js'

await initI18n;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/FinPay-Africa-Connect/">
      <App />
    </BrowserRouter>
  </StrictMode>,
)
