module.exports = {
  client: {
    includes: ["src/**/*.{ts,tsx}"],
    service: {
      name: "budget-tracker",
      localSchemaFile: "./schema.json",
    },
  },
};
