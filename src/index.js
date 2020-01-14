/**
 * @license babel-plugin-chowa-import
 *
 * Copyright (c) Chowa Techonlogies Co.,Ltd.(http://www.chowa.cn).
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

function mergeOpts(opts) {
    opts = {...opts};

    if (!['css', 'sass', 'scss'].includes(opts.style)) {
        opts.style = 'css';
    }

    return opts;
}

function componentNameToDirName(componentName) {
    return componentName.replace(/([A-Z])/g, (a, b, c) => {
        return (c === 0 ? '' : '-') + b.toLowerCase();
    });
}

export default ({ types }) => {
    return {
        visitor: {
            ImportDeclaration(path, state) {
                const { node } = path;
                const { style } = mergeOpts(state.opts);
                const { specifiers, source } = node;
                const libName = source.value;

                if (libName !== 'chowa') {
                    return;
                }

                const declarations = [];

                specifiers.forEach((specifier) => {
                    if (!types.isImportSpecifier(specifier) || types.isImportDefaultSpecifier(specifier)) {
                        return;
                    }

                    const { local } = specifier;
                    const componentDir = componentNameToDirName(local.name);
                    const baseDir = `${libName}/es/${componentDir}/`;

                    declarations.push(types.ImportDeclaration(
                        [types.importDefaultSpecifier(specifier.local)],
                        types.stringLiteral(baseDir)
                    ));

                    declarations.push(types.importDeclaration(
                        [],
                        types.stringLiteral(`${baseDir}/style/${style === 'css' ? 'css' : ''}`)
                    ));
                });

                path.replaceWithMultiple(declarations);
            }
        }
    };
};
