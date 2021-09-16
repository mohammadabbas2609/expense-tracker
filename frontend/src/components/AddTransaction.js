import React, { useContext, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";

const AddTransaction = () => {
  const [amount, setAmount] = useState(0);
  const [text, setText] = useState("");
  const { dispatch } = useContext(TransactionContext);

  const onSubmit = e => {
    e.preventDefault();

    dispatch({
      type: "ADD_TRANSACTION",
      payload: {
        text,
        amount: +amount,
      },
    });

    setText("");
    setAmount(0);
  };

  return (
    <div className="new-transaction">
      <h4>Add new transaction</h4>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Enter text..."
            autoFocus
            required
          />
        </div>
        <div className="form-control">
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="Enter amount + for income - for transaction"
            required
          />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </div>
  );
};

export default AddTransaction;
