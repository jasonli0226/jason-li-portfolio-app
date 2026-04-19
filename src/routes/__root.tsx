import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import Footer from '../components/Footer'
import Header from '../components/Header'

import appCss from '../styles.css?url'

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark')?stored:'dark';var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(mode);root.setAttribute('data-theme',mode);root.style.colorScheme=mode;}catch(e){document.documentElement.classList.add('dark');}})();`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Jason Li – AI Data Architect | Senior Data Scientist' },
      {
        name: 'description',
        content:
          'Jason Li is an AI Data Architect with 10+ years designing scalable GenAI and AI/ML data architectures, Agentic AI systems, and MLOps on AWS.',
      },
      { property: 'og:title', content: 'Jason Li – AI Data Architect' },
      {
        property: 'og:description',
        content:
          'Portfolio of Jason Li — Agentic AI, LLM integration, multi-modal pipelines, and enterprise MLOps.',
      },
      { property: 'og:type', content: 'website' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="font-sans antialiased">
        <Header />
        {children}
        <Footer />
        <Scripts />
      </body>
    </html>
  )
}
