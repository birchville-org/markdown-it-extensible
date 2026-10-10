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
      // Optional: Standard-CSS deaktivieren, wenn Sie eigene Styles injizieren
      md.use(extensiblePlugin, { injectStyles: false })
    }
  }
})
```

Das war's! Die vorkonfigurierten Standardelemente stehen nun zur Verfügung. Im nächsten Kapitel erfahren Sie, wie Sie eigene Elemente hinzufügen.
