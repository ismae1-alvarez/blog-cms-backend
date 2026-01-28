export default {
  extends: ["@commitlint/config-conventional"],

  rules: {
    // Tipos permitidos
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "test",
        "chore",
        "perf",
        "ci",
        "build",
        "revert",
      ],
    ],

    // Scope opcional pero si existe, que sea válido
    "scope-enum": [1, "always", ["auth", "user", "post", "comment", "api", "db", "config"]],

    // Reglas útiles
    "subject-empty": [2, "never"],
    "subject-case": [2, "never", ["sentence-case", "start-case", "pascal-case"]],
    "header-max-length": [2, "always", 100],
  },
}
