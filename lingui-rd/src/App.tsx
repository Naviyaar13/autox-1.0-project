import { Trans } from '@lingui/macro'
import { useState } from 'react'
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'

function App() {
  const [locale, setLocale] = useState<string>('en')

  const toggleLocale = async () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en'
    
    // Dynamically import compiled messages
    const { messages } = await import(`./locales/${nextLocale}/messages.po`)
    i18n.loadAndActivate({ locale: nextLocale, messages })
    
    setLocale(nextLocale)
    document.documentElement.dir = nextLocale === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = nextLocale
  }

  return (
    <I18nProvider i18n={i18n}>
      <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
        <h1>
          <Trans>Internationalization R&D</Trans>
        </h1>
        <p>
          <Trans>This is a test application to verify English and Arabic translations using LinguiJS.</Trans>
        </p>
        <button 
          onClick={toggleLocale} 
          style={{ padding: '0.5rem 1rem', fontSize: '1rem', marginTop: '1rem' }}
        >
          <Trans>Switch Language</Trans> (Current: {locale.toUpperCase()})
          
        </button>
        <br />
        <h2>
          <Trans>Here is the example</Trans>
        </h2>
        <p>
          <Trans>heloo this is navi here !!</Trans>
        </p>
        <Trans> example tag </Trans>
        <br />
      </div>
    </I18nProvider>
  )
}

export default App
