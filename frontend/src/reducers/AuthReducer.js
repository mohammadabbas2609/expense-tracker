const AuthReducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        error: action.payload.error,
      };
    case "USER_REGISTER":
      return state;
    case "USER_LOGOUT":
      localStorage.setItem("__EXPENSE_USER", null);
      localStorage.setItem("__EXPENSE_USER_TOKEN", null);
      return {
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

export default AuthReducer;
