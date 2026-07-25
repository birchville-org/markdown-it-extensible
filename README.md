# markdown-it-extensible (v1.1.0)

A highly extensible container and inline syntax engine for `markdown-it`. 
Configure custom markdown blocks, warnings, or inline highlights purely via JSON configuration or options – without writing complex Regex parsers or editing JavaScript code.

---

## Installation

```bash
npm install markdown-it-extensible
```

---

## Configuration & Usage

```javascript
const md = require('markdown-it')();
const extensiblePlugin = require('markdown-it-extensible');

md.use(extensiblePlugin, {
  // 1. Configurable Block Containers (:::name[Title])
  blockContainers: [
    { name: 'grammar-box', className: 'grammar-box' },
    { name: 'important', className: 'important' },
    { name: 'note-box', className: 'note-box' },
    { name: 'custom-warning', className: 'alert-red' } // <-- Custom block container
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

## Features

### 1. Configurable & Zero-Code Inline Directives (`:<name>[Content]`)
- **Default Directives out-of-the-box:**
  - `:sig[Text]` ➔ `<strong class="signalrot">Text</strong>` (Signal Red)
  - `:mark[Text]` ➔ `<mark class="marker-yellow">Text</mark>` (Yellow Highlighter)
  - `:br` ➔ `<br>` (Intra-cell line break)
  - `:indent` ➔ `<span class="indent-inline"></span>` (Intra-cell indent)
  - `《संस्कृतम्》` ➔ `<span class="sanskrit-dev">संस्कृतम्</span>` (Sanskrit)
- **Zero-Code Automatic Fallback:**  
  Any unregistered directive like `:custom[Text]` is automatically rendered as `<span class="custom">Text</span>`. You can introduce new inline elements purely by styling `.custom` in your CSS!

### 2. Configurable Block Containers (`:::name[Title]`)
- Fully configurable container blocks supporting title headers (`:::grammar-box[Title]`) and nesting.

---

## VS Code Extension & Client Projects

This plugin is the shared core engine for:
- **Zentauri Desktop Editor**
- **Payer Web Application**
- **VS Code Extension** (located in [`/vscode-extension`](./vscode-extension))
