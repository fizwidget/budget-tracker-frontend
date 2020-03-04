import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const SAVINGS_RATE = gql`
  query {
    categories {
      id
      name
    }
    transactions {
      description
      amount
      account {
        id
        name
      }
      category {
        id
        name
      }
      date
    }
  }
`;

export const Page = () => {
  const { data, error, loading } = useQuery(SAVINGS_RATE);

  if (error) {
    return <p>"Error!"</p>;
  }
  if (loading) {
    return <p>"Loading..."</p>;
  }
  return <pre>{JSON.stringify(data, null, 4)}</pre>;
};
