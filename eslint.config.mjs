import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Attributes whose words people hear or see: screen-reader labels, placeholders, tooltips, alt text. A string with
// letters as the value, in either branch of `? :` or `||`, or in a template string is an error.
const spoken = "JSXAttribute[name.name=/^(aria-label|aria-description|aria-roledescription|aria-valuetext|placeholder|title|alt)$/]"
const words = "[value=/[A-Za-z]/]"
const wordsInAttributes = [
  `${spoken} > Literal${words}`,
  `${spoken} > JSXExpressionContainer > Literal${words}`,
  `${spoken} > JSXExpressionContainer > :matches(ConditionalExpression, LogicalExpression) > Literal${words}`,
  `${spoken} > JSXExpressionContainer > TemplateLiteral > TemplateElement[value.raw=/[A-Za-z]/]`,
].map((selector) => ({ selector, message: "Words in this attribute belong in src/content/site.ts, not in a component." }))

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Words belong in src/content/site.ts, never in components: text typed straight into JSX is an error,
  // so neither people nor AI editors can scatter copy across files. Symbols are allowed.
  {
    files: ["src/components/site/**/*.tsx", "src/app/**/*.tsx"],
    rules: {
      "react/jsx-no-literals": [
        "error",
        {
          noStrings: true,
          ignoreProps: true,
          allowedStrings: ["©", "·", "→", "←", "“", "”", "$", "%", "×", "+", "/", "—", "–", ":", ",", "."],
        },
      ],
      // the same for words people hear or see in attributes: screen-reader labels, placeholders, tooltips, alt text
      "no-restricted-syntax": ["error", ...wordsInAttributes],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
