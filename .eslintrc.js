module.exports = {
    "env": {
        "es2021": true,
        "node": true
    },
    "extends": [
        "standard",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "prettier"
    ],
    "rules": {
        "no-useless-constructor": 0,
        "prettier/prettier": "error"
    }
}
