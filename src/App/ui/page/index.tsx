import React from "react";
import { useTransactions } from "../../service/transactions";
import { Transaction } from "./transaction";

export const Page = () => {
  const { data, error, loading } = useTransactions();
  if (error) {
    return <p>"Error!"</p>;
  }
  if (loading) {
    return <p>"Loading..."</p>;
  }
  return (
    <>
      {data?.map(({ description, amount }) => (
        <Transaction description={description} amount={amount} />
      ))}
    </>
  );
};
