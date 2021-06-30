// 使用stylelint来限制css代码规范
module.exports = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-css-modules',
        'stylelint-config-prettier',
    ],
    plugins: ['stylelint-order'],
    rules: {
        'no-descending-specificity': null,
        //https://github.com/stylelint/stylelint/issues/4114
        'function-calc-no-invalid': null,
        'function-url-quotes': 'always',
        'font-family-no-missing-generic-family-keyword': null,
        'plugin/declaration-block-no-ignored-properties': true,
        'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    },
    ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
};
