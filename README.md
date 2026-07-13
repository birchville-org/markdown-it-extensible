# markdown-it-extensible

A highly extensible container and inline syntax engine for `markdown-it`. 
Configure custom markdown blocks, warnings, or inline highlights purely via JSON configuration – without writing any complex Regex parsers.

## Installation

```bash
npm install markdown-it-extensible
```

## Basic Usage

```javascript
const md = require('markdown-it')();
const extensiblePlugin = require('markdown-it-extensible');

md.use(extensiblePlugin, {
  blockContainers: [
    { name: 'warning-box', className: 'alert-red' }
  ],
  inlineTokens: [
    // Feature coming soon in v1.1
  ]
});
```

*(This repository is currently a Proof of Concept derived from the Payer Sanskritkurs architecture.)*
