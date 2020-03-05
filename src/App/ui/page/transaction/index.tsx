/** @jsx jsx */
import { css, jsx } from "@emotion/core";

interface Props {
  description: String;
  amount: Number;
}

export const Transaction = ({ description, amount }: Props) => (
  <div
    css={css`
      padding: 24px;
    `}
  >
    <span>{description}</span>
    <span>{amount}</span>
  </div>
);
