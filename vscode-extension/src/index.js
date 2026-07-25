const extensiblePlugin = require('markdown-it-extensible');
const vscode = require('vscode');

function extendMarkdownIt(md) {
    try {
        const config = vscode.workspace.getConfiguration('extensibleMarkdown');
        const blockContainers = config.get('blockContainers') || [];
        const inlineDirectives = config.get('inlineDirectives') || [];
        return md.use(extensiblePlugin, {
            blockContainers: blockContainers,
            inlineDirectives: inlineDirectives
        });
    } catch (e) {
        console.error('Error extending MarkdownIt:', e);
        return md.use(extensiblePlugin);
    }
}

function activate(context) {
    // Dynamischer Snippet-CompletionProvider für den VS Code Editor
    const provider = vscode.languages.registerCompletionItemProvider(
        'markdown',
        {
            provideCompletionItems(document, position, token, context) {
                const config = vscode.workspace.getConfiguration('extensibleMarkdown');
                const blockContainers = config.get('blockContainers') || [];
                const inlineDirectives = config.get('inlineDirectives') || [];

                const items = [];

                // 1. Dynamische Block-Container Snippets (z. B. ::: warning-box oder swarning-box)
                blockContainers.forEach(containerOpt => {
                    const name = containerOpt.name;

                    // Standard-Triggermatch: ::: <name>
                    const item = new vscode.CompletionItem(`::: ${name}`, vscode.CompletionItemKind.Snippet);
                    item.detail = `Extensible Block Container (::: ${name})`;
                    item.insertText = new vscode.SnippetString(`::: ${name} [\${1:Title}]\n\${0:\$TM_SELECTED_TEXT}\n:::`);
                    item.documentation = new vscode.MarkdownString(`Fügt den Block-Container \`::: ${name}\` ein.`);
                    items.push(item);

                    // Kurztipp-Triggermatch: s<name> (z. B. swarning-box)
                    const shortcut = new vscode.CompletionItem(`s${name.replace(/[^a-zA-Z0-9]/g, '')}`, vscode.CompletionItemKind.Snippet);
                    shortcut.detail = `Shortcut für ::: ${name}`;
                    shortcut.insertText = new vscode.SnippetString(`::: ${name} [\${1:Title}]\n\${0:\$TM_SELECTED_TEXT}\n:::`);
                    shortcut.documentation = new vscode.MarkdownString(`Fügt den Block-Container \`::: ${name}\` ein.`);
                    items.push(shortcut);
                });

                // 2. Dynamische Inline-Direktive Snippets (z. B. :mark oder smark)
                inlineDirectives.forEach(dir => {
                    const name = dir.name;

                    const item = new vscode.CompletionItem(`:${name}`, vscode.CompletionItemKind.Snippet);
                    item.detail = `Extensible Inline Directive (:${name}[...])`;
                    item.insertText = new vscode.SnippetString(`:${name}[\${1:text}]`);
                    item.documentation = new vscode.MarkdownString(`Fügt die Inline-Direktive \`:${name}[text]\` ein.`);
                    items.push(item);

                    const shortcut = new vscode.CompletionItem(`s${name.replace(/[^a-zA-Z0-9]/g, '')}`, vscode.CompletionItemKind.Snippet);
                    shortcut.detail = `Shortcut für :${name}[...]`;
                    shortcut.insertText = new vscode.SnippetString(`:${name}[\${1:text}]`);
                    shortcut.documentation = new vscode.MarkdownString(`Fügt die Inline-Direktive \`:${name}[text]\` ein.`);
                    items.push(shortcut);
                });

                return items;
            }
        },
        ':', 's' // Trigger bei Eintippen von ':' oder 's'
    );

    if (context && context.subscriptions) {
        context.subscriptions.push(provider);
    }

    return {
        extendMarkdownIt
    };
}

module.exports = {
    activate,
    extendMarkdownIt
};
