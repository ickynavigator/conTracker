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
    "react/prop-types": "off",
    "jsx-a11y/label-has-associated-control": [
      "error",
      { required: { some: ["nesting", "id"] } },
    ],
    "jsx-a11y/label-has-for": [
      "error",
      { required: { some: ["nesting", "id"] } },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      { js: "0", jsx: "0", ts: "0", tsx: "0" },
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
};
