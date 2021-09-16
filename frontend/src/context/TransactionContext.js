import { createContext, useReducer } from "react";
import TransactionReducer from "../reducers/TransactionReducer";

const initialState = {
  transactions: [
    { id: 1, text: "Flower", amount: -20 },
    { id: 2, text: "Salary", amount: 300 },
    { id: 3, text: "Book", amount: -10 },
    { id: 4, text: "Camera", amount: 150 },
  ],
};

// Create Context
export const TransactionContext = createContext(initialState);

// Provider
export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TransactionReducer, initialState);

  return (
    <TransactionContext.Provider
      value={{ dispatch, transactions: state.transactions }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
