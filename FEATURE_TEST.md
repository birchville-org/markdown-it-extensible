# Feature Test Suite — markdown-it-extensible (v1.1.0)

Dieses Dokument enthält Testbeispiele für alle unterstützten Block-Container, Inline-Direktiven, Scholarly Sanskrit Syntaxen, Tabellen und SVG-Grafiken zum visuellen Testen in VS Code oder Zentauri.

---

## 1. Inline-Direktiven & Hervorhebungen

- **Signalrot (Red Highlight):** Dies ist :sig[signalroter Text] mitten im Satz.
- **Gelber Leuchtstift (Marker):** Dies ist :mark[gelb hervorgehobener Text] für wichtige Passagen.
- **Sanskrit-Formatierung:**
  - Einfaches Sanskrit: 《धर्मः》
  - Sanskrit mit Einfach-Danda: 《धर्मः |》
  - Sanskrit mit Doppel-Danda: 《धर्मः ||》
- **Intra-Zellen Umbruch & Einzug (Tabellen-exklusiv):** In normalen Absätzen bleiben `:br` und `:indent` unberührt als Fließtext stehen. Sie werden exklusiv innerhalb von Tabellenzellen ausgewertet.
- **Zero-Code Custom Inline Directive:** Dies ist ein :custom-tag[benutzerdefiniertes Tag] ohne JS-Code.

---

## 2. Block-Container (`::: name [Titel]`)

### Important Box (Violett mit Verkehrszeichen-SVG)
::: important [Wichtiger Hinweis]
**Achtung:** Diese Box besitzt einen violetten linken Rand, ein Verkehrsschild-Warnsymbol auf der linken Seite und ein schimmerndes Violett als Hintergrund.
:::

### Grammar Box (Gelb / Gold)
::: grammar-box [Grammatik-Regel]
Dies ist eine Standard-Grammatikbox für Regeln, Paradigmen und Lautgesetze.
:::

### Advanced Grammar Box (Orange)
::: grammar-box2 [Fortgeschrittene Grammatik]
Dies ist eine Grammatikbox2 mit kräftigem orangefarbenem Akzent für vertiefende Regeln.
:::

### Didactic Note Box (Diskretes Grau)
::: note-box
Dies ist eine Anmerkungs-Box für didaktische Hinweise, Fußnoten und Querverweise.
:::

### Centered Content Block (Zentrierter Text)
::: center
***ॐ***
Dharmo rakṣati rakṣitaḥ
:::

### Media Container (Bilder & SVGs)
::: media
![Payer Beispielsabbildung](./vscode-extension/media/lekt1001.jpg)
(Bildquelle: [Details](/licenses#lekt1001))
:::

---

## 3. Tabellen & Zellen-Zusammenfassung (MultiMarkdown)

### Tabelle mit In-Zellen Umbrüchen & Signalrot
| Kasus | Singular | Plural |
| --- | --- | --- |
| Nominativ | :sig[devaḥ] :br :indent (Maskulinum) | :sig[devāḥ] |
| Akkusativ | :sig[devam] | :sig[devān] |

### Tabellen-Zellen zusammenführen (Colspan & Rowspan)
::: compact
| Header 1 | Header 2 | Header 3 |
| --- | --- | --- |
| Verbindung über 3 Spalten (Colspan) |||
| Vertikale Verbindung (Rowspan) | Spalte B | Spalte C |
| ^^ | Spalte B2 | Spalte C2 |
:::

### Tabelle ohne leere Kopfzeile (`::: no-header`)
::: no-header
| Col 1 | Col 2 |
| --- | --- |
| Versteckter Header | Kein leerer Freiraum oben |
| Datenzelle 1 | Datenzelle 2 |
:::

---

## 4. Neues Container Element (Gaga-Box)

::: gaga-box [Optionaler Titel]
Dies ist das neue Container Element mit rotem Hintergrund und gelber Schrift.
Die Box ist linksseitig eingerückt.
:::

---

## 5. Verschachtelte Container (Mehrere Doppelpunkte)

:::: grammar-box [Verschachtelte Struktur]
Hier ist der äußere Grammatik-Block mit 4 Doppelpunkten (`:::: grammar-box`).

::: note-box
Dies ist ein innerer Note-Box Block mit 3 Doppelpunkten (`::: note-box`).
:::

::::
