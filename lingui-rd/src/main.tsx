import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { i18n } from '@lingui/core'
import App from './App.tsx'
import './index.css'

async function init() {
  try {
    const { messages } = await import('./locales/en/messages.po')
    i18n.loadAndActivate({ locale: 'en', messages })
    document.documentElement.lang = 'en'
    document.documentElement.dir = 'ltr'
  } catch (err) {
    console.error('Failed to load initial locale', err)
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

init()
