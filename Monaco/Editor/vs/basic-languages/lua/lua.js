/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require", "exports"], function (require, exports) {
    'use strict';
    Object.defineProperty(exports, "__esModule", { value: true });

    exports.conf = {
        comments: {
            lineComment: '--',
            blockComment: ['--[[', ']]'],
        },
        brackets: [
            ['{', '}'],
            ['[', ']'],
            ['(', ')'],
            ['do', 'end'],
            ['then', 'end']
        ],
        autoClosingPairs: [
            { open: '{', close: '}' },
            { open: '[', close: ']' },
            { open: '(', close: ')' },
            { open: '"', close: '"' },
            { open: '\'', close: '\'' },
        ],
        surroundingPairs: [
            { open: '{', close: '}' },
            { open: '[', close: ']' },
            { open: '(', close: ')' },
            { open: '"', close: '"' },
            { open: '\'', close: '\'' },
        ],
        folding: {
            markers: {
                start: /^\s*--\s*(?:#?region\b|<editor-fold\b)/,
                end: /^\s*--\s*(?:#?endregion\b|<\/editor-fold>)/
            }
        }
    };

    exports.language = {
        defaultToken: '',
        tokenPostfix: '.lua',
        keywords: [
            'and', 'break', 'do', 'else', 'elseif',
            'end', 'false', 'for', 'function', 'goto', 'if',
            'in', 'local', 'nil', 'not', 'or',
            'repeat', 'return', 'then', 'true', 'until',
            'while',
        ],
        brackets: [
            { token: 'delimiter.bracket', open: '{', close: '}' },
            { token: 'delimiter.array', open: '[', close: ']' },
            { token: 'delimiter.parenthesis', open: '(', close: ')' }
        ],
        globals: [
            'assert', 'collectgarbage', 'error', 'getfenv', 'getmetatable',
            'ipairs', 'loadfile', 'loadstring', 'newproxy', 'next', 'pairs',
            'pcall', 'print', 'rawequal', 'rawget', 'rawset', 'select', 'setfenv',
            'setmetatable', 'tonumber', 'tostring', 'type', 'unpack', 'xpcall', '_G',
            'shared', 'delay', 'require', 'spawn', 'tick', 'typeof', 'wait', 'warn',
            'game', 'Enum', 'script', 'workspace', 'printidentity'
        ],
        operators: [
            '+', '-', '*', '/', '%', '^', '#', '==', '~=', '<=', '>=', '<', '>', '=',
            ';', ':', ',', '.', '..', '...'
        ],
        symbols: /[=><!~?:&|+\-*\/\^%]+/,
        escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
        tokenizer: {
            root: [
                // Identifiers and keywords
                [/[a-zA-Z_]\w*/, {
                    cases: {
                        '@keywords': { token: 'keyword.$0' },
                        '@globals': { token: 'global' },
                        '@default': 'identifier'
                    }
                }],
                // Whitespace
                { include: '@whitespace' },
                // Keys
                [/(,)(\s*)([a-zA-Z_]\w*)(\s*)(:)(?!:)/, ['delimiter', '', 'key', '', 'delimiter']],
                [/({)(\s*)([a-zA-Z_]\w*)(\s*)(:)(?!:)/, ['@brackets', '', 'key', '', 'delimiter']],
                // Delimiters and operators
                [/[{}()\[\]]/, '@brackets'],
                [/@symbols/, {
                    cases: {
                        '@operators': 'delimiter',
                        '@default': ''
                    }
                }],
                // Numbers
                [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
                [/0[xX][0-9a-fA-F_]*[0-9a-fA-F]/, 'number.hex'],
                [/\d+/, 'number'],
                // Delimiters
                [/[;,.]/, 'delimiter'],
                // Strings
                [/"([^"\\]|\\.)*$/, 'string.invalid'], // Non-terminated string
                [/'([^'\\]|\\.)*$/, 'string.invalid'], // Non-terminated string
                [/"/, 'string', '@string."'],
                [/'/, 'string', '@string.\''],
            ],
            whitespace: [
                [/[ \t\r\n]+/, ''],
                [/--\[([=]*)\[/, 'comment', '@comment.$1'],
                [/--.*$/, 'comment'],
            ],
            comment: [
                [/[^\]]+/, 'comment'],
                [/\]([=]*)\]/, {
                    cases: {
                        '$1==$S2': { token: 'comment', next: '@pop' },
                        '@default': 'comment'
                    }
                }],
                [/./, 'comment']
            ],
            string: [
                [/[^\\"']+/, 'string'],
                [/@escapes/, 'string.escape'],
                [/\\./, 'string.escape.invalid'],
                [/["']/, {
                    cases: {
                        '$#==$S2': { token: 'string', next: '@pop' },
                        '@default': 'string'
                    }
                }]
            ],
        },
    };
});
