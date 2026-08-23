import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArticleLayout } from './articles/components'

const englishPrivacyContent = {
  title: 'Privacy Policy',
  lastUpdated: 'Last updated: August 2026',
  intro: 'This policy describes how data is processed on this interactive AI portfolio.',
  sections: [
    {
      heading: 'What data is collected',
      items: [
        'Chatbot messages: when you interact with Prakhar\'s AI avatar, messages are processed to generate contextual responses. No personally identifiable information is requested or stored.',
        'Voice mode audio: if you activate voice mode, audio is processed in real time and is not permanently stored.',
        'Usage analytics: anonymous technical data is used to optimize web performance.',
      ],
    },
    {
      heading: 'How data is used',
      items: [
        'Chatbot messages are used exclusively to answer inquiries about Prakhar Mishra\'s professional background and AI architectures.',
        'No data is sold or shared for advertising.',
      ],
    },
    {
      heading: 'Third parties',
      items: [
        'Anthropic (Claude): processes chatbot queries for real-time inference.',
        'Vercel: web hosting infrastructure.',
      ],
    },
    {
      heading: 'Cookies and local storage',
      body: 'This site does not use third-party tracking cookies. Browser localStorage is only used for UI theme preferences.',
    },
    {
      heading: 'Contact',
      body: 'For any privacy questions, reach out to:',
      email: 'prakharmishra2015@gmail.com',
    },
  ],
  backHome: 'Back to portfolio',
}

const content = {
  es: englishPrivacyContent,
  en: englishPrivacyContent,
}

interface PrivacySection {
  heading: string
  items?: readonly string[]
  body?: string
  email?: string
}

export default function PrivacyPolicy({ lang = 'en' }: { lang?: 'es' | 'en' }) {
  const t = content[lang]

  useEffect(() => {
    document.title = `${t.title} | Prakhar Mishra`

    // noindex
    let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement
    if (!robots) {
      robots = document.createElement('meta')
      robots.name = 'robots'
      document.head.appendChild(robots)
    }
    robots.content = 'noindex, nofollow'

    // Fix canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (canonical) canonical.href = 'https://prakhar-ai.dev/privacy'

    // Fix meta description
    let desc = document.querySelector('meta[name="description"]') as HTMLMetaElement
    if (desc) desc.content = 'Privacy policy for Prakhar Mishra portfolio.'

    return () => {
      robots.content = 'index, follow'
    }
  }, [lang, t.title])

  return (
    <ArticleLayout lang={lang}>
      <header className="mb-10">
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">
          {t.title}
        </h1>
        <p className="text-sm text-muted-foreground">{t.lastUpdated}</p>
      </header>

      <article className="prose-custom">
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
          {t.intro}
        </p>

        {(t.sections as readonly PrivacySection[]).map((section, i) => (
          <section key={i} className="mb-8">
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">
              {section.heading}
            </h2>
            {section.items && (
              <ul className="space-y-2">
                {section.items.map((item, j) => (
                  <li key={j} className="text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
            {section.body && (
              <p className="text-muted-foreground">
                {section.body}
                {section.email && (
                  <a
                    href={`mailto:${section.email}`}
                    className="text-primary hover:underline ml-1 font-medium"
                  >
                    {section.email}
                  </a>
                )}
              </p>
            )}
          </section>
        ))}
      </article>

      <div className="mt-12 pt-6 border-t border-border flex items-center justify-between">
        <Link
          to="/"
          className="text-sm text-primary hover:underline font-medium"
        >
          {t.backHome}
        </Link>
      </div>
    </ArticleLayout>
  )
}
