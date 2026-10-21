# Built-in Default Elements

Even without custom configuration, `markdown-it-extensible` ships with a comprehensive set of default elements designed for scholarly and structured work.

## Default Block Containers

The following block containers are available out of the box:

### Consolidated Core Minimal-Set (v2)
- `grammar-box`: Normative grammar rules, phonetic laws, and inflection paradigms.
- `warning-box`: Didactic warnings, language interference, and translation pitfalls.
- `verse-box`: Ślokas, mantras, sacred reading texts, and poetic meters.
- `note-box`: Scholarly notes, cultural background, sources, and literature references.
- `indent`: Structured indentation for citations, forms, and sub-derivations.
- `media`: Unified wrapper for images, captions, and licensing credits.
- `no-header`: Utility container to hide the table header (`thead`) for purely tabular data.

### Graceful Aliasing for Legacy Containers (Backwards Compatibility)
- `important` → renders as `warning-box`
- `literatur-box` / `literatur` → renders as `note-box`
- `compact` → renders as `verse-box`
- `metrik-schema`, `center`, `laut-table`, `deleteme-box` (legacy containers remain functional)

## Scholarly & Typography Features

### Sanskrit Devanagari

Sanskrit terms are marked semantically clean with appropriate language attributes and `translate="no"` for screen readers and search engines:

```markdown
The doctrine of 《धर्मः》 is central.
Or with double danda: 《धर्मः ||》
```

HTML output:
```html
<span class="sanskrit-dev" translate="no" lang="sa">धर्मः</span>
<span class="sanskrit-dev" translate="no" lang="sa">धर्मः ॥</span>
```

### Intra-Table Utilities (Line Breaks & Indentation)

In standard Markdown, line breaks inside table cells can be tricky. This plugin provides dedicated inline directives:

- `:br` renders a real `<br>` tag inside table cells.
- `:indent` renders indentation spacing.

```markdown
| Term | Meaning |
| --- | --- |
| First term :br Second term | Meaning 1 :br Meaning 2 |
```

### Highlighters

Predefined highlights:
- `:sig[Text]` -> `<strong class="signalrot">Text</strong>`
- `:mark[Text]` -> `<mark class="marker-yellow">Text</mark>`

---

## Styling Built-in Elements

All default containers and inline elements documented above come with predefined CSS classes (e.g., `.grammar-box`, `.note-box`, `.signalrot`, `.marker-yellow`, `.sanskrit-dev`).

These classes are pre-styled for both light and dark mode in the bundled stylesheet `markdown-it-extensible/css` (`theme/payer-theme.css`). You can import them directly via `import 'markdown-it-extensible/css'` or override them in your custom stylesheet as desired.

