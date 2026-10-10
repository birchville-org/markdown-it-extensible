# Integrierte Standard-Elemente

Auch ohne Konfiguration liefert `markdown-it-extensible` eine Reihe an nützlichen Standardelementen für wissenschaftliche Arbeiten mit.

## Standard Block-Container

Folgende Block-Container sind out-of-the-box verfügbar (Auszug):
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

## Scholarly & Typografie Features

### Sanskrit Devanagari

Sanskrit-Begriffe können semantisch sauber (inkl. Sprachattributen für Screenreader und `translate="no"`) gezeichnet werden:

```markdown
Die Lehre des 《धर्मः》 ist zentral.
Oder mit Doppeldanda: 《धर्मः ||》
```

HTML-Ausgabe:
```html
<span class="sanskrit-dev" translate="no" lang="sa">धर्मः</span>
<span class="sanskrit-dev" translate="no" lang="sa">धर्मः ॥</span>
```

### Innerhalb von Tabellen (Line Breaks & Einrückungen)

In Markdown sind Zeilenumbrüche innerhalb von Tabellenzellen oftmals problematisch. Das Plugin bietet hier dedizierte Inlines:

- `:br` erzeugt ein echtes `<br>` Tag innerhalb einer Tabellenzelle.
- `:indent` erzeugt einen Einrückungs-Abstand.

```markdown
| Begriff | Bedeutung |
| --- | --- |
| Erster Term :br Zweiter Term | Bedeutung 1 :br Bedeutung 2 |
```

### Highlighter

Vordefinierte Hervorhebungen:
- `:sig[Text]` -> `<strong class="signalrot">Text</strong>`
- `:mark[Text]` -> `<mark class="marker-yellow">Text</mark>`
