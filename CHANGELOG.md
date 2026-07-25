# Changelog — markdown-it-extensible

All notable changes to `markdown-it-extensible` will be documented in this file.

---

## [1.1.0] - 2026-07-25

### Added
- **Dynamic Configurable Inline Directives (`inlineDirectives`):** Introduced full dynamic configuration for inline syntax `:<name>[<content>]`. Pass array definitions in `options.inlineDirectives` to register custom tags and classNames without editing JavaScript parser code.
- **Native Yellow Highlighter (`:mark[...]`):** Added pre-configured `:mark[Text]` directive rendering `<mark class="marker-yellow">Text</mark>`.
- **Zero-Code Inline Fallback:** Any unregistered inline directive `:<name>[Text]` automatically renders `<span class="<name>">Text</span>`, allowing new inline styles to be added purely by writing CSS.

### Changed
- Refactored `index.js` scholarly inline regex to dynamically match any valid `:[a-zA-Z0-9_-]+[...]` directive while preserving backward compatibility with `:sig[...]`, `:br`, `:indent`, and Sanskrit `《...》`.
- Updated `package.json` version to `1.1.0`.
