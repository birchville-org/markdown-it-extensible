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

  await t.test('1.3 Table line break :br (outside vs inside table)', () => {
    const outsideHtml = md.render('Text with :br outside table');
    assert.match(outsideHtml, /Text with :br outside table/);
    assert.doesNotMatch(outsideHtml, /<br>/);

    const insideHtml = md.render('| col |\n|---|\n| cell :br text |');
    assert.match(insideHtml, /<br>/);
  });

  await t.test('1.4 Table indent :indent (outside vs inside table)', () => {
    const outsideHtml = md.render('Text with :indent outside table');
    assert.match(outsideHtml, /Text with :indent outside table/);
    assert.doesNotMatch(outsideHtml, /<span class="indent-inline">/);

    const insideHtml = md.render('| col |\n|---|\n| cell :indent text |');
    assert.match(insideHtml, /<span class="indent-inline"><\/span>/);
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

  await t.test('1.9 Grammar box variations (spaces & hyphens)', () => {
    const withSpace = md.render('::: grammar-box\nContent\n:::');
    assert.match(withSpace, /<div class="grammar-box custom-block">/);

    const noSpace = md.render(':::grammar-box\nContent\n:::');
    assert.match(noSpace, /<div class="grammar-box custom-block">/);

    const multiSpace = md.render(':::   grammar-box\nContent\n:::');
    assert.match(multiSpace, /<div class="grammar-box custom-block">/);
  });

  await t.test('1.10 Case-insensitive container matching', () => {
    const uppercase = md.render('::: GRAMMAR-BOX\nContent\n:::');
    assert.match(uppercase, /<div class="grammar-box custom-block">/);

    const mixedCase = md.render('::: Grammar-Box [Titel]\nContent\n:::');
    assert.match(mixedCase, /<div class="grammar-box custom-block">\n<div class="md-box__title">Titel<\/div>/);
  });

  await t.test('1.11 Container title without space before bracket', () => {
    const noSpaceTitle = md.render('::::grammar-box[Titel]\nContent\n::::');
    assert.match(noSpaceTitle, /<div class="grammar-box custom-block">\n<div class="md-box__title">Titel<\/div>/);
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

test('3. Edge Cases, Safety & API Metadata', async (t) => {
  const md = new MarkdownIt({ html: true }).use(extensiblePlugin, { injectStyles: false });

  await t.test('3.1 Title with Special Characters', () => {
    const html = md.render('::: grammar-box [<Titel & Test>]\nInhalt\n:::');
    assert.match(html, /<div class="md-box__title"><Titel & Test><\/div>/);
  });

  await t.test('3.2 Deeply Nested Containers (4+ Colons)', () => {
    const html = md.render('::::grammar-box [Outer]\n::::: indent\nInner\n:::::\n::::');
    assert.match(html, /<div class="grammar-box custom-block">/);
    assert.match(html, /<div class="indent custom-block">/);
  });

  await t.test('3.3 API Exports Verification', () => {
    assert.ok(Array.isArray(extensiblePlugin.DEFAULT_BLOCK_CONTAINERS));
    assert.ok(Array.isArray(extensiblePlugin.DEFAULT_INLINE_DIRECTIVES));
    const help = extensiblePlugin.getSyntaxHelp();
    assert.ok(Array.isArray(help.containers));
    assert.ok(Array.isArray(help.inline));
    assert.ok(help.containers.length > 0);
    assert.ok(help.inline.length > 0);
  });
});
