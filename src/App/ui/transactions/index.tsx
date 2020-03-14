import React from "react";
import DyanmicTable from "@atlaskit/dynamic-table";
import { useTransactions, Transaction } from "../../service/transactions";
import { ErrorMessage } from "../error-message";
import { useSelectedCategory } from "../../service/selected-category";

const tableHeader = {
  cells: [
    { content: "Description", shouldTruncate: true },
    { content: "Amount" },
    { content: "Category" },
    { content: "Account" }
  ]
};

const formatCurrency = (currency: number): string =>
  `${currency < 0 ? "-" : ""}$${Math.abs(currency)}`;

const toTableRows = (transactions: Transaction[]) =>
  transactions.map(({ description, amount, category, account }) => ({
    cells: [
      { content: description },
      { content: formatCurrency(amount) },
      { content: category ? category.name : "Uncategorised" },
      { content: account ? account.name : "Unknown" }
    ]
  }));

export const Transactions = () => {
  const [selectedCategory] = useSelectedCategory();
  console.log(selectedCategory);
  const transactionsFilter = {
    categoryIds: selectedCategory ? [selectedCategory] : []
  };
  const { data: transactions, error, loading } = useTransactions(
    transactionsFilter
  );

  return (
    <>
      {error && (
        <ErrorMessage title="Error loading transactions" error={error} />
      )}
      <DyanmicTable
        caption="Transactions"
        isLoading={loading}
        head={tableHeader}
        rows={transactions && toTableRows(transactions)}
      />
    </>
  );
};
