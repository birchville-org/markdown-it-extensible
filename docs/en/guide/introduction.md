# Introduction to markdown-it-extensible

`markdown-it-extensible` is a powerful plugin for the `markdown-it` parser that allows developers and authors to extend Markdown syntax with custom block containers and inline directives completely without writing JavaScript code (Zero-Code).

It was designed specifically for complex and scholarly publishing workflows ("Scholarly Synthesis") where Markdown serves as the single source of truth.

## Why this plugin?

By default, adding custom Markdown syntax to `markdown-it` requires writing complex regular expressions and custom tokenizer rules. This plugin encapsulates that complexity.

**Architectural Advantages:**
1. **Single Source of Truth:** The syntax definition lives in this plugin and can be shared cross-platform (VitePress, Node.js scripts, VS Code extensions).
2. **Zero-Code Configuration:** Simply configure via a `markdown-it-extensible.json` file in your project root or pass options in JavaScript.
3. **Scholarly Features:** Built-in typography utilities such as Sanskrit markup (`《...》`) and safe intra-table line breaks (`:br`).
4. **Nesting Safety:** Built-in `autoNesting` automatically normalizes container nesting depth (`::::` inside `:::`), preventing premature container closures in CommonMark.

## Scope & Distinction

While tools like VitePress provide built-in custom containers, they are tightly coupled to the VitePress ecosystem. `markdown-it-extensible` provides a framework-agnostic, programmatically introspectable engine (including syntax help export via `getSyntaxHelp()`) perfectly suited for custom web editors, IDE extensions, and QA viewers.
