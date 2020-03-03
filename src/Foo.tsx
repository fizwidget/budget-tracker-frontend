import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const querySavingsRate = gql`
  query {
    savingsRate
  }
`;

export default () => {
  const { data, error, loading } = useQuery(querySavingsRate);

  if (error) {
    return <p>"Error!"</p>;
  }
  if (loading) {
    return <p>"Loading..."</p>;
  }
  return <pre>{JSON.stringify(data, null, 4)}</pre>;
};
