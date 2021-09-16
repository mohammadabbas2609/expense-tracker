import { createContext, useReducer } from "react";
import axios from "axios";
import AuthReducer from "../reducers/AuthReducer";

const initialState = {
  user: JSON.parse(localStorage.getItem("__EXPENSE_USER")) || null,
  token: JSON.parse(localStorage.getItem("__EXPENSE_USER_TOKEN")) || null,
  loading: true,
};

const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const userLogin = async (email, password) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/user/login",
        {
          email,
          password,
        }
      );

      dispatch({
        type: "USER_LOGIN",
        payload: {
          user: data.email,
          token: data.token,
        },
      });

      localStorage.setItem("__EXPENSE_USER", JSON.stringify(data.email));
      localStorage.setItem("__EXPENSE_USER_TOKEN", JSON.stringify(data.token));
    } catch (error) {
      dispatch({
        type: "USER_LOGIN",
        payload: {
          user: null,
          loading: false,
          token: null,
          error: error.response.data.message,
        },
      });
    }
  };

  return (
    <AuthContext.Provider value={{ dispatch, state, userLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
