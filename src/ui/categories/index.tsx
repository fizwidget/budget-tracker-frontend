/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import DynamicTable from "@atlaskit/dynamic-table";
import { useCategories } from "../../service/categories";
import { Category, CategoryId } from "../../types/category";
import { ErrorMessage } from "../error-message";
import { useSelectedCategory } from "../../service/selected-category";

const tableHeader = {
  cells: [
    { content: "Description", shouldTruncate: true },
    { content: "Amount" },
    { content: "Category" },
    { content: "Account" },
  ],
};

interface TableRowProps {
  content: string;
  isSelected: boolean;
}

const TableRow = ({ content, isSelected }: TableRowProps) => (
  <span
    css={css`
      font-weight: ${isSelected ? "bold" : "normal"};
    `}
  >
    {content}
  </span>
);

const toTableRows = (
  categories: Category[],
  selectedCategory: CategoryId | null,
  setSelectCategory: (categoryId: CategoryId | null) => void
) =>
  categories.map(({ id, name }) => {
    const isSelected = id === selectedCategory;
    const content = <TableRow content={name} isSelected={isSelected} />;
    const toggleSelection = () => setSelectCategory(isSelected ? null : id);
    return {
      cells: [{ content }],
      onClick: toggleSelection,
    };
  });

export const Categories = () => {
  const { data: categories, loading, error } = useCategories();
  const {
    data: selectedCategory,
    mutate: setSelectedCategory,
  } = useSelectedCategory();

  return (
    <div>
      {error && <ErrorMessage title="Error loading categories" error={error} />}
      <DynamicTable
        caption="Categories"
        emptyView={<span>No categories.</span>}
        isLoading={loading}
        head={tableHeader}
        rows={
          categories &&
          toTableRows(categories, selectedCategory, setSelectedCategory)
        }
      />
    </div>
  );
};
