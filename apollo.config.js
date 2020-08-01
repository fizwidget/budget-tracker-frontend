module.exports = {
  client: {
    includes: ["src/**/*.{ts,tsx,graphql}"],
    service: {
      name: "budget-tracker",
      localSchemaFile: "schema.json",
    },
  },
};
