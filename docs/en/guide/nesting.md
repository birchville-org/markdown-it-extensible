# Container Nesting (autoNesting)

## The CommonMark Challenge

In standard Markdown (`markdown-it-container`), an opening container (`:::`) closes at the first closing fence with at least as many colons. When nesting containers with the same fence level, this causes premature closures:

```markdown
::: note-box
Outer text.
::: grammar-box
Inner box content
:::
This was intended to be inside note-box, but the container was already closed!
:::
```

## The Solution

`markdown-it-extensible` includes `autoNesting`, which runs as a pre-parse rule. It scans the source text **before** rendering and automatically normalizes the colon fence depth.

The snippet above is normalized automatically and transparently to:

```markdown
:::: note-box
Outer text.
::: grammar-box
Inner box content
:::
This was intended to be inside note-box, but the container was already closed!
::::
```

## Disabling & Configuration

`autoNesting` is enabled by default. If you wish to disable it for performance or compatibility reasons, configure options:

```javascript
md.use(extensiblePlugin, { autoNesting: false });
```

To automatically append missing closing fences at the end of the document:

```javascript
md.use(extensiblePlugin, { 
  autoNesting: { closeUnclosed: true } 
});
```
