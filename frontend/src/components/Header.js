import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { TransactionContext } from "../context/TransactionContext";

const Header = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { dispatch: tranDispatch } = useContext(TransactionContext);

  const handleLogout = () => {
    dispatch({
      type: "USER_LOGOUT",
    });
    tranDispatch({
      type: "MAKE_TRANSACTION_NULL",
    });
  };

  return (
    <header>
      <h2>Expense Tracker</h2>
      {state.user && (
        <div className="login-user">
          <p>{state.user}</p>
          <button className="btn" onClick={handleLogout}>
            logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
