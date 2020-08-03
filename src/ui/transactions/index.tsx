import React from "react";
import DyanmicTable from "@atlaskit/dynamic-table";
import { useTransactions } from "../../services/transactions";
import { Transaction } from "../../types/transaction";
import { ErrorMessage } from "../error-message";
import { useSelectedCategory } from "../../controllers/selected-category";
import { CategoryPicker } from "./category-picker";

const tableHeader = {
  cells: [
    { content: "Description", shouldTruncate: true },
    { content: "Amount" },
    { content: "Category" },
    { content: "Account" },
  ],
};

const formatCurrency = (currency: number): string =>
  `${currency < 0 ? "-" : ""}$${Math.abs(currency)}`;

const toTableRows = (transactions: Transaction[]) =>
  transactions.map(({ id, description, amount, account }) => ({
    cells: [
      { content: description },
      { content: formatCurrency(amount) },
      { content: <CategoryPicker transactionId={id} /> },
      { content: account.name },
    ],
  }));

export const Transactions = () => {
  const { data: selectedCategory } = useSelectedCategory();
  const transactionsFilter = selectedCategory
    ? { categoryIds: [selectedCategory] }
    : {};
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
        emptyView={<span>No transactions.</span>}
        isLoading={loading}
        head={tableHeader}
        rows={transactions && toTableRows(transactions)}
      />
    </>
  );
};
