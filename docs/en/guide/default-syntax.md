# Built-in Default Elements

Even without custom configuration, `markdown-it-extensible` ships with a comprehensive set of default elements designed for scholarly and structured work.

## Default Block Containers

The following block containers are available out of the box:
- `grammar-box` & `grammar-box2`
- `media`
- `center`
- `metrik-schema`
- `important`
- `literatur-box`
- `note-box`
- `laut-table`
- `indent` / `compact`
- `no-header`

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

