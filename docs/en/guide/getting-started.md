# Installation & Setup

## Installation

Install the plugin via npm:

```bash
npm install markdown-it-extensible
```

## Usage in Node.js

Register the plugin with your `markdown-it` instance:

```javascript
const MarkdownIt = require('markdown-it');
const extensiblePlugin = require('markdown-it-extensible');

const md = new MarkdownIt({ html: true }).use(extensiblePlugin);

const html = md.render(`
::: grammar-box [Title]
Content
:::
`);
```

## Usage in VitePress

To use the plugin in VitePress, add it to `.vitepress/config.mjs` (or `.ts`):

```javascript
import { defineConfig } from 'vitepress'
import extensiblePlugin from 'markdown-it-extensible'

export default defineConfig({
  markdown: {
    config: (md) => {
      // Optional: disable default CSS injection if supplying custom styles
      md.use(extensiblePlugin, { injectStyles: false })
    }
  }
})
```

## Including CSS

The plugin generates semantic HTML elements with designated CSS classes. For visual design, you can choose between two workflows:

### 1. Using the Built-in Default Theme
The package includes a comprehensive stylesheet (`payer-theme.css`) for all standard elements (such as `grammar-box`, `note-box`, `:sig[...]`, `:mark[...]`, Sanskrit typography, etc.):

```javascript
// In VitePress (.vitepress/theme/index.mjs or index.js)
import DefaultTheme from 'vitepress/theme'
import 'markdown-it-extensible/css'

export default { extends: DefaultTheme }
```

In standard web applications, import it directly via CSS:
```css
@import "markdown-it-extensible/css";
```

### 2. Styling Custom Classes
When creating custom container or directive names (or overriding standard styles), declare them in your own stylesheet (e.g., `.vitepress/theme/style.css`).

For full styling templates and placement instructions, see [Adding & Customizing Syntax Elements](/en/guide/custom-syntax#css-styling--file-placement).

