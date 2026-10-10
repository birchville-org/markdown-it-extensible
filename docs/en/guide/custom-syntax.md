# Adding & Customizing Syntax Elements

The plugin supports adding custom **block containers** and **inline directives** in two ways: via a configuration file or directly via JavaScript options.

## Method 1: JSON Configuration (Zero Code)

Create a file named `markdown-it-extensible.json` in your project root. The plugin reads this file automatically upon initialization.

```json
{
  "blockContainers": [
    { "name": "custom-card", "className": "custom-card-wrapper" },
    { "name": "danger-box", "className": "alert alert-danger" }
  ],
  "inlineDirectives": [
    { "name": "warning", "className": "text-red-500", "tag": "strong" },
    { "name": "badge", "className": "pill-badge", "tag": "span" }
  ]
}
```

## Method 2: JavaScript Options

Alternatively, you can pass options when registering the plugin in code:

```javascript
md.use(extensiblePlugin, {
  blockContainers: [
    { name: 'custom-card', className: 'custom-card-wrapper' }
  ],
  inlineDirectives: [
    { name: 'warning', className: 'text-red-500', tag: 'strong' }
  ]
});
```

---

## Using Custom Block Containers

With the above configuration, you can immediately use this syntax in Markdown:

```markdown
::: custom-card [Optional Title]
Content of the custom card goes here.
:::
```

This renders to:

```html
<div class="custom-card-wrapper custom-block">
  <div class="md-box__title">Optional Title</div>
  <p>Content of the custom card goes here.</p>
</div>
```

**Important Notes for Block Containers:**
- Trigger matching (`::: name`) is **case-insensitive** by default (`::: CUSTOM-CARD` also works).
- Empty brackets (`::: custom-card []`) suppress title generation (no `.md-box__title` element).

---

## Using Custom Inline Directives

Configured inline directives are prefixed with a single colon:

```markdown
This is a :warning[critical notice] in the documentation.
```

This renders to:

```html
This is a <strong class="text-red-500">critical notice</strong> in the documentation.
```

**Zero-Code CSS Fallback:**  
You do not strictly need to register inline directives in JSON or JS! If you use an inline directive that has *not* been pre-configured, the plugin provides an automatic fallback:

```markdown
:any-css-class[Content]
```
Automatically renders as:
```html
<span class="any-css-class">Content</span>
```

This allows design teams to introduce CSS utility classes and immediately use them in Markdown without contacting backend or plugin developers.

---

## CSS Styling & File Placement

`markdown-it-extensible` produces semantic HTML using the classes you define. The visual styling (colors, borders, spacing) is configured in your CSS.

### 1. Where do I put my CSS?

Depending on your environment, place and load your CSS file as follows:

#### In VitePress
In a VitePress project, custom styles are typically stored in `.vitepress/theme/style.css` and imported in the theme entrypoint:

```javascript
// .vitepress/theme/index.mjs (or index.js)
import DefaultTheme from 'vitepress/theme'
import 'markdown-it-extensible/css' // Optional: default styles from plugin
import './style.css'                // Your custom classes

export default {
  extends: DefaultTheme
}
```

#### In Web Applications (Vite, Webpack, Next.js, HTML)
- **Modern Bundlers (Vite, Next.js, React/Vue):** In your project's global stylesheet (e.g., `src/styles.css` or `app/globals.css`), imported in your main app entrypoint.
- **Traditional HTML pages:** In a stylesheet linked inside `<head>`:
  ```html
  <link rel="stylesheet" href="/css/custom-markdown.css">
  ```

#### In VS Code (Markdown Preview)
If you use the bundled VS Code extension or native Markdown preview and want your custom classes to render visually in the editor, declare your CSS file in `.vscode/settings.json`:

```json
{
  "markdown.styles": [
    "./theme/custom-styles.css"
  ]
}
```

---

### 2. How to style classes? (Practical Examples)

#### Styling Block Containers
Every block container generates the CSS class `.custom-block` plus your configured `className`. If a title was passed (`::: name [Title]`), it receives the class `.md-box__title`.

```css
/* Base Container (Light Mode) */
.custom-card-wrapper {
  background-color: #f8fafc;
  border-left: 4px solid #3b82f6; /* Blue accent border */
  border-radius: 0 8px 8px 0;
  padding: 1.25rem;
  margin: 1.5rem 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

/* Title Header */
.custom-card-wrapper .md-box__title {
  font-weight: 700;
  font-size: 1.05rem;
  color: #1e40af;
  margin-bottom: 0.5rem;
}

/* Body Text Inside Container */
.custom-card-wrapper p {
  margin: 0;
  line-height: 1.6;
}

/* Dark Mode Support */
.dark .custom-card-wrapper {
  background-color: #1e293b;
  border-left-color: #60a5fa;
  color: #f1f5f9;
}

.dark .custom-card-wrapper .md-box__title {
  color: #93c5fd;
}
```

#### Styling Inline Directives
Inline directives are applied directly to the desired HTML element (`<span>`, `<strong>`, `<mark>` etc.):

```css
/* 1. Pill Badge (:badge[New]) */
.pill-badge {
  display: inline-block;
  background-color: #e0e7ff;
  color: #3730a3;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.15rem 0.55rem;
  border-radius: 9999px;
  vertical-align: middle;
  line-height: 1.2;
}

/* 2. Warning Highlight (:warning[Notice]) */
.text-red-500 {
  color: #ef4444;
  font-weight: 700;
}

/* 3. Custom Zero-Code Fallback Class (:info-chip[Tip]) */
.info-chip {
  background-color: #e2e8f0;
  color: #1e293b;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  font-size: 0.85em;
}
```

