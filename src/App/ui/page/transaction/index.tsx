import React from "react";

interface Props {
  description: String;
  amount: Number;
}

export const Transaction = ({ description, amount }: Props) => (
  <div>
    <span>{description}</span>
    <span>{amount}</span>
  </div>
);
