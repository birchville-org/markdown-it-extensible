import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "markdown-it-extensible",
  description: "A highly extensible, zero-code block container and inline directive syntax engine",
  base: "/markdown-it-extensible/", // for github pages
  themeConfig: {
    logo: '/birchville_logo.png',
    
    // Scholarly Synthesis Layout Standard: toc.integrate
    outline: {
      level: [2, 3],
      label: 'Auf dieser Seite'
    },
    
    nav: [
      { text: 'Start', link: '/' },
      { text: 'Dokumentation', link: '/guide/introduction' }
    ],

    sidebar: [
      {
        text: 'Einführung',
        collapsed: false,
        items: [
          { text: 'Was ist markdown-it-extensible?', link: '/guide/introduction' },
          { text: 'Installation & Setup', link: '/guide/getting-started' }
        ]
      },
      {
        text: 'Anwendung & Syntax',
        collapsed: false,
        items: [
          { text: 'Neue Syntax-Elemente hinzufügen', link: '/guide/custom-syntax' },
          { text: 'Integrierte Standard-Elemente', link: '/guide/default-syntax' },
          { text: 'Container Nesting (autoNesting)', link: '/guide/nesting' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/birchville-org/markdown-it-extensible' }
    ],
    
    search: {
      provider: 'local'
    }
  }
})
