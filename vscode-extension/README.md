# Markdown-it Extensible Extension

Eine konfigurierbare VSCode-Erweiterung zur dynamischen Definition und Visualisierung von benutzerdefinierten Markdown-Containern (wie `::: grammar-box` etc.).

## Features

Diese Extension rüstet Visual Studio Code mit nativen Snippets für das Projekt-Markdown aus und ermöglicht es, neue Syntax-Elemente dynamisch über die VSCode-Einstellungen zu definieren.

### Snippets für Markdown-Dateien

Tippe die folgenden Kürzel in eine `.md`-Datei und drücke `Tab`:

- **`sbox`**: Erstellt eine Standard `::: grammar-box` für Regeln und Paradigmen.
- **`sbox4`**: Erstellt eine verschachtelte `:::: grammar-box`, z.B. wenn darin ein weiterer `::: indent` Block platziert wird.
- **`sindent`**: Erstellt einen `::: indent` Block (z.B. für eingerückte Beispiele oder Unter-Vokabulare).
- **`smedia`**: Erstellt einen fertigen `::: media`-Block inklusive Placeholder für Bildpfad und korrekt formatierter Bildquellenangabe.
- **`sdel`**: Erstellt eine `::: deleteme-box` für alte HTML-Metadaten, die später gelöscht werden sollen.
- **`snohead`**: Erstellt einen `::: no-header`-Container, ideal um leere Tabellenköpfe auszublenden.
- **`sred`**: Erstellt ein `sig[...]`-Tag, um Devanāgarī-Schriftzeichen leuchtend rot hervorzuheben, ohne Markdown-Kursivdruck zu missbrauchen.
- **`sbr`**: Setzt einen `<br>`-Ersatz (`:br`) in Tabellenzellen, ohne die Markdown-Tabellenzeile umzubrechen.

## Installation

Diese Extension ist lokal im Repository verlinkt. Um sie in deinem VSCode zu aktivieren:

```bash
# Im Root des Repositories ausführen:
ln -s $(pwd)/vscode-extension ~/.vscode/extensions/markdown-it-extensible-vscode
```
Oder verpacke sie per `vsce package` zu einer `.vsix` Datei.

## Erweiterung

Du kannst eigene neue Syntax-Elemente und Container-Blöcke dynamisch definieren, ohne den Quellcode der Extension verändern zu müssen.

### 1. Eigene Block-Container definieren (VS Code Einstellungen)

Öffne deine VS Code `settings.json` (oder navigiere in den Einstellungen zu `Extensible Markdown Settings`) und füge unter `extensibleMarkdown.blockContainers` neue Container hinzu:

```json
"extensibleMarkdown.blockContainers": [
  {
    "name": "warning-box",
    "className": "alert-warning"
  },
  {
    "name": "info-box",
    "className": "callout-info"
  }
]
```

#### Verwendung im Markdown-Dokument:

```markdown
::: warning-box [Wichtiger Hinweis]
Dies ist eine benutzerdefinierte Warning-Box mit einem Titel.
:::

::: info-box
Hier steht eine Info-Box ohne Titel.
:::
```

#### Rendert zu folgendem HTML:

```html
<div class="alert-warning custom-block">
  <div class="md-box__title">Wichtiger Hinweis</div>
  <p>Dies ist eine benutzerdefinierte Warning-Box mit einem Titel.</p>
</div>
```

### 2. Eigene CSS-Styles definieren (Farben, Ränder & Themes)

Damit der neue Container (z. B. `.alert-warning`) in der VS Code Markdown-Vorschau ansprechend gestaltet wird (Farben, Rahmen, Hintergrund), erstelle oder ergänze eine CSS-Datei:

#### Option A: In VS Code Einstellungen einbinden (`settings.json`)
Füge den Pfad zu deiner eigenen CSS-Datei in die VS Code Markdown-Vorschau-Einstellungen ein:

```json
"markdown.styles": [
  "./styles/custom-preview.css"
]
```

#### Option B: CSS-Regeln schreiben (`custom-preview.css`)

```css
/* Styling für den benutzerdefinierten Container */
.alert-warning {
  background-color: #fffbe6;
  border-left: 4px solid #faad14;
  color: #521c00;
  padding: 12px 16px;
  border-radius: 4px;
  margin: 16px 0;
}

/* Titel-Styling innerhalb der Box */
.alert-warning .md-box__title {
  font-weight: 700;
  color: #d48806;
  margin-bottom: 6px;
  font-size: 0.95em;
  text-transform: uppercase;
}

/* Optional: Unterstützung für VS Code Dark Mode */
.vscode-dark .alert-warning {
  background-color: #2b2111;
  border-left-color: #e6a23c;
  color: #f7d6a5;
}
.vscode-dark .alert-warning .md-box__title {
  color: #f5a06b;
}
```

### 3. Eigene Editor-Snippets hinzufügen

Um neue Schnelltipp-Kürzel (wie `sbox`, `sindent`) im VS Code Editor hinzuzufügen, ergänze einfach die Datei [`snippets/markdown.json`](file:///Volumes/SanDisk1TB/proj/markdown-it-extensible/vscode-extension/snippets/markdown.json):

```json
"Warning Box": {
  "prefix": "swarn",
  "body": [
    "::: warning-box [${1:Titel}]",
    "${0:$TM_SELECTED_TEXT}",
    ":::"
  ],
  "description": "Fügt eine benutzerdefinierte Warning-Box ein"
}
```

---
*Gebaut gemäß den Projektregeln "The Scholarly Synthesis".*
