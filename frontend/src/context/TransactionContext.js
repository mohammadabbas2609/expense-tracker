import { createContext, useReducer } from "react";
import TransactionReducer from "../reducers/TransactionReducer";
import axios from "axios";

const initialState = {
  transactions: [],
};

// Create Context
export const TransactionContext = createContext(initialState);

const URL = "https://expense-tracker-backend2609.herokuapp.com";

// Provider
export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TransactionReducer, initialState);

  const addTransaction = async (text, amount) => {
    const config = {
      headers: {
        Authorization: JSON.parse(localStorage.getItem("__EXPENSE_USER_TOKEN")),
      },
    };
    try {
      const { data } = await axios.post(
        `${URL}/api/transactions`,
        { text, amount },
        config
      );

      dispatch({
        type: "CREATE_TRANSACTION",
        payload: {
          text: data.transaction.text,
          amount: +data.transaction.amount,
          _id: data.transaction._id,
        },
      });
    } catch (error) {
      dispatch({
        type: "CREATE_TRANSACTION",
        payload: {
          error: error.response.data.message,
        },
      });
    }
  };

  const getTransactions = async () => {
    const config = {
      headers: {
        Authorization: JSON.parse(localStorage.getItem("__EXPENSE_USER_TOKEN")),
      },
    };
    try {
      const { data } = await axios.get(`${URL}/api/transactions`, config);

      dispatch({
        type: "GET_TRANSACTIONS",
        payload: data.transaction,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "GET_TRANSACTIONS",
        payload: error.reponse.data.message,
      });
    }
  };

  const removeTransaction = async id => {
    const config = {
      headers: {
        Authorization: JSON.parse(localStorage.getItem("__EXPENSE_USER_TOKEN")),
      },
    };

    try {
      const { data } = await axios.delete(
        `${URL}/api/transactions/${id}`,
        config
      );

      dispatch({
        type: "DELETE_TRANSACTION",
        payload: data.transaction,
      });
    } catch (error) {
      dispatch({
        type: "DELETE_TRANSACTION",
        payload: { error: error.response.data.message },
      });
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        dispatch,
        transactions: state.transactions,
        addTransaction,
        getTransactions,
        removeTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
