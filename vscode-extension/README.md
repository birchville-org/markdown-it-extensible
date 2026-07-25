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

### 4. Integration von SVG-Grafiken und Icons

Es gibt zwei bewährte Wege, um SVG-Grafiken in die VS Code Markdown-Vorschau einzubinden:

#### Option A: Automatic Box Icons via CSS Data-URL (`::before` / `::after`)
Ideal für automatische Icons an Boxen (z. B. das Verkehrsschild-Warnsymbol in `::: important`):

```css
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

> **Wichtiger Tipp für Data-URLs:**
> - Ersetze `#` im SVG durch `%23` (`fill='%23ee2c30'`).
> - Setze explizite Abmessungen `width` und `height` auf dem Pseudoelement (`width: 2.8rem; height: 2.8rem;`).

#### Option B: SVG-Dateien im Markdown-Dokument (`::: media`)
Für Abbildungen und Vektordiagramme direkt im Dokument:

```markdown
::: media
![Systemarchitektur](./diagrams/architecture.svg)
(Bildquelle: [Details](/licenses))
:::
```

---
*Gebaut gemäß den Projektregeln "The Scholarly Synthesis".*
