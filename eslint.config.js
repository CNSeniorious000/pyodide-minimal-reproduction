import antfu from "@antfu/eslint-config";

export default antfu({
  toml: false,
  svelte: true,
  typescript: true,
  stylistic: {
    quotes: "double",
    semi: true,
  },
  formatters: true,
  unocss: true,
  rules: {
    "perfectionist/sort-imports": ["error", {
      groups: ["type", ["side-effect", "side-effect-style"]],
    }],
    "import/order": "off",
    "svelte/no-at-html-tags": "off",
    "no-console": "warn",
  },
});
