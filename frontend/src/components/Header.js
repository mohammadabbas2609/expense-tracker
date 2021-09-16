import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Header = () => {
  const { state, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({
      type: "USER_LOGOUT",
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
