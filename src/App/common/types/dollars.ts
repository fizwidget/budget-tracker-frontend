declare const dollars: unique symbol;

export type Dollars = number & {
  [dollars]: true;
};

function assertDollars(value: number): asserts value is Dollars {}

export function toDollars(value: number): Dollars {
  assertDollars(value);
  return value;
}
