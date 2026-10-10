import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "markdown-it-extensible",
  base: "/markdown-it-extensible/", // for github pages

  locales: {
    root: {
      label: 'DE - Deutsch',
      lang: 'de-DE',
      description: "Hochgradig erweiterbare Syntax-Engine für Block-Container und Inline-Direktiven",
      themeConfig: {
        outline: {
          level: [2, 3],
          label: 'Auf dieser Seite'
        },
        langMenuLabel: 'Sprache wechseln',
        returnToTopLabel: 'Zurück nach oben',
        sidebarMenuLabel: 'Menü',
        darkModeSwitchLabel: 'Erscheinungsbild',
        lightModeSwitchTitle: 'Zum hellen Design wechseln',
        darkModeSwitchTitle: 'Zum dunklen Design wechseln',
        docFooter: {
          prev: 'Vorherige Seite',
          next: 'Nächste Seite'
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
        ]
      }
    },
    en: {
      label: 'EN - English',
      lang: 'en-US',
      link: '/en/',
      description: "A highly extensible, zero-code block container and inline directive syntax engine",
      themeConfig: {
        outline: {
          level: [2, 3],
          label: 'On this page'
        },
        langMenuLabel: 'Change language',
        returnToTopLabel: 'Return to top',
        sidebarMenuLabel: 'Menu',
        darkModeSwitchLabel: 'Appearance',
        lightModeSwitchTitle: 'Switch to light theme',
        darkModeSwitchTitle: 'Switch to dark theme',
        docFooter: {
          prev: 'Previous page',
          next: 'Next page'
        },
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Documentation', link: '/en/guide/introduction' }
        ],
        sidebar: [
          {
            text: 'Introduction',
            collapsed: false,
            items: [
              { text: 'What is markdown-it-extensible?', link: '/en/guide/introduction' },
              { text: 'Installation & Setup', link: '/en/guide/getting-started' }
            ]
          },
          {
            text: 'Usage & Syntax',
            collapsed: false,
            items: [
              { text: 'Adding Custom Syntax Elements', link: '/en/guide/custom-syntax' },
              { text: 'Built-in Default Elements', link: '/en/guide/default-syntax' },
              { text: 'Container Nesting (autoNesting)', link: '/en/guide/nesting' }
            ]
          }
        ]
      }
    }
  },

  themeConfig: {
    logo: '/birchville_logo.png',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/birchville-org/markdown-it-extensible' }
    ],

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: 'Suchen',
                buttonAriaLabel: 'Suchen'
              },
              modal: {
                noResultsText: 'Keine Ergebnisse gefunden',
                resetButtonTitle: 'Suche zurücksetzen',
                footer: {
                  selectText: 'zum Auswählen',
                  navigateText: 'zum Navigieren',
                  closeText: 'zum Schließen'
                }
              }
            }
          },
          en: {
            translations: {
              button: {
                buttonText: 'Search',
                buttonAriaLabel: 'Search'
              },
              modal: {
                noResultsText: 'No results found',
                resetButtonTitle: 'Reset search',
                footer: {
                  selectText: 'to select',
                  navigateText: 'to navigate',
                  closeText: 'to close'
                }
              }
            }
          }
        }
      }
    }
  }
})

