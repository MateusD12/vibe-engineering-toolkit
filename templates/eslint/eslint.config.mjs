import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx,js,jsx}"],
    rules: {
      // Quality Gate: Limite de 350 linhas por arquivo (evita arquivos monstros)
      "max-lines": [
        "warn",
        {
          max: 350,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      // Evita console.log solto em código de produção
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      // Previne variáveis não utilizadas
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  {
    // Arquivos de teste podem ter limites flexíveis
    files: ["**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}"],
    rules: {
      "max-lines": "off",
    },
  }
);
