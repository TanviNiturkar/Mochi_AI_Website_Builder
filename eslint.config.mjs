import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // ===== Ignore folders that cause build errors =====
  {
    ignores: [
      "lib/generated/prisma/**",
      ".next/**",
      "node_modules/**",
      "dist/**"
    ]
  },

  // ===== Load Next.js recommended config =====
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // ===== Our override rules (placed at LAST so they WIN) =====
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-require-imports": "off",
    }
  }
];

export default eslintConfig;
