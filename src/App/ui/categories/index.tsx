import React from "react";
import DynamicTable from "@atlaskit/dynamic-table";
import { useCategories, Category } from "../../service/categories";
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

const toTableRows = (
  categories: Category[],
  selectedCategory: string | undefined,
  setSelectCategory: (categoryId: string) => void
) =>
  categories.map(({ id, name }) => ({
    cells: [{ content: `${name}${id === selectedCategory ? "Selected" : ""}` }],
    onClick: () => setSelectCategory(id)
  }));

export const Categories = () => {
  const { data: categories, loading, error } = useCategories();
  const [selectedCategory, setSelectedCategory] = useSelectedCategory();

  return (
    <>
      {error && <ErrorMessage title="Error loading categories" error={error} />}
      <DynamicTable
        caption="Categories"
        isLoading={loading}
        head={tableHeader}
        rows={
          categories &&
          toTableRows(categories, selectedCategory, setSelectedCategory)
        }
      />
    </>
  );
};
