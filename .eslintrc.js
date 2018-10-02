module.exports = {
    "parserOptions": {
        "ecmaVersion": 2017,
        "sourceType": "module"
    },
    "env": {
        "browser": true,
        "node": true
    },
    "rules": {
        "indent": [
            "error",
            2,
            {
                "VariableDeclarator": {
                    "var": 2,
                    "let": 2,
                    "const": 3
                },
                "CallExpression": {
                    "arguments": 1
                },
                "MemberExpression": 1,
                "ignoreComments": true
            }
        ],
        "quotes": [
            "error",
            "single",
            {
                "avoidEscape": true
            }
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": 0
    }
};