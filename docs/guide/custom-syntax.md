# Anwendung & Anpassung neuer Syntax-Elemente

Das Plugin unterstützt das Hinzufügen von individuellen **Block-Containern** und **Inline-Direktiven** auf zwei Wegen: per Konfigurationsdatei oder direkt per JavaScript-Code.

## Methode 1: JSON-Konfiguration (Zero Code)

Erstellen Sie im Root-Verzeichnis Ihres Projekts eine Datei namens `markdown-it-extensible.json`. Das Plugin liest diese Datei bei der Initialisierung automatisch ein.

```json
{
  "blockContainers": [
    { "name": "custom-card", "className": "custom-card-wrapper" },
    { "name": "danger-box", "className": "alert alert-danger" }
  ],
  "inlineDirectives": [
    { "name": "warning", "className": "text-red-500", "tag": "strong" },
    { "name": "badge", "className": "pill-badge", "tag": "span" }
  ]
}
```

## Methode 2: JavaScript Konfiguration

Alternativ können Sie die Konfiguration auch per Code-Optionen beim Laden des Plugins übergeben:

```javascript
md.use(extensiblePlugin, {
  blockContainers: [
    { name: 'custom-card', className: 'custom-card-wrapper' }
  ],
  inlineDirectives: [
    { name: 'warning', className: 'text-red-500', tag: 'strong' }
  ]
});
```

---

## Eigene Block-Container anwenden

Mit der obigen Konfiguration können Sie im Markdown nun sofort folgende Syntax nutzen:

```markdown
::: custom-card [Optionaler Titel]
Hier steht der Inhalt der Custom Card.
:::
```

Dies wird gerendert als:

```html
<div class="custom-card-wrapper custom-block">
  <div class="md-box__title">Optionaler Titel</div>
  <p>Hier steht der Inhalt der Custom Card.</p>
</div>
```

**Wichtige Hinweise für Block-Container:**
- Die Zuweisung des Triggers (`::: name`) ist standardmässig **Case-Insensitive** (`::: CUSTOM-CARD` funktioniert ebenfalls).
- Leere Titel (`::: custom-card []`) unterdrücken das Generieren des `.md-box__title` Elements.

---

## Eigene Inline-Direktiven anwenden

Ihre konfigurierten Inline-Direktiven werden mit einem Doppelpunkt eingeleitet:

```markdown
Das ist ein :warning[sehr wichtiger Text] in der Dokumentation.
```

Dies wird gerendert als:

```html
Das ist ein <strong class="text-red-500">sehr wichtiger Text</strong> in der Dokumentation.
```

**Zero-Code CSS-Fallback:**  
Sie müssen Inline-Elemente nicht zwingend via JSON oder JS deklarieren! Wenn Sie eine Direktive nutzen, die *nicht* konfiguriert ist, verhält sich das Plugin als Fallback:

```markdown
:jede-css-klasse[Inhalt]
```
Wird automatisch zu:
```html
<span class="jede-css-klasse">Inhalt</span>
```

Dies bedeutet, dass reine Design-Teams eigene Klassen ins CSS aufnehmen können und diese sofort als Inline-Elemente im Markdown nutzen können, ohne die Entwickler zu kontaktieren.

---

## CSS-Gestaltung & Ablageort

`markdown-it-extensible` erzeugt semantisches HTML mit den von Ihnen deklarierten Klassen. Die visuelle Gestaltung (Farben, Rahmen, Abstände) definieren Sie in Ihrem CSS.

### 1. Wo wird das CSS hingeschrieben?

Je nach Umgebung wird die CSS-Datei an folgender Stelle abgelegt bzw. eingebunden:

#### In VitePress
In einem VitePress-Projekt werden benutzerdefinierte Styles typischerweise in `.vitepress/theme/style.css` hinterlegt und in der Theme-Einstiegsdatei geladen:

```javascript
// .vitepress/theme/index.mjs (oder index.js)
import DefaultTheme from 'vitepress/theme'
import 'markdown-it-extensible/css' // Optional: Standard-Styles des Plugins
import './style.css'                // Ihre eigenen Klassen

export default {
  extends: DefaultTheme
}
```

#### In Web-Applikationen (Vite, Webpack, Next.js, HTML)
- **Moderne Bundler (Vite, Next.js, React/Vue):** In der globalen CSS-Datei Ihres Projekts (z. B. `src/styles.css` oder `app/globals.css`), die in der Haupt-App importiert wird.
- **Klassische HTML-Seiten:** In einer separaten CSS-Datei, die im `<head>` verlinkt ist:
  ```html
  <link rel="stylesheet" href="/css/custom-markdown.css">
  ```

#### In VS Code (Markdown-Vorschau)
Wenn Sie die VS Code Erweiterung oder die native Markdown-Vorschau nutzen und Ihre Klassen dort visuell testen möchten, können Sie die CSS-Datei in Ihrer Workspace-Konfiguration `.vscode/settings.json` angeben:

```json
{
  "markdown.styles": [
    "./theme/custom-styles.css"
  ]
}
```

---

### 2. Wie werden die Klassen gestaltet? (Praxisbeispiele)

#### Block-Container gestalten
Jeder Block-Container generiert die CSS-Klasse `.custom-block` plus Ihre konfigurierte `className`. Wenn ein Titel übergeben wurde (`::: name [Titel]`), erhält dieser die Klasse `.md-box__title`.

```css
/* Basis-Container (Light Mode) */
.custom-card-wrapper {
  background-color: #f8fafc;
  border-left: 4px solid #3b82f6; /* Blauer Akzentrand */
  border-radius: 0 8px 8px 0;
  padding: 1.25rem;
  margin: 1.5rem 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

/* Titel-Zeile */
.custom-card-wrapper .md-box__title {
  font-weight: 700;
  font-size: 1.05rem;
  color: #1e40af;
  margin-bottom: 0.5rem;
}

/* Fließtext innerhalb der Box */
.custom-card-wrapper p {
  margin: 0;
  line-height: 1.6;
}

/* Dark Mode Unterstützung */
.dark .custom-card-wrapper {
  background-color: #1e293b;
  border-left-color: #60a5fa;
  color: #f1f5f9;
}

.dark .custom-card-wrapper .md-box__title {
  color: #93c5fd;
}
```

#### Inline-Direktiven gestalten
Inline-Direktiven werden direkt auf das gewünschte HTML-Element angewendet (`<span>`, `<strong>`, `<mark>` etc.):

```css
/* 1. Pill-Badge (:badge[Neu]) */
.pill-badge {
  display: inline-block;
  background-color: #e0e7ff;
  color: #3730a3;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.15rem 0.55rem;
  border-radius: 9999px;
  vertical-align: middle;
  line-height: 1.2;
}

/* 2. Warning-Hervorhebung (:warning[Achtung]) */
.text-red-500 {
  color: #ef4444;
  font-weight: 700;
}

/* 3. Beliebige Fallback-Klasse (:info-chip[Hinweis]) */
.info-chip {
  background-color: #e2e8f0;
  color: #1e293b;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  font-size: 0.85em;
}
```

