import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
   baseDirectory: __dirname,
});

const eslintConfig = [
   ...compat.extends("next/core-web-vitals", "next/typescript"),
   {
      "rules": {
         "indent": [
            "error",
            3,
            {
               "SwitchCase": 1,
               "ignoredNodes": [
                  "JSXElement",
                  "JSXElement > *",
                  "JSXAttribute",
                  "JSXIdentifier",
                  "JSXNamespacedName",
                  "JSXMemberExpression",
                  "JSXSpreadAttribute",
                  "JSXExpressionContainer",
                  "JSXOpeningElement",
                  "JSXClosingElement",
                  "JSXFragment",
                  "JSXOpeningFragment",
                  "JSXClosingFragment",
                  "JSXText",
                  "JSXEmptyExpression",
                  "JSXSpreadChild"
               ]
            }
         ],
         "space-before-blocks": ["error", "always"],
         "space-before-function-paren": ["error", "always"],
         "no-trailing-spaces": ["error", {
            "ignoreComments": true
         }],
         "space-in-parens": ["error", "never"],
         "no-multi-spaces": ["error", {
            "ignoreEOLComments": false
         }],
         "newline-per-chained-call": ["error", {
            "ignoreChainWithDepth": 1
         }],
         "dot-location": ["error", "property"],
         "object-curly-newline": ["error", {
            "ObjectExpression": "always",
            "ObjectPattern": {
               "multiline": true,
               "minProperties": 2
            },
            "ImportDeclaration": {
               "multiline": true,
               "minProperties": 3
            },
            "ExportDeclaration": {
               "multiline": true,
               "minProperties": 3
            }
         }],
         "object-curly-spacing": ["error", "always"],
         "object-property-newline": ["error", {
            "allowMultiplePropertiesPerLine": false
         }],
         "react/jsx-max-props-per-line": ["error", {
            "maximum": 1,
            "when": "multiline"
         }],
         "react/self-closing-comp": ["error", {
            "component": true,
            "html": true
         }],
         "react/jsx-curly-newline": ["error", {
            "multiline": "consistent",
            "singleline": "forbid"
         }],
         "react/jsx-indent": ["error", 3],
         "react/jsx-indent-props": ["error", 3],
         "react/jsx-closing-bracket-location": [
            "error",
            {
               selfClosing: "tag-aligned",
               nonEmpty:  "tag-aligned"
            }
         ],
         "react/jsx-wrap-multilines": ["error", {
            "declaration": "parens-new-line",
            "assignment": "parens-new-line",
            "return": "parens-new-line",
            "arrow": "parens-new-line",
            "condition": "parens-new-line",
            "logical": "parens-new-line",
            "prop": "parens-new-line"
         }]
      },
   }
];

export default eslintConfig;
