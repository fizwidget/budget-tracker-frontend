/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCategories
// ====================================================

export interface GetCategories_categories {
  __typename: "Category";
  /**
   * Opaque identifier.
   */
  id: string;
  /**
   * Category name, e.g. "Transport".
   */
  name: string;
}

export interface GetCategories {
  /**
   * List all categories.
   */
  categories: GetCategories_categories[] | null;
}
