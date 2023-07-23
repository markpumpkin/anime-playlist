module.exports = api => {
    const isTest = api.env('test');

    return {
        presets: [
            [
                '@babel/preset-env',
                {
                    modules: isTest ? 'commonjs' : false
                }
            ],
            '@babel/preset-react'
        ],
        plugins: [
            '@babel/plugin-proposal-export-namespace-from',
            '@babel/plugin-proposal-private-methods',
            '@babel/plugin-proposal-class-properties',
            [
                '@babel/plugin-transform-runtime',
                {
                    helpers: true,
                    regenerator: true
                }
            ]
        ],
        ignore: ['./test/e2e-runtime/', './node_modules']
    };
};
