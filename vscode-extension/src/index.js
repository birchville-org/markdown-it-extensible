const extensiblePlugin = require('markdown-it-extensible');
const vscode = require('vscode');

function activate(context) {
    return {
        extendMarkdownIt(md) {
            const config = vscode.workspace.getConfiguration('extensibleMarkdown');
            const blockContainers = config.get('blockContainers') || [];
            const inlineDirectives = config.get('inlineDirectives') || [];
            return md.use(extensiblePlugin, {
                blockContainers: blockContainers,
                inlineDirectives: inlineDirectives
            });
        }
    };
}

module.exports = {
    activate
};
