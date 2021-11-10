module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    "react/jsx-props-no-spreading": "off",
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
  },
  overrides: [
    {
      files: ["./packages/con-tracker-client"],
      extends: ["next/core-web-vitals"],
    },
    {
      files: ["./packages/con-tracker-api/**/*.js"],
      rules: { "no-console": "off" },
    },
  ],
}
