import React from "react";
// import Select from "@atlaskit/select";
import { useCategories } from "../../../services/categories";
import { CategoryId } from "../../../types/category";

interface Props {
  currentCategory: CategoryId | null;
}

export const CategoryPicker = (props: Props) => {
  const { data: categories = [] } = useCategories();

  const selectOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  // const onChange = ({value: categoryId}) => {

  // }

  // return <Select options={selectOptions} placeholder="Uncategorised" />;
};
