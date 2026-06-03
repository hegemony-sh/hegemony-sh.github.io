/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-standard"],
  ignoreFiles: ["node_modules/**", ".vitepress/dist/**", ".vitepress/cache/**"],
  rules: {
    "alpha-value-notation": null,
    "color-function-notation": null,
    "no-descending-specificity": null,
    "selector-class-pattern": null,
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["deep"],
      },
    ],
    "value-keyword-case": [
      "lower",
      {
        camelCaseSvgKeywords: true,
      },
    ],
  },
};
