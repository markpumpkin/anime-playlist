module.exports = {
    extends: [
        'eslint:recommended',
        'airbnb',
        'prettier',
        'plugin:@typescript-eslint/recommended',
        'airbnb/hooks',
        'plugin:react-hooks/recommended'
    ],
    plugins: ['prettier', 'import', 'react-hooks'],
    rules: {
        // 'prettier/prettier': ['error'],
        'import/no-unresolved': 'error',
        'react/jsx-filename-extension': [0, { extensions: ['.tsx'] }],
        'react/react-in-jsx-scope': 'off',
        'react/jsx-props-no-spreading': [0, { html: 'ignore', custom: 'ignore', explicitSpread: 'ignore' }],
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        'import/order': [
            2,
            {
                groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                'newlines-between': 'ignore'
            }
        ],
        'import/newline-after-import': 1,
        'no-duplicate-imports': ['warn'],
        'react/require-default-props': [0],
        'react/no-unused-class-component-methods': [0],
        'import/extensions': 'off',
        // 'import/extensions': [
        // 	'error',
        // 	'ignorePackages',
        // 	{
        // 		js: 'never',
        // 		jsx: 'never',
        // 		ts: 'never',
        // 		tsx: 'never',
        // 		mjs: 'never'
        // 	}
        // ],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'no-unused-expressions': ['warn', { allowShortCircuit: true }],
        'no-restricted-exports': 'off',
        'consistent-return': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/prefer-regexp-exec': 'off',
        '@typescript-eslint/restrict-plus-operands': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/unbound-method': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
        'no-plusplus': 'off',
        'no-param-reassign': [
            'error',
            {
                props: true,
                ignorePropertyModificationsFor: ['state']
            }
        ],
        'jsx-a11y/no-static-element-interactions': 'off',
        'import/no-cycle': [2, { maxDepth: 1 }],
        'func-names': 'off',
        'ts-expect-error': 'off',
        'react/destructuring-assignment': 'off',
        'import/prefer-default-export': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        radix: ['error', 'as-needed'],
        'react/default-props-match-prop-types': 'off',
        'import/no-named-as-default-member': 'off',
        'no-underscore-dangle': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off'
    },
    parserOptions: {
        project: 'tsconfig.eslint.json'
    },
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx']
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.css']
            },
            typescript: {
                alwaysTryTypes: true,
                project: 'tsconfig.eslint.json'
            }
        }
    },
    ignorePatterns: ['.eslintrc.js']
};
