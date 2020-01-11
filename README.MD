# babel-plugin-chowa-import

Chowa UI component library modular import plugin

[![npm](https://img.shields.io/npm/v/babel-plugin-chowa-import.svg)](https://www.npmjs.com/package/babel-plugin-chowa-import)
[![npm](https://img.shields.io/npm/dm/babel-plugin-chowa-import.svg)](https://www.npmjs.com/package/babel-plugin-chowa-import)

## install

```
npm install babel-plugin-chowa-import --save-dev
```

## Usage

#### webpack

```js
{
    rules: [
        {
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: [
                        ['chowa-import', { style: 'css' }]
                    ]
                }
            }
        }
    ]
}
```

#### babel

```
{
    "presets": [
        ["@babel/preset-env", {
            "targets": {
                "browsers": ["last 2 versions", "safari >= 7"]
            },
            "modules": false,
            "useBuiltIns": "usage"
        }],
        "@babel/preset-react"
    ],
    "plugins": [
        ["chowa-import", { style: 'scss' }]
    ]
}
```

### options

```
{
    style?: 'css' | 'sass';
}
```
