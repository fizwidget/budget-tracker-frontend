/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import DynamicTable from "@atlaskit/dynamic-table";
import { useCategories, Category } from "../../service/categories";
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
  selectedCategory: string | undefined,
  setSelectCategory: (categoryId: string | undefined) => void
) =>
  categories.map(({ id, name }) => {
    const isSelected = id === selectedCategory;
    const content = <TableRow content={name} isSelected={isSelected} />;
    const toggleSelection = () =>
      setSelectCategory(isSelected ? undefined : id);
    return {
      cells: [{ content }],
      onClick: toggleSelection,
    };
  });

export const Categories = () => {
  const { data: categories, loading, error } = useCategories();
  const [selectedCategory, setSelectedCategory] = useSelectedCategory();

  return (
    <div>
      {error && <ErrorMessage title="Error loading categories" error={error} />}
      <DynamicTable
        caption="Categories"
        emptyView={<span>No transactions!</span>}
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