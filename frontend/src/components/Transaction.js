import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

const Transaction = ({ transaction }) => {
  const { dispatch } = useContext(TransactionContext);

  const removeTransaction = id => {
    if (window.confirm("Do you want to delete transactions ? ")) {
      dispatch({ type: "DELETE_TRANSACTION", payload: id });
    }
  };

  const sign = transaction.amount < 0 ? "-" : "+";
  return (
    <li className={sign === "-" ? "minus" : "plus"}>
      <h4>{transaction.text}</h4>
      <span>
        {sign}${Math.abs(transaction.amount)}
      </span>
      <button
        onClick={() => removeTransaction(transaction.id)}
        className="delete-btn"
      >
        &times;
      </button>
    </li>
  );
};

export default Transaction;
