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

  await t.test('1.12 Grammar-box2 without grammar-box collision', () => {
    const box2 = md.render('::: grammar-box2\nSchema\n:::');
    assert.match(box2, /<div class="grammar-box2 custom-block">/);
    const box1 = md.render('::: grammar-box\nRule\n:::');
    assert.match(box1, /<div class="grammar-box custom-block">/);
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

  await t.test('3.1 Title with Special Characters and XSS Sanitization', () => {
    const html = md.render('::: grammar-box [<Titel & Test>]\nInhalt\n:::');
    assert.match(html, /<div class="md-box__title">&lt;Titel &amp; Test&gt;<\/div>/);

    const xssHtml = md.render('::: note-box [<img src=x onerror=alert(1)>]\ntext\n:::');
    assert.doesNotMatch(xssHtml, /<img /);
    assert.match(xssHtml, /&lt;img src=x onerror=alert\(1\)&gt;/);
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

  await t.test('3.4 Robustness with Invalid Configuration Entries', () => {
    assert.doesNotThrow(() => {
      const customMd = new MarkdownIt({ html: true }).use(extensiblePlugin, {
        injectStyles: false,
        blockContainers: [
          null,
          { className: 'missing-name' },
          { name: '' },
          { name: 'valid-box' }
        ],
        inlineDirectives: [
          null,
          { tag: 'strong' },
          { name: '' },
          { name: 'valid-dir' }
        ]
      });
      const res = customMd.render('::: valid-box\nText\n:::\n\n:valid-dir[Text]');
      assert.match(res, /<div class="valid-box custom-block">/);
      assert.match(res, /<span class="valid-dir">Text<\/span>/);
    });
  });

  await t.test('3.5 Injection Prevention for Class Names and HTML Tags', () => {
    const customMd = new MarkdownIt({ html: true }).use(extensiblePlugin, {
      injectStyles: false,
      blockContainers: [
        { name: 'unsafe-box', className: 'box" onmouseover="alert(1)' }
      ],
      inlineDirectives: [
        { name: 'unsafe-dir', className: 'dir" onfocus="alert(1)', tag: 'script' }
      ]
    });

    const rendered = customMd.render('::: unsafe-box\nContent\n:::\n\n:unsafe-dir[Content]');
    // Attribute breakout prevented via class name sanitization and tag whitelisting
    assert.doesNotMatch(rendered, /\s+onmouseover=/);
    assert.doesNotMatch(rendered, /\s+onfocus=/);
    assert.doesNotMatch(rendered, /<script/);
    assert.match(rendered, /class="box onmouseoveralert1 custom-block"/);
    // Disallowed tag falls back to 'span' with sanitized className
    assert.match(rendered, /<span class="dir onfocusalert1">Content<\/span>/);
  });

  await t.test('3.6 Prevention of False-Positive Matches on Time and Code Patterns', () => {
    const text = 'Uhrzeit 10:30[note] und Variable a:b[0] sowie https://example.com:8080[foo]';
    const html = md.render(text);
    assert.doesNotMatch(html, /<span class="30">/);
    assert.doesNotMatch(html, /<span class="b">/);
    assert.doesNotMatch(html, /<span class="8080">/);
  });
});
