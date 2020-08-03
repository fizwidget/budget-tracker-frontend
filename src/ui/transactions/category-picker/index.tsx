import React, { ChangeEvent } from "react";
import { useCategories } from "../../../services/categories";
import { toCategoryId } from "../../../types/category";
import { useCategoriseTransaction } from "../../../services/categorise-transaction";
import { TransactionId } from "../../../types/transaction";
import { useTransaction } from "../../../services/transaction";
import { ErrorMessage } from "../../error-message";

interface Props {
  transactionId: TransactionId;
}

export const CategoryPicker = ({ transactionId }: Props) => {
  const transaction = useTransaction(transactionId);
  const { data: categories = [] } = useCategories();
  const [
    categoriseTransaction,
    categoriseTransactionResult,
  ] = useCategoriseTransaction();

  const currentValue: string =
    transaction.category.tag === "categorised"
      ? transaction.category.value.id
      : "none";

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const categoryId =
      value === "none" ? null : toCategoryId(event.target.value);
    categoriseTransaction({ categoryId, transactionId });
  };

  return (
    <>
      {categoriseTransactionResult.error && (
        <ErrorMessage
          title="Categorisation error"
          error={categoriseTransactionResult.error}
        />
      )}
      <select value={currentValue} onChange={onChange}>
        <option key="none" value="none">
          None
        </option>
        {categories.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </>
  );
};
