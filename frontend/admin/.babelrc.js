module.exports = {
    'env': {
        'production': {
            'plugins': [
                [
                    'transform-remove-console',
                    {
                        'exclude': ['error', 'warn']
                    }
                ]
            ]
        }
    },
    'presets': ['react-app'],
    'plugins': [
        [
            'import',
            {
                'libraryName': 'antd',
                'libraryDirectory': 'lib',
                'style': true
            }
        ],
        [
            '@babel/plugin-proposal-decorators',
            {
                'legacy': true
            }
        ]
    ]
}

