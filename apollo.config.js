module.exports = {
  client: {
    includes: ["src/**/*.ts", "src/**/*.tsx"],
    service: {
      name: "budget-tracker",
      localSchemaFile: "./schema.json",
    },
  },
};
