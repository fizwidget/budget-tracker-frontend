import React from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { Page } from "./ui/page";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:8080/graphql" }),
  cache: new InMemoryCache()
});

export const App = () => (
  <ApolloProvider client={client}>
    <Page />
  </ApolloProvider>
);
