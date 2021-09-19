import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

const Balance = () => {
  const { transactions } = useContext(TransactionContext);

  const balance = transactions
    .reduce((acc, curr) => {
      acc += curr.amount;
      return acc;
    }, 0)
    .toFixed(2);

  function sign() {
    return balance >= 0 ? "+" : "-";
  }

  return (
    <>
      <h4>Your Balance</h4>
      <h1>
        {sign()}${Math.abs(balance)}
      </h1>
    </>
  );
};

export default Balance;
