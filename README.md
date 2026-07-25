# markdown-it-extensible (v1.1.0)

A highly extensible container and inline syntax engine for `markdown-it`. 
Configure custom markdown blocks, warnings, or inline highlights purely via JSON configuration or options – without writing complex Regex parsers or editing JavaScript code.

---

## Installation

```bash
npm install markdown-it-extensible
```

---

## Configuration & Basic Usage

```javascript
const md = require('markdown-it')();
const extensiblePlugin = require('markdown-it-extensible');

md.use(extensiblePlugin, {
  // 1. Configurable Block Containers (:::name[Title])
  blockContainers: [
    { name: 'grammar-box', className: 'grammar-box' },
    { name: 'important', className: 'important' },
    { name: 'note-box', className: 'note-box' },
    { name: 'custom-warning', className: 'alert-red' }
  ],

  // 2. Configurable Inline Directives (:<name>[Content])
  inlineDirectives: [
    { name: 'sig', className: 'signalrot', tag: 'strong' },        // :sig[Red text]
    { name: 'mark', className: 'marker-yellow', tag: 'mark' },     // :mark[Yellow text]
    { name: 'badge', className: 'inline-badge', tag: 'span' }      // :badge[Custom badge]
  ]
});
```

---

## Creating, Customizing & Removing Syntax Elements

### 1. How to Create a New Inline Syntax Element (`:<name>[<content>]`)

- **Option A (Via Configuration):** Add an entry to the `inlineDirectives` array:
  ```javascript
  { name: 'highlight', className: 'marker-green', tag: 'mark' }
  ```
  Writing `:highlight[Text]` in Markdown now renders `<mark class="marker-green">Text</mark>`.

- **Option B (Zero-Code CSS Fallback):**  
  Simply write `:my-style[Text]` directly in your Markdown document. `markdown-it-extensible` automatically outputs `<span class="my-style">Text</span>`. You can introduce new inline elements purely by defining `.my-style` in your CSS!

### 2. How to Create a New Block Container (`:::<name>[Title]`)

Add an entry to `blockContainers`:
```javascript
{ name: 'alert-box', className: 'alert-box-style' }
```
Writing `::: alert-box[Warning Title]` renders:
```html
<div class="alert-box-style custom-block">
  <div class="md-box__title">Warning Title</div>
  ...
</div>
```

### 3. How to Remove or Override Existing Syntax Elements

Pass your own custom arrays for `blockContainers` or `inlineDirectives` when initializing the plugin. Only the elements explicitly listed in your configuration array will be enabled, giving you full control to remove unwanted syntax elements or rename CSS classes.

### 4. Integration of SVG Graphics and Icons

There are two recommended methods for integrating SVG graphics into `markdown-it-extensible` and custom themes/extensions:

#### Option A: Decorative Container Icons via CSS Data-URL (`::before` / `::after`)
Ideal for attaching automatic icons to container boxes (such as the traffic sign icon in `::: important`):

```css
/* Automatically display icon on the left of the Important box */
.custom-block.important {
  position: relative;
  padding-left: 4.5rem !important;
}

.custom-block.important::before {
  content: "" !important;
  position: absolute !important;
  left: 1rem !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  width: 2.8rem !important;
  height: 2.8rem !important;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpolygon points='50,5 95,90 5,90' fill='%23ee2c30' stroke='%23ee2c30' stroke-width='4' stroke-linejoin='round'/%3E%3Cpolygon points='50,18 85,83 15,83' fill='%23ffffff'/%3E%3Cpath d='M50,32 L50,60' stroke='%23231f20' stroke-width='8' stroke-linecap='round'/%3E%3Ccircle cx='50' cy='72' r='5' fill='%23231f20'/%3E%3C/svg%3E") !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
}
```

> **Tips for CSS Data-URLs:**
> 1. Replace hex color code `#` symbols with `%23` (e.g. `fill='%23ee2c30'`).
> 2. Always set explicit `width` and `height` dimensions on pseudo-elements (e.g. `width: 2.8rem; height: 2.8rem;`), as `::before` elements otherwise default to 0×0 pixels.

#### Option B: SVG Files inside Markdown Documents (`::: media`)
For embedding vector illustrations and technical diagrams inside document text:

```markdown
::: media
![Architecture Diagram](./diagrams/architecture.svg)
(Image source: [Details](/licenses))
:::
```

---

## Default Built-in Elements

### Inline Directives
- `:sig[Text]` ➔ `<strong class="signalrot">Text</strong>` (Signal Red)
- `:mark[Text]` ➔ `<mark class="marker-yellow">Text</mark>` (Yellow Highlighter)
- `:br` ➔ `<br>` (Intra-cell line break)
- `:indent` ➔ `<span class="indent-inline"></span>` (Intra-cell indent)
- `《संस्कृतम्》` ➔ `<span class="sanskrit-dev">sanskrit</span>` (Sanskrit)

### Block Containers
- `::: grammar-box`, `::: grammar-box2`, `::: important`, `::: note-box`, `::: media`, `::: center`, `::: metrik-schema`, `::: deleteme-box`, `::: laut-table`, `::: indent`, `::: compact`, `::: no-header`.

---

## VS Code Extension & Ecosystem

This plugin is the shared core engine for:
- **VS Code Extension** (located in [`/vscode-extension`](./vscode-extension))
- **Zentauri Desktop Editor**
- **Payer Web Application**
