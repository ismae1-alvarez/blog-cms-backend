export default {
  types: [
    { value: "feat", name: "feat:     Nueva funcionalidad" },
    { value: "fix", name: "fix:      Corrección de bug" },
    { value: "docs", name: "docs:     Documentación" },
    { value: "style", name: "style:    Formato (sin lógica)" },
    { value: "refactor", name: "refactor: Refactor de código" },
    { value: "test", name: "test:     Tests" },
    { value: "chore", name: "chore:    Tareas de mantenimiento" },
  ],

  scopes: ["auth", "user", "post", "comment", "api", "db", "config"],

  messages: {
    type: "Selecciona el tipo de cambio:",
    scope: "Selecciona el scope:",
    subject: "Describe el cambio:",
    body: "Descripción larga (opcional):",
    footer: "Breaking changes / issues (opcional):",
    confirmCommit: "¿Confirmas el commit?",
  },
}
