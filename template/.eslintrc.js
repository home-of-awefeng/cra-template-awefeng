module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module"
  },
  extends: [ "eslint:recommended", "react-app", "prettier" ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-inner-declarations": "warn",
    "block-scoped-var": "warn",
    "default-case": "warn",
    "no-caller": "warn",
    "no-eval": "error",
    semi: [ "warn", "never" ],
    "brace-style": [ "warn", "1tbs", { "allowSingleLine": true } ],
    "comma-dangle": [ "warn", "never" ],
    "array-bracket-spacing": [ "warn", "always" ],
    "object-curly-spacing": [ "warn", "always" ],
    "indent": [ "warn", 2 ],
    "max-len": [ "warn", { "code": 120 } ],
    "comma-spacing": [ "warn", { "before": false, "after": true } ],
    "padding-line-between-statements": [
      "warn",
      // 给代码加上必要的空行风格
      {
        blankLine: "always",
        prev: [ "const", "let", "var", "block", "block-like" ],
        next: [ "block", "block-like" ]
      },
      {
        blankLine: "always",
        prev: [ "import" ],
        next: [ "const", "let", "var", "block", "block-like", "expression" ]
      },
      { blankLine: "never", prev: [ "import" ], next: [ "import" ] },
      { blankLine: "never", prev: [ "const", "let", "var" ], next: [ "const", "let", "var" ] }
    ]
  }
}
