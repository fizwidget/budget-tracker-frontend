import React from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:8080/graphql" }),
  cache: new InMemoryCache()
});

interface Props {
  children: JSX.Element;
}

export default ({ children }: Props) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
