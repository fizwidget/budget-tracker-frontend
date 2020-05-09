
declare const categoryId: unique symbol;

export type CategoryId = string & {
  [categoryId]: true;
};

function assertCategoryId(value: string): asserts value is CategoryId {
  if (value.length === 0) {
    throw Error("Category ID cannot be empty");
  }
}

export const toCategoryId = (value: string): CategoryId => {
  assertCategoryId(value);
  return value;
};

export interface Category {
  id: CategoryId;
  name: string;
}
