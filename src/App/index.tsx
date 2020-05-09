import React from "react";
import { ApolloClient, HttpLink, InMemoryCache, gql } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import Page, { Grid, GridColumn } from "@atlaskit/page";
import { css, Global } from "@emotion/core";
import { Categories } from "./ui/categories";
import { Transactions } from "./ui/transactions";
import { Upload } from "./ui/upload";

const typeDefs = gql`
  extend type Query {
    selectedCategory: String
  }
`;

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:8080/graphql" }),
  cache: new InMemoryCache(),
  typeDefs,
  resolvers: {},
});

const pageStyles = css`
  body {
    font-family: sans-serif;
  }
`;

export const App = () => (
  <ApolloProvider client={client}>
    <Global styles={pageStyles} />
    <Page>
      <Grid>
        <GridColumn medium={12}>
          <h1>Budget Tracker</h1>
        </GridColumn>
        <GridColumn medium={12}>
          <Upload />
          <Categories />
          <Transactions />
        </GridColumn>
      </Grid>
    </Page>
  </ApolloProvider>
);
