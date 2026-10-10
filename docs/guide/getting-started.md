# Installation & Setup

## Installation

Installieren Sie das Plugin über NPM:

```bash
npm install markdown-it-extensible
```

## Nutzung in Node.js

Binden Sie das Plugin in Ihre `markdown-it` Instanz ein:

```javascript
const MarkdownIt = require('markdown-it');
const extensiblePlugin = require('markdown-it-extensible');

const md = new MarkdownIt({ html: true }).use(extensiblePlugin);

const html = md.render(`
::: grammar-box [Titel]
Inhalt
:::
`);
```

## Nutzung in VitePress

Um das Plugin in VitePress zu nutzen, fügen Sie es in der `.vitepress/config.mjs` (oder `.ts`) hinzu:

```javascript
import { defineConfig } from 'vitepress'
import extensiblePlugin from 'markdown-it-extensible'

export default defineConfig({
  markdown: {
    config: (md) => {
      // Optional: Standard-CSS-Injektion deaktivieren, wenn Sie eigene Styles injizieren
      md.use(extensiblePlugin, { injectStyles: false })
    }
  }
})
```

## CSS einbinden

Das Plugin erzeugt semantische HTML-Elemente mit CSS-Klassen. Für das visuelle Design stehen Ihnen zwei Wege offen:

### 1. Integriertes Standard-Theme nutzen
Das Paket liefert ein vollständiges Stylesheet (`payer-theme.css`) für alle Standard-Elemente (wie `grammar-box`, `note-box`, `:sig[...]`, `:mark[...]`, Sanskrit-Auszeichnung etc.) mit:

```javascript
// In VitePress (.vitepress/theme/index.mjs oder index.js)
import DefaultTheme from 'vitepress/theme'
import 'markdown-it-extensible/css'

export default { extends: DefaultTheme }
```

In regulären Web-Apps können Sie die Datei direkt per CSS importieren:
```css
@import "markdown-it-extensible/css";
```

### 2. Eigene Klassen gestalten
Wenn Sie eigene Container- oder Directive-Namen vergeben (oder die Standardklassen überschreiben möchten), legen Sie diese in Ihrer eigenen CSS-Datei ab (z. B. `.vitepress/theme/style.css`).

Konkrete Vorlagen und Best Practices finden Sie im Kapitel [Anwendung & Anpassung neuer Syntax-Elemente](/guide/custom-syntax#css-gestaltung--ablageort).

