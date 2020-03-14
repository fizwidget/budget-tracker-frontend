import React from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { Transactions } from "./ui/main-content";
import { Sidebar } from "./ui/sidebar";
import Page, { Grid, GridColumn } from "@atlaskit/page";
import { css, Global } from "@emotion/core";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:8080/graphql" }),
  cache: new InMemoryCache()
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
        <GridColumn medium={8}>
          <Transactions />
        </GridColumn>
        <GridColumn medium={4}>
          <Sidebar />
        </GridColumn>
      </Grid>
    </Page>
  </ApolloProvider>
);
