import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

const Transaction = ({ transaction }) => {
  const { removeTransaction } = useContext(TransactionContext);

  const deleteTransaction = id => {
    if (window.confirm("Do you want to delete transactions ? ")) {
      removeTransaction(id);
    }
  };

  const sign = +transaction.amount < 0 ? "-" : "+";
  return (
    <li className={sign === "-" ? "minus" : "plus"}>
      <h4>{transaction.text}</h4>
      <span>
        {sign}${Math.abs(+transaction.amount)}
      </span>
      <button
        onClick={() => deleteTransaction(transaction._id)}
        className="delete-btn"
      >
        &times;
      </button>
    </li>
  );
};

export default Transaction;
