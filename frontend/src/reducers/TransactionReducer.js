const TransactionReducer = (state, action) => {
  switch (action.type) {
    case "GET_TRANSACTIONS":
      return {
        ...state,
        transactions: [...state.transactions, ...action.payload],
        error: action.payload.error,
      };
    case "DELETE_TRANSACTION":
      console.log(action.payload);
      return {
        ...state,
        transactions: state.transactions.filter(transaction => {
          return transaction._id !== action.payload;
        }),
        error: action.payload.error,
      };
    case "CREATE_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case "MAKE_TRANSACTION_NULL":
      return {
        ...state,
        transactions: [],
      };
    default:
      return state;
  }
};

export default TransactionReducer;
