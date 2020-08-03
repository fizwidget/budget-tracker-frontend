module.exports = {
  client: {
    includes: ["src/**/*.{ts,tsx,graphql}"],
    service: {
      name: "budget-tracker",
      url: "http://localhost:8080/graphql",
    },
  },
};
