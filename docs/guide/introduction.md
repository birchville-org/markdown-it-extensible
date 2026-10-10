# Einführung in markdown-it-extensible

`markdown-it-extensible` ist ein leistungsstarkes Plugin für den `markdown-it` Parser, das es ermöglicht, eigene Markdown-Syntax (Block-Container und Inline-Direktiven) komplett ohne das Schreiben von JavaScript-Code (Zero-Code) zu erweitern. 

Es wurde speziell für komplexe und wissenschaftliche Publikationsworkflows ("Scholarly Synthesis") entwickelt, in denen Markdown als Single-Source-of-Truth fungiert.

## Warum dieses Plugin?

Standardmässig erfordert das Hinzufügen eigener Markdown-Syntax in `markdown-it` das Schreiben komplexer Regulärer Ausdrücke und Tokenizer-Logik. Dieses Plugin kapselt diese Komplexität.

**Architektonische Vorteile:**
1. **Single Source of Truth:** Die Syntax-Logik liegt in diesem Plugin und kann plattformübergreifend geteilt werden (VitePress, Node.js Scripte, VS Code Erweiterungen).
2. **Zero-Code Konfiguration:** Konfigurieren Sie einfach über eine `markdown-it-extensible.json` Datei im Stammverzeichnis oder übergeben Sie ein Array in JavaScript.
3. **Scholarly Features:** Integrierte Typografie-Werkzeuge wie Sanskrit-Auszeichnung (`《...》`) und sichere Tabellenumbrüche (`:br`).
4. **Nesting-Sicherheit:** Das integrierte `autoNesting` korrigiert automatisch Verschachtelungsprobleme von Containern (`::::` innerhalb `:::`).

## Abgrenzung

Während Tools wie VitePress bereits eigene Container mitbringen, sind diese oft an das VitePress-Ecosystem gebunden. `markdown-it-extensible` bietet eine framework-unabhängige, programmatisch auslesbare Engine (inkl. Syntax-Hilfe-Export via `getSyntaxHelp()`), die sich ideal für Custom-Editoren und QA-Viewer eignet.
