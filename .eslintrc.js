module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    parser: '@typescript-eslint/parser',
    "extends": [
        "airbnb",
        "airbnb-typescript",
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        '@typescript-eslint',
    ],
    "rules": {
      'import/prefer-default-export': 'off'
    }
};
