/** @jsx jsx */
import { ApolloClient, HttpLink, InMemoryCache, gql } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import Page, { Grid, GridColumn } from "@atlaskit/page";
import { css, jsx, Global } from "@emotion/core";
import { Categories } from "./categories";
import { Transactions } from "./transactions";
import { UploadTransactions } from "./upload-transactions";

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
          <h1
            css={css`
              text-align: center;
              color: deeppink;
              text-shadow: 5px 3px papayawhip;
              font-size: 64px;
            `}
          >
            Budget Tracker
          </h1>
        </GridColumn>
        <GridColumn medium={12}>
          <UploadTransactions />
          <Categories />
          <Transactions />
        </GridColumn>
      </Grid>
    </Page>
  </ApolloProvider>
);
