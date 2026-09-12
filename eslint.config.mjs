import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
    {
        files: ["src/**/*.ts", "src/**/*.tsx"],
        ignores: ["dist", "build", ".yarn"],
        rules: {
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],
        },
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    eslintConfigPrettier,
];
