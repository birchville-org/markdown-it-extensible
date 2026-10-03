const test = require('node:test');
const assert = require('node:assert/strict');

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
const { adjustContainerNesting } = require('../nesting.js');

test('4. Standalone Container Nesting Normalization (nesting.js)', async (t) => {
  await t.test('4.1 No-op when no nesting is present', () => {
    const input = '::: note-box [Title]\nSingle container\n:::';
    const res = adjustContainerNesting(input);
    assert.strictEqual(res.didRepair, false);
    assert.strictEqual(res.repaired, input);
    assert.strictEqual(res.adjustedCount, 0);
  });

  await t.test('4.2 Elevates outer container for 2-level nesting', () => {
    const input = [
      '::: note-box [Notiz]',
      'Vor dem Grammatik-Block.',
      '::: grammar-box [Grammatik]',
      'a + i = e',
      ':::',
      'Nach dem Grammatik-Block.',
      ':::'
    ].join('\n');

    const expected = [
      ':::: note-box [Notiz]',
      'Vor dem Grammatik-Block.',
      '::: grammar-box [Grammatik]',
      'a + i = e',
      ':::',
      'Nach dem Grammatik-Block.',
      '::::'
    ].join('\n');

    const res = adjustContainerNesting(input);
    assert.strictEqual(res.didRepair, true);
    assert.strictEqual(res.repaired, expected);
    assert.strictEqual(res.adjustedCount, 1);
  });

  await t.test('4.3 Handles 3-level deep progressive nesting', () => {
    const input = [
      '::: outer-box',
      '::: middle-box',
      '::: inner-box',
      'Deep text',
      ':::',
      ':::',
      ':::'
    ].join('\n');

    const expected = [
      '::::: outer-box',
      ':::: middle-box',
      '::: inner-box',
      'Deep text',
      ':::',
      '::::',
      ':::::'
    ].join('\n');

    const res = adjustContainerNesting(input);
    assert.strictEqual(res.didRepair, true);
    assert.strictEqual(res.repaired, expected);
  });

  await t.test('4.4 Preserves sibling containers within parent container', () => {
    const input = [
      '::: note-box',
      'Text',
      '::: grammar-box',
      'Grammar 1',
      ':::',
      'Middle text',
      '::: grammar-box2',
      'Grammar 2',
      ':::',
      'End',
      ':::'
    ].join('\n');

    const expected = [
      ':::: note-box',
      'Text',
      '::: grammar-box',
      'Grammar 1',
      ':::',
      'Middle text',
      '::: grammar-box2',
      'Grammar 2',
      ':::',
      'End',
      '::::'
    ].join('\n');

    const res = adjustContainerNesting(input);
    assert.strictEqual(res.didRepair, true);
    assert.strictEqual(res.repaired, expected);
  });

  await t.test('4.5 Ignores ::: inside backtick and tilde code fences', () => {
    const input = [
      '::: note-box',
      'Code example:',
      '```markdown',
      '::: grammar-box',
      'code block inside',
      ':::',
      '```',
      '~~~markdown',
      '::: important',
      'tilde code block',
      ':::',
      '~~~',
      'Outer text',
      ':::'
    ].join('\n');

    const res = adjustContainerNesting(input);
    assert.strictEqual(res.didRepair, false);
    assert.strictEqual(res.repaired, input);
  });

  await t.test('4.6 Auto-close unclosed containers when closeUnclosed is true', () => {
    const input = '::: note-box\n::: grammar-box\nInner text';
    const res = adjustContainerNesting(input, { closeUnclosed: true });
    assert.strictEqual(res.didRepair, true);
    const expected = [
      ':::: note-box',
      '::: grammar-box',
      'Inner text',
      ':::',
      '::::'
    ].join('\n');
    assert.strictEqual(res.repaired, expected);
  });

  await t.test('4.7 Respects custom names filter', () => {
    const input = [
      '::: unknown-box',
      '::: note-box',
      'Inner text',
      ':::',
      ':::'
    ].join('\n');

    // Only note-box is recognized
    const res = adjustContainerNesting(input, { names: ['note-box'] });
    // unknown-box was not recognized as opener, so note-box is not nested under an acknowledged container
    assert.strictEqual(res.didRepair, false);
    assert.strictEqual(res.repaired, input);
  });

  await t.test('4.8 Preserves Windows CRLF line endings', () => {
    const input = '::: note-box\r\n::: grammar-box\r\nText\r\n:::\r\n:::';
    const res = adjustContainerNesting(input);
    assert.strictEqual(res.didRepair, true);
    assert.ok(res.repaired.includes('\r\n'));
    assert.strictEqual(res.repaired, ':::: note-box\r\n::: grammar-box\r\nText\r\n:::\r\n::::');
  });
});

test('5. Integrated autoNesting Core Rule in markdown-it-extensible', async (t) => {
  await t.test('5.1 Automatically fixes nested containers during md.render', () => {
    const md = new MarkdownIt({ html: true }).use(extensiblePlugin, { injectStyles: false });
    const input = [
      '::: note-box [Äussere Notiz]',
      'Aussen Text',
      '::: grammar-box [Innere Grammatik]',
      'Innen Text',
      ':::',
      'Aussen Nachtext',
      ':::'
    ].join('\n');

    const html = md.render(input);

    // Verify outer container starts
    assert.match(html, /<div class="note-box custom-block">/);
    assert.match(html, /<div class="md-box__title">Äussere Notiz<\/div>/);

    // Verify inner container is inside
    assert.match(html, /<div class="grammar-box custom-block">/);
    assert.match(html, /<div class="md-box__title">Innere Grammatik<\/div>/);

    // Verify "Aussen Nachtext" is rendered inside note-box before it closes
    const noteBoxIndex = html.indexOf('note-box custom-block');
    const innerBoxIndex = html.indexOf('grammar-box custom-block');
    const nachTextIndex = html.indexOf('Aussen Nachtext');
    const lastCloseIndex = html.lastIndexOf('</div>');

    assert.ok(noteBoxIndex < innerBoxIndex);
    assert.ok(innerBoxIndex < nachTextIndex);
    assert.ok(nachTextIndex < lastCloseIndex);
  });

  await t.test('5.2 Can be disabled via autoNesting: false', () => {
    const md = new MarkdownIt({ html: true }).use(extensiblePlugin, {
      injectStyles: false,
      autoNesting: false
    });

    const input = [
      '::: note-box',
      '::: grammar-box',
      'Text',
      ':::',
      ':::'
    ].join('\n');

    const html = md.render(input);
    // Without autoNesting, the inner ::: closes the note-box prematurely, leaving trailing ::: unparsed
    assert.match(html, /:::<\/p>/);
  });

  await t.test('5.3 Empty title brackets [ ] do not render empty title div', () => {
    const md = new MarkdownIt({ html: true }).use(extensiblePlugin, { injectStyles: false });
    const html1 = md.render('::: grammar-box []\nContent\n:::');
    assert.doesNotMatch(html1, /<div class="md-box__title">/);

    const html2 = md.render('::: grammar-box [   ]\nContent\n:::');
    assert.doesNotMatch(html2, /<div class="md-box__title">/);
  });

  await t.test('5.4 Nested standard VitePress callout inside extensible container', () => {
    const md = new MarkdownIt({ html: true });
    // Register standard VitePress 'tip' container
    const container = require('markdown-it-container');
    md.use(container, 'tip', {
      render: (tokens, idx) => tokens[idx].nesting === 1 ? '<div class="tip">\n' : '</div>\n'
    });
    md.use(extensiblePlugin, { injectStyles: false });

    const input = [
      '::: note-box [Notiz]',
      'Vor dem Tipp',
      '::: tip',
      'Tipp Inhalt',
      ':::',
      'Nach dem Tipp',
      ':::'
    ].join('\n');

    const html = md.render(input);
    assert.match(html, /<div class="note-box custom-block">/);
    assert.match(html, /<div class="tip">/);
    assert.match(html, /Nach dem Tipp/);
  });

  await t.test('5.5 adjustContainerNesting is exported on plugin', () => {
    assert.strictEqual(typeof extensiblePlugin.adjustContainerNesting, 'function');
  });
});
