import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, Sun, MoonStar, Globe2, Cpu, Shield, Wrench, Cloud, Zap, ArrowRight } from 'lucide-react'
import Spline from '@splinetool/react-spline'

const COLORS = {
  orange: '#a34d2d',
  black: '#0a0a0a',
  offwhite: '#f6f7ec',
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    return localStorage.getItem('theme') || 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  return { theme, setTheme }
}

function useLang() {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'en'
    return localStorage.getItem('lang') || 'en'
  })

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('lang', lang)
    root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr')
    localStorage.setItem('lang', lang)
  }, [lang])

  return { lang, setLang }
}

const content = {
  en: {
    nav: { services: 'Services', work: 'Work', contact: 'Contact' },
    hero: {
      badge: 'All In One technical solutions',
      title: 'AIO — High‑performance tech, unified.',
      subtitle:
        'From strategy to ship, we design, build, and scale products that perform. One partner. End‑to‑end delivery.',
      ctaPrimary: 'Start a project',
      ctaSecondary: 'Our work',
    },
    services: {
      heading: 'What we do',
      items: [
        { icon: Cpu, title: 'Product Engineering', desc: 'Web, mobile, and platforms built for speed and scale.' },
        { icon: Shield, title: 'Security & Compliance', desc: 'Hardened by default. Audits, SOC2-ready foundations.' },
        { icon: Cloud, title: 'Cloud & DevOps', desc: 'CI/CD, autoscale, and observability that just works.' },
        { icon: Wrench, title: 'AI & Automations', desc: 'Integrations and agents that reduce ops and unlock growth.' },
        { icon: Globe2, title: 'Brand & Experience', desc: 'Identity, websites, and motion systems that convert.' },
        { icon: Zap, title: 'Performance Tuning', desc: 'Lighthouse, Core Web Vitals, and backend optimizations.' },
      ],
    },
    work: {
      heading: 'Selected work',
      projects: [
        { title: 'NeuroDash', tag: 'SaaS Platform', blurb: 'Real‑time analytics with sub‑second queries.' },
        { title: 'Nova Commerce', tag: 'eCommerce', blurb: '3D product explorer with AR try‑on.' },
        { title: 'Atlas Ops', tag: 'DevTools', blurb: 'Build pipelines that ship in minutes, not hours.' },
      ],
    },
    contact: {
      heading: 'Let’s build something remarkable',
      sub: 'Tell us about your goals. We’ll reply within 24 hours.',
      name: 'Your name',
      email: 'Work email',
      message: 'What are you building?',
      send: 'Send message',
    },
    footer: {
      rights: '© AIO — All rights reserved.'
    }
  },
  ar: {
    nav: { services: 'الخدمات', work: 'الأعمال', contact: 'تواصل' },
    hero: {
      badge: 'حلول تقنية شاملة',
      title: 'AIO — أداء عالٍ بتجربة موحدة.',
      subtitle:
        'من الإستراتيجية إلى الإطلاق، نصمّم ونبني ونطوّر منتجات عالية الأداء. شريك واحد لحل متكامل.',
      ctaPrimary: 'ابدأ مشروعك',
      ctaSecondary: 'أعمالنا',
    },
    services: {
      heading: 'ماذا نقدم',
      items: [
        { icon: Cpu, title: 'هندسة المنتجات', desc: 'ويب، جوال، ومنصات سريعة وقابلة للتوسّع.' },
        { icon: Shield, title: 'الأمن والامتثال', desc: 'حماية افتراضية، تدقيقات، وأساسات جاهزة للامتثال.' },
        { icon: Cloud, title: 'السحابة والتشغيل', desc: 'تكامل مستمر، توسّع تلقائي، ومراقبة فعّالة.' },
        { icon: Wrench, title: 'الذكاء الاصطناعي والأتمتة', desc: 'تكاملات ووكلاء يخفّفون العمليات ويزيدون النمو.' },
        { icon: Globe2, title: 'الهوية والتجربة', desc: 'هوية بصرية ومواقع وحركة تزيد التحويل.' },
        { icon: Zap, title: 'تحسين الأداء', desc: 'نتائج مثالية وBackends محسّنة.' },
      ],
    },
    work: {
      heading: 'نماذج مختارة',
      projects: [
        { title: 'NeuroDash', tag: 'منصّة SaaS', blurb: 'تحليلات فورية باستعلامات دون ثانية.' },
        { title: 'Nova Commerce', tag: 'تجارة إلكترونية', blurb: 'استكشاف ثلاثي الأبعاد وتجربة واقع معزّز.' },
        { title: 'Atlas Ops', tag: 'أدوات مطوّرين', blurb: 'أنابيب بناء تُطلق خلال دقائق لا ساعات.' },
      ],
    },
    contact: {
      heading: 'لنصنع شيئًا استثنائيًا',
      sub: 'أخبرنا عن أهدافك. سنرد خلال 24 ساعة.',
      name: 'اسمك',
      email: 'بريدك الوظيفي',
      message: 'ماذا تبني؟',
      send: 'إرسال',
    },
    footer: {
      rights: '© AIO — جميع الحقوق محفوظة.'
    }
  }
}

function App() {
  const { theme, setTheme } = useTheme()
  const { lang, setLang } = useLang()
  const t = useMemo(() => content[lang], [lang])

  const sectionVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <div className="min-h-screen bg-[--bg] text-[--fg] selection:bg-[color:rgba(163,77,45,0.25)] selection:text-[--fg]">
      {/* Top Navigation */}
      <header className="fixed top-0 inset-x-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/40 dark:supports-[backdrop-filter]:bg-black/30 border-b border-white/10 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative h-8 w-8 grid place-items-center rounded-md" style={{ background: COLORS.black, boxShadow: `0 0 0 2px ${COLORS.offwhite} inset` }}>
              <div className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS.orange }} />
            </div>
            <div className="leading-tight">
              <div className="font-semibold tracking-tight" style={{ color: COLORS.orange }}>AIO</div>
              <div className="text-xs opacity-70">All In One</div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#services" className="hover:opacity-80 transition-opacity">{t.nav.services}</a>
            <a href="#work" className="hover:opacity-80 transition-opacity">{t.nav.work}</a>
            <a href="#contact" className="hover:opacity-80 transition-opacity">{t.nav.contact}</a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              aria-label="Toggle language"
              onClick={() => setLang(l => (l === 'en' ? 'ar' : 'en'))}
              className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm border border-white/20 hover:border-white/40 transition-colors"
              style={{ background: 'transparent' }}
            >
              <Globe2 className="h-4 w-4" />
              <span>{lang === 'en' ? 'AR' : 'EN'}</span>
            </button>
            <button
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="inline-flex items-center rounded-md px-3 py-2 border border-white/20 hover:border-white/40 transition-colors"
              style={{ background: 'transparent' }}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
            </button>
            <button className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md border border-white/20">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero with Spline cover */}
      <section id="hero" className="relative min-h-[90vh] overflow-hidden">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/cEecEwR6Ehj4iT8T/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        {/* Dark gradient overlay to improve text contrast */}
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: 'radial-gradient(1200px 600px at 30% 20%, rgba(10,10,10,0.15), transparent 60%), linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,0.65) 75%, rgba(10,10,10,0.85) 100%)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }} className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs border border-white/20 backdrop-blur bg-white/10 text-white">
            <span className="h-2 w-2 rounded-full" style={{ background: COLORS.orange }} />
            {t.hero.badge}
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22,1,0.36,1] }} className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow">
            {t.hero.title}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.05, ease: [0.22,1,0.36,1] }} className="mt-4 max-w-2xl text-base sm:text-lg text-white/80">
            {t.hero.subtitle}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1, ease: [0.22,1,0.36,1] }} className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#contact" className="group inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-[--btn-fg]" style={{ background: COLORS.orange, color: COLORS.offwhite }}>
              {t.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href="#work" className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm border border-white/30 text-white/90 hover:border-white/60 transition-colors">
              {t.hero.ctaSecondary}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <motion.section id="services" variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="relative py-24">
        <div className="absolute inset-0 pointer-events-none opacity-70" style={{ background: `radial-gradient(800px 400px at 80% 20%, ${COLORS.orange}22, transparent 60%)` }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6 mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: COLORS.orange }}>{t.services.heading}</h2>
            <div className="text-sm opacity-70">AIO — All In One</div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.services.items.map((s, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.05 }} className="group relative rounded-2xl border border-white/10 overflow-hidden bg-white/60 dark:bg-white/5 backdrop-blur hover:shadow-[0_8px_40px_rgba(163,77,45,0.15)] transition-all">
                <div className="p-6">
                  <div className="h-12 w-12 rounded-lg grid place-items-center mb-4" style={{ background: `${COLORS.orange}1a`, boxShadow: `0 0 0 1px ${COLORS.orange}33 inset` }}>
                    <s.icon className="h-6 w-6" style={{ color: COLORS.orange }} />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{s.title}</h3>
                  <p className="text-sm opacity-70 leading-relaxed">{s.desc}</p>
                </div>
                <div className="h-1 w-0 group-hover:w-full transition-all" style={{ background: COLORS.orange }} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Work */}
      <motion.section id="work" variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="relative py-24">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10" style={{ color: COLORS.orange }}>{t.work.heading}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {t.work.projects.map((p, idx) => (
              <motion.a key={idx} href="#contact" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.05 }} className="group relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/60 to-white/30 dark:from-white/5 dark:to-white/0 backdrop-blur">
                <div className="aspect-video relative">
                  <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${COLORS.orange}22 0%, transparent 60%)` }} />
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1760764541302-e3955fbc6b2b?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjI5MTcyNDJ8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-luminosity opacity-70" />
                </div>
                <div className="p-5">
                  <div className="text-xs uppercase tracking-widest opacity-70">{p.tag}</div>
                  <div className="mt-1 text-lg font-semibold">{p.title}</div>
                  <p className="mt-1 text-sm opacity-70">{p.blurb}</p>
                </div>
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `radial-gradient(500px 200px at 30% 10%, ${COLORS.orange}22, transparent)` }} />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact */}
      <motion.section id="contact" variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="relative py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: COLORS.orange }}>{t.contact.heading}</h2>
          <p className="mt-2 opacity-80">{t.contact.sub}</p>

          <form onSubmit={(e) => e.preventDefault()} className="mt-8 grid gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1 opacity-80">{t.contact.name}</label>
                <input type="text" className="w-full rounded-lg border border-white/20 bg-white/70 dark:bg-white/5 px-3 py-2 outline-none focus:ring-2" style={{
                  color: 'inherit',
                  boxShadow: `0 0 0 1px transparent`,
                }} placeholder={t.contact.name} />
              </div>
              <div>
                <label className="block text-sm mb-1 opacity-80">{t.contact.email}</label>
                <input type="email" className="w-full rounded-lg border border-white/20 bg-white/70 dark:bg-white/5 px-3 py-2 outline-none focus:ring-2" placeholder={t.contact.email} />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1 opacity-80">{t.contact.message}</label>
              <textarea rows={5} className="w-full rounded-lg border border-white/20 bg-white/70 dark:bg-white/5 px-3 py-2 outline-none focus:ring-2" placeholder={t.contact.message} />
            </div>
            <div className="flex items-center gap-3">
              <button type="submit" className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold" style={{ background: COLORS.orange, color: COLORS.offwhite }}>
                {t.contact.send}
                <ArrowRight className="h-4 w-4" />
              </button>
              <a href="mailto:hello@aio.dev" className="text-sm opacity-80 hover:opacity-100">hello@aio.dev</a>
            </div>
          </form>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="relative py-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded grid place-items-center" style={{ background: COLORS.black, boxShadow: `0 0 0 2px ${COLORS.offwhite} inset` }}>
              <div className="h-1.5 w-1.5 rounded-full" style={{ background: COLORS.orange }} />
            </div>
            <span className="text-sm opacity-75">{t.footer.rights}</span>
          </div>
          <div className="text-sm opacity-70">Made with care — performance first</div>
        </div>
      </footer>

      <style>{`
        :root { --bg: ${COLORS.offwhite}; --fg: ${COLORS.black}; }
        :root.dark { --bg: ${COLORS.black}; --fg: ${COLORS.offwhite}; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  )
}

export default App
