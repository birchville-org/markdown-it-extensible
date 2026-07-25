const test = require('node:test');
const assert = require('node:assert/strict');

// Require markdown-it from zentauri or vscode-extension node_modules
let MarkdownIt;
try {
  MarkdownIt = require('../../zentauri/node_modules/markdown-it');
} catch (e1) {
  try {
    MarkdownIt = require('../zentauri/node_modules/markdown-it');
  } catch (e2) {
    MarkdownIt = require('markdown-it');
  }
}

const extensiblePlugin = require('../index.js');

test('1. Feature Tests: Standard Syntax Elements', async (t) => {
  const md = new MarkdownIt({ html: true }).use(extensiblePlugin);

  await t.test('1.1 Signalrot inline directive', () => {
    const html = md.render(':sig[Signalrot Text]');
    assert.match(html, /<strong class="signalrot">Signalrot Text<\/strong>/);
  });

  await t.test('1.2 Marker yellow inline directive', () => {
    const html = md.render(':mark[Yellow Highlight]');
    assert.match(html, /<mark class="marker-yellow">Yellow Highlight<\/mark>/);
  });

  await t.test('1.3 Table line break :br', () => {
    const html = md.render(':br');
    assert.match(html, /<br>/);
  });

  await t.test('1.4 Table indent :indent', () => {
    const html = md.render(':indent');
    assert.match(html, /<span class="indent-inline"><\/span>/);
  });

  await t.test('1.5 Sanskrit brackets', () => {
    const html = md.render('《धर्मः》');
    assert.match(html, /<span class="sanskrit-dev" translate="no" lang="sa">धर्मः<\/span>/);
  });

  await t.test('1.6 Sanskrit with double danda', () => {
    const html = md.render('《धर्मः ||》');
    assert.match(html, /<span class="sanskrit-dev" translate="no" lang="sa">धर्मः ॥<\/span>/);
  });

  await t.test('1.7 Important box container', () => {
    const html = md.render('::: important\nAlert text\n:::');
    assert.match(html, /<div class="important custom-block">\n<p>Alert text<\/p>\n<\/div>/);
  });

  await t.test('1.8 Grammar box container with title', () => {
    const html = md.render('::: grammar-box [Grammatik]\nRule text\n:::');
    assert.match(html, /<div class="grammar-box custom-block">\n<div class="md-box__title">Grammatik<\/div>\n<p>Rule text<\/p>\n<\/div>/);
  });
});

test('2. Dynamic Syntax Modification (Addition & Removal)', async (t) => {
  await t.test('2.1 Addition of new block container and inline directive', () => {
    const md = new MarkdownIt({ html: true }).use(extensiblePlugin, {
      blockContainers: [
        { name: 'warning-box', className: 'alert-red' }
      ],
      inlineDirectives: [
        { name: 'badge', className: 'badge-blue', tag: 'span' }
      ]
    });

    const blockHtml = md.render('::: warning-box [Gefahr]\nAchtung!\n:::');
    assert.match(blockHtml, /<div class="alert-red custom-block">\n<div class="md-box__title">Gefahr<\/div>\n<p>Achtung!<\/p>\n<\/div>/);

    const inlineHtml = md.render('Version :badge[v1.1.0]');
    assert.match(inlineHtml, /Version <span class="badge-blue">v1\.1\.0<\/span>/);
  });

  await t.test('2.2 Removal / Overriding of syntax elements', () => {
    // Only note-box enabled
    const md = new MarkdownIt({ html: true }).use(extensiblePlugin, {
      blockContainers: [
        { name: 'note-box', className: 'note-box' }
      ]
    });

    const disabledHtml = md.render('::: grammar-box\nUnparsed text\n:::');
    // Disabled container should NOT render custom-block div
    assert.doesNotMatch(disabledHtml, /<div class="grammar-box custom-block">/);

    const activeHtml = md.render('::: note-box\nActive note\n:::');
    assert.match(activeHtml, /<div class="note-box custom-block">/);
  });
});
