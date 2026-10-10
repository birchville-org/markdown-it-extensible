# Container Nesting (autoNesting)

## Das CommonMark Problem

In klassischem Markdown (`markdown-it-container`) schliesst eine öffnende Container-Deklaration (`:::`) beim ersten schliessenden Element, das mindestens so viele Doppelpunkte hat. Dies führt zu folgendem Problem, wenn man innere Container nutzt:

```markdown
::: note-box
Ein Text.
::: grammar-box
Inhalt der inneren Box
:::
Hier sollte eigentlich noch Text in der Note-Box sein, aber sie wurde bereits geschlossen!
:::
```

## Die Lösung

`markdown-it-extensible` hat ein Feature namens `autoNesting`, welches als Pre-Parse-Regel greift. Es durchläuft den Quelltext **vor** dem Rendering und normalisiert die Schachtelungstiefe der Doppelpunkte automatisch.

Das obige Markdown wird automatisch und unsichtbar umgeschrieben zu:

```markdown
:::: note-box
Ein Text.
::: grammar-box
Inhalt der inneren Box
:::
Hier sollte eigentlich noch Text in der Note-Box sein, aber sie wurde bereits geschlossen!
::::
```

## Deaktivierung & Konfiguration

`autoNesting` ist standardmässig aktiviert. Wenn Sie es aus Performance- oder Kompatibilitätsgründen abschalten möchten, übergeben Sie dies in den Optionen:

```javascript
md.use(extensiblePlugin, { autoNesting: false });
```

Wenn Sie möchten, dass der Algorithmus automatisch fehlende schliessende Elemente am Ende des Dokuments ergänzt:

```javascript
md.use(extensiblePlugin, { 
  autoNesting: { closeUnclosed: true } 
});
```
