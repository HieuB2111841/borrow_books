module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,   // Chỉ áp dụng cho trình duyệt (frontend)
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended', // Quy tắc cho Vue.js
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'vue/no-unused-vars': 'warn',
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
  },
};
