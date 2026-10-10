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
